---
title: Introducing web workers
layout: default
moduleName: view-develop-vis-web-workers
pathToRoot: ../../../
---

# Introduction

Increasingly, the px-vis framework has to do more heavy processing as we add new features and support charts with hundreds of thousands of datapoints. User interactions in particular, such as a user hovering over a chart and displaying the closest datapoints in the register, must be highly performant and feel instantaneous. In order to support this and many other processing intensive features, we’ve introduced web workers into px-vis.

# Background
With the introduction of the new crosshair feature, which allows users to hover over a chart to target a datapoint and see that same datapoint highlighted on other charts throughout the page, we looked back at our approach to finding datapoints closest to the user’s mouse. Previously, we were using the rather naïve approach of iterating through every datapoint and measuring the distance to the mouse. Although fine with typical, non-industrial datasets, the size of the datasets used on px-vis charts makes this approach a poor choice. Searching through every point is an O(n) operation each time the user moves their mouse which caused noticeable lag on large datasets and/or on IE 11. To optimize this search time algorithm, we decided to preprocess our data and store it in a quadtree data structure.

A quadtree stores our data spatially in a tree hierarchy, allowing for testing only a small subset of data when searching for the closest point. You can read more about quadtrees on [Wikipedia] (https://en.wikipedia.org/wiki/Quadtree).

<div>
  <img src="[[imagePath]]../../img/guidelines/dev/vis/web-workers/visual_qt_optimized.gif" width="600" height="338"></img>
  <p class="caption">Visual representation of the quadtrees we use</p>
</div>

I won't expand much more on the actual quadtree search since this isn't the point of this article, but if you are interested here is [another article](https://medium.com/@agafonkin/a-dive-into-spatial-search-algorithms-ebd0c5e39d2a) that is worth reading and talks about similar spatial tree structures.

Long story short, the quadtree search helps us find those points a lot faster, but we have to pay a price to build and rebuild it: anywhere between 1ms and 2000ms depending on your dataset, browser (who said IE?) and CPU.

Building the quadtree is slow, however it is not crucial to initializing the chart; we only need it when the user interacts with the chart and not when we are building it. Given this, we certainly don't want it to block the main thread from working on other charts or anything else on the page. That's where web workers come in.


# What are web workers
Javascript is single threaded by nature, meaning that the code will always run on one thread which we'll call the main thread. On top  of that your code execution is also shared with the browser renderer, meaning that if you run too much javascript then the browser doesn't  have enough time to spend on layout and painting. Web workers allow us to shift processing from the main thread to background threads, allowing us to build our quadtress without blocking the building of the chart and webpage, and/or rendering. That helps us limit the performance impact of building our quadtrees while still benefiting from their fast spatial search.

One of the drawbacks of web workers is the communication overhead. By default, the web workers use a structure cloning algorithm to transfer data (JavaScript objects and arrays) between the main thread and the worker thread. This can be sluggish (in the order of hundreds of ms) when transferring large amounts of data (>20MB). This price has to be paid on the main thread, which is not ideal. Web workers can also accept "transferrable" objects which are a kind of 0 copy transfer, while clearing the original data. Unfortunately, this only applies to binary data: arrayBuffer, bitmap, etc...

# How are we using them
To avoid paying the price of transferring the data every time we need to do something with it in the web worker, such as rebuilding the quadtree after a zoom, we decided to introduce some synchronization. Every time a chart is created it is assigned a specific web worker which it will use for all its background operations. Every time the chart's data changes it will send a copy to its web worker to keep it in sync, effectively  doubling the memory footprint of the data (one set on the chart, one set in the webworker). The quadtree itself is also about 3 times the size of the data, so in a chart that uses the quadtree search the memory used for holding the data will be 5 times the size of its source. Please note that it is a worst case scenario since when building the quadtree we will optimize the keys used in the data to save space and our tests were run with data having small keys already.

This impact only effects the memory used by the data, which should be a smaller subset than the chart itself (which includes DOM nodes, config options, SVGs...). To give an idea of how this impact plays out: our test data stands at 10MB for 400,000 datapoints, and the resulting chart uses 50MB to store the quadtree, source data and synchronized data. The web worker will automatically clean up the source data and quadtree data 1.5s after the chart is detached from the DOM.

At the moment, the only charts building quadtrees are px-vis-xy-chart and px-vis-polar. Px-vis-timeseries also duplicates the data for searching for its extents in the web worker, but doesn't use the quadtree search (it is already using a binary search relying on the time data being already sorted). Prior to implementing a quadtree with web workers, finding the closest point for a modest 40k dataset took ~50ms per search. Since the search ran on every mouse move, this had a huge negative impact on performance. With our quadtree, each search takes <0.5ms, even on a 4 millions point dataset.

<div>
  <img src="[[importPath]]../../img/guidelines/dev/vis/web-workers/4_millions_old.gif" width="600" height="338"></img>
  <p class="caption">4 millions points dataset with old search.</p>
</div>

<div>
  <img src="[[importPath]]../../img/guidelines/dev/vis/web-workers/4_millions.gif" width="600" height="338"></img>
  <p class="caption">4 millions points dataset with quadtree search. Snappy.</p>
</div>

# Configuration
To do its job, the web worker must be able to load its code and the d3.js library.

Starting in version v4.6.x of px-vis, these necessary files are automatically loaded.

The px-vis scheduler will create as many web workers as cores are available from navigator.hardwareConcurrency, which includes physical and virtual cores, or 4 if this information can't be found. This can be overridden through `Px.vis.maxWorkerCount`.

Since it can be hard to change the configuration variable before the Px web worker code is run you can listen for the `px-vis-worker-init` event which will be fired before Px vis setup the web workers.

It is possible to disable the use of webworkers for charts supporting them by setting `preventWebWorkerSynchronization` on a specific chart. In this case the chart will fall back to the previous implementation of spatial search for tooltip data as well as calculating chart extents. However the chart won't be able to use the crosshair mode!

##Legacy configuration
If you are still using an older version of px-vis, you should probably upgrade. If you dont, you'll have load the web worker files manually.

When you configure your production app **build**, you MUST make sure that your build result includes the px-vis-worker-scale.js and px-vis-worker.js files from px-vis as well as d3.min.js file from the pxd3 folder (which is a dependency of px-d3-imports, itself a dependency of px-vis). You don't need to manually import those files in your app.

By default, the web worker scheduler will search for px-vis-worker-scale.js and px-vis-worker.js in the same folder as the px-vis code. The px-vis-worker.js path can be customized through the global window variable `Px.vis.workerUrl`, which expects the full path including the file name. The other file will be searched in the same folder.

The web workers will search for d3 relative to the px-vis-worker.js script : '../pxd3/d3.min.js'. This can be changed through `Px.vis.workerD3Url`, again, using the full path including the file name. Note that this URL will still be relative to the web worker script.

# Going forward

The web workers currently bring us faster spatial search as well as offloading of parsing for dynamic chart extents. The runtime gain of performance as well as just offloading the main thread when searching for extents are in our opinion outweighing the memory footprint increase which should be marginal in most cases.

We still tried to give the option of disabling webworker for a chart through `preventWebWorkerSynchronization`, with the caveat of not being able to use several advanced features, such as the crosshair feature, single point search, or different search types. This might be useful in some specific scenarios such as a lot of small chart with minimal interactions.

But maybe more importantly even though the cloned data is used for only a couple of features right now, it opens the door for us to build more features on the web worker with the data always available.

# Opening the web workers to external use

We recently opened the vis web workers to be used by an app with the 2.1.0 vis release. This means that it is now possible to both register custom scripts to run any kind of functions in a web worker as well as access the chartData being stored in the web workers.

## Load a custom script

One can register a custom script by running the `Px.vis.registerCustomScript` method. This method accepts three parameters:
* `scriptUrl` defines where the script is. Starting with v4.6.x, this path must be an absolute path. The web worker files are loaded via a blob, so any relative paths will be interpreted relative to the blob.
* `successCallback` is a function that will be run once the script has been successfully registered on all web workers
* `errorCallback`. is a function that will be run if any error occurs while registering the script (`successCallback` won't be called)

The script should define one or several global objects and register all functions on one of those objects. For example a very small custom script could be:

```js
var myScript = {};

myScript.addition = function(data, chartId) {
  return data.x + data.y;
};

myScript.dataLength = function(data, chartId) {
  return this.dataMapping[chartId].length;
};

myScript.returnData = function(data, chartId) {
  return this.dataMapping[chartId];
}
```

Each function always has two parameters:
* `data` is an object that you will be able to provide when invoking one of those function, usually containing data and context on what to perform.
* `chartId` is also provided when requesting the invocation of this function. It is usually helpfull to fetch chartData that has already been resgistered in the web worker (usually by vis, but can also be done by the app).

Two global objects are also available:
* `dataMapping` is an object holding chartData for every chart that has been registered against this web worker. The data can be accessed by using the `chartId` as the key. Please note that the `chartData` might have been filtered, for example when using a navigator on a px-is-xy-chart then the filtered data is being updated in the webworker
* `quadtrees` is similar to `dataMapping` but holds the [d3 quadtrees](https://github.com/d3/d3-quadtree) that have been built for the charts needing it.

## Requesting work from the webworker

It is possible to invoke some work from the web workers (including invoking a function from a custom script) by running the `Px.vis.scheduler.process(context)` function.

The context object can have the following properties:
* `action`: action to be run in the webworker. See below for list of actions
* `originatorName`: arbitrary string representing who sent the request
* `chartId`: Id of the chart this request relates to. Used to identify which webworker to use and what dataset to use in the webworker
* `successCallback` (optional): callback after successfully running an action in the webworker. The callback will have one parameter holding the result of that action
* `errorCallback` (optional): Callback after an error has been fired in the webworker.
* data: used when running a custoim function. Should include `functionName` and `objectName` to identify which function to run and can include another `data` object that will be passed to the function itself as the first parameter (as seen in paragraph above)

Please note successCallback and errorCallback are mutually exclusive:
one will be called or the other. If both are defined you are guaranteed
to have feedback on your request

Each request is uniquely identified through the triplet "`action`
`originatorName` `chartId`" which is always required. When a webworker is busy and a request comes
in for this webworker then the request will be queued. If another
request with the same triplet identifier comes in it will trump the
previously queued request: the request initially queued will be
destroyed and the new one will be queued

The current list of significant actions is as follows (more can be
found by inspecting px-vis-worker.js but are usually meant to be used
internally):
* runCustomFunction: used to run a function on a custom script that you
 explicitely loaded in the web workers through `Px.vis.registerCustomScript`. Pass `functionName`, `objectName` and `data` in the `data` object of the context
* updateData: register a new dataset or update a dataset in the web worker. It will be stored in the dataMapping object, the key being chartId and the value the dataset. pass `chartData` in the data object
