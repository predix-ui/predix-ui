---
title: Introducing the Crosshair Feature
layout: default
moduleName: view-develop-vis-crosshair
pathToRoot: ../../../
---

# Introduction

Starting with version 2.0.0 of px-vis, the new crosshair feature became available. Crosshair provides users the ability to highlight corresponding data points, i.e. points which share the same timestamp - though not necessarily the same exact dataset - across multiple charts on a page.


This article will walk you through the crosshair feature and explain how to add it to your charts and app.

For the demo of crosshair, go <a href="https://www.predix-ui.com/px-vis-demos/px-vis-demos/crosshair.html" target="_blank">here</a>.

# Demo walkthrough and features

The crosshair functionality is triggered by selecting the crosshair icon from the chart toolbar. When in crosshair mode, as the user hovers over a point on a given chart, corresponding data point(s) on the rest of the charts on the page will be highlighted. You’ll also notice that the opacity of the charts’ series changes to indicate corresponding data points are found in other charts.

* If a chart’s opacity has changed, but no highlighted data point is visible, try panning or zooming out, as the corresponding data points might be outside of the chart viewing range.
* If a chart’s opacity doesn’t change at all, it indicates that no corresponding data point was found on that specific chart.

<catalog-picture img-src="../../img/guidelines/dev/vis/crosshair/crosshair" img-alt="Crosshair feature" style="border:none;" caption="Crosshair feature in action, highlighting corresponding data on adjacent charts"></catalog-picture>

The demo also provides the ability to freeze the crosshair view by clicking on the chart while hovering. Once frozen, the corresponding data points across all other charts will continue to be highlighted, and the crosshair icon in their toolbars will switch to a lock icon.  When in frozen view, you can perform other toolbar actions, such as hovering to see your data in the register, and panning or zooming to get a better view of your highlighted data. Clicking on the lock icon will un-freeze the charts and enable the crosshair search again.

Thanks to the new quadtree feature, the crosshair mode can use different types of spatial search to generate the resulting dataset of points near your cursor. These options are also available for the tooltip search in the XY and  Polar charts and include:

* Closest point/closest timestamp: searches for the closest datapoint to the cursor and returns the  corresponding data points within that chart. These values are displayed in the register and if date-time is displayed, the timestamp corresponds to all of the displayed values. Similarly, for crosshair, this will yield one set of data points with the same timestamp.
* Point per series: searches for the closest point for each series in the chart. This may mean that multiple datasets are returned, each containing a point that is closest to the cursor for that series. The values displayed in the register are the closest point for each series. The timestamp shown in the register only represents the timestamp of the absolute closest point, as represented by the color bar adjacent to the timestamp. For crosshair, you can end up with multiple timestamps, and thus, multiple sets of data highlighted on connected charts.
* All in area: similar to "point per series," this search type will return multiple sets of data adjacent to the cursor. The differences are, first, that it will return all the data within the search radius and, second, it will not return any datasets wholly outside of that radius. The dataset with the point closest to the cursor will be displayed in the register, and the timestamp will represent that set, similar to "closest point." For crosshair, multiple timestamps will be returned and multiple sets of data will be highlighted on the connected charts.

In addition to these new search types, a search radius can also be specified. While required for "all in area" to function, it can optionally be applied to the other search types also, limiting or expanding how far from the cursor the search will go.

* Radius up: increases the search radius (+5 each click)
* Radius down: decreases the search radius (-5 each click)


# How to set up your own crosshair charts

The demo shows off several crosshair features, and can be used as a starting point for setting up your own crosshair charts. To do so, follow the guide below and check out the source code of the demo. You can find the source code [here](https://github.com/PredixDev/px-vis-demos/blob/master/crosshair.html).

## Relevant properties

### crosshairData

The chart property which transmits the crosshair data from one chart to another. You shouldn't need to use the internal structure of this object, but it consists of two keys:

* rawData: the full data retrieved, extracted from `chartData`. If all charts use the same datasets this data can just be displayed on the charts.
* timeStamps: a list of just the timestamps founds. If the other charts use different datasets, a search for the data closest in time at each point can be made.


```javascript
{
  rawData:[{
    time: 123456879,
    key1: 5,
    key2: 8
  }, {
    time: 123654987,
    key1: 7,
    key2: 3
  }],
  timeStamps:[123456879, 123654987]
}
```

In order to enable charts to share the `crosshairData`, simply two-way-bind the `crosshairData` property across all your charts. Example:
```html
<px-vis-timeseries
  …
  crosshair-data="{{crosshairData}}">
</px-vis-timeseries>

<px-vis-xy-chart
  …
  time-data="timeStamp"
  crosshair-data="{{crosshairData}}">
</px-vis-xy-chart>

<px-vis-radar
  …
  series-key="timeStamp"
  crosshair-data="{{crosshairData}}">
</px-vis-radar>
```


In this way, an origin chart can create crosshairData and the receiving charts will automatically get the updated dataset.


Note that on the example XY chart, the `timeData` property is also specified. For  XY and Polar, the crosshair feature uses this property to know which key in your `chartData` contains timestamps. For Radar and Parallel, the `seriesKeys` property should point to the timestamp key. For timeseries, it just uses the `x` key.


All other relevant properties for the crosshair feature are not at the chart level, but rather properties of the highlighter, and should be passed down through a `highlighterConfig` object:

```javascript
highlighter-config = '{
  differentDataset: true,
  showTooltipData: true,
  fuzz: 1000000000
}'
```


All settings are optional, and include:

### differentDataset

This Boolean property tells a chart receiving `crosshairData` if it is using the same dataset as the origin chart. If it is using the same data (`differentDataset: false`), then the receiving chart doesn’t have to search data to highlight and greatly improves performance.


If the chart does have a different dataset from the origin chart, set `differentDataset`: true and the receiving chart will perform a search for corresponding data in its own dataset based on the timestamps in the `crosshairData`. Ideally, you should do this dynamically based on which chart is sending the data.


By default, the receiving chart will only look for timestamps which are an exact match to those in `crosshairData`. If you want to instead search for timestamps within a certain timeframe of the timestamps in crosshairData, add a `fuzz` value.


### fuzz

When `differentDataset` is true, you can specify a `fuzz` value. `Fuzz` takes a numeric value that is used to create  an upper and lower bound for the receiving chart’s search. All data points' timestamps found within that range will be returned. Since crosshair works based on timestamp, the fuzz value is in milliseconds. So, a value of 3600000 corresponds to 1 hour, for example.


### showTooltipData

If you want the crosshair data to be shown in the register, set `showTooltipData` to true. Note that it will only show the first dataset.


### drawWithLocalCrosshairData

Normally, the chart generating the `crosshairData` will not draw the `crosshairData`. If you want it to, set this Boolean to true.


### Toolbar customization


In addition to configuring the highlights, you’ll have configure the toolbar on each chart for which you want a user to be able to generate crosshair data. We’ll walk you through how to do that below, but more information on configuring the toolbar can be found [here](#/guides/vis-guides-toolbar).


To enable a basic crosshair, just add crosshair to your `toolbarConfig`:

```javascript
toolbar-config='{
  config: {
    …
    crosshair: true
  }
}'
```



For XY and Polar, using the above basic crosshair configuration uses "closest point" search. For these two charts, you can specify the advanced crosshair instead using `crosshairWithOptions`, which allows users to choose the type of search:


```javascript
toolbar-config='{
  config: {
    …
    crosshairWithOptions: true
  }
}'
```


With the above configurations set, you’ll be able to implement a basic crosshair configuration on a set of charts without the ability to freeze the charts. Freezing requires more configuration on your app to enable.


## Setting up freezing

In addition to seeing corresponding data points highlighted on other charts, the ability to freeze those highlighted data points is quite powerful, allowing the user to drill down into the frozen charts. While a basic crosshair implementation requires minimal work on the application side, freezing the chart requires additional configuration and control logic to be built in your application. Please see the demo code for one example of how it can be accomplished.

Conceptually, freezing is quite easy; we simply take away the crosshair functionality temporarily. While crosshair data is defined on the charts, they will highlight the points in that property, so if we remove the crosshair ability while a user is hovering, the `crosshairData` property will no longer update and will remain “locked” in its current state. So all we have to do is set up a listener to turn off the crosshair feature. Once we do that, you’ll also need a way to turn it back on and unfreeze the charts.


As demonstrated in the demo, this can be accomplished with relative ease through the toolbar. First, you need to define two toolbar configurations: a normal unfrozen chart, and a frozen chart.

```javascript
normalConfig = {
  config: {
    advancedZoom: { actionConfig: { click: null } },
    pan: { actionConfig: { click: null } },
    tooltip: {selected: true, actionConfig: { click: null } },
    crosshair: {
      actionConfig: {
        click: function() {
          this.fire("px-freeze-crosshair");
        }
      }
    }
  }
};

frozenConfig = {
  config: {
    advancedZoom: { actionConfig: { click: null } },
    pan: { actionConfig: { click: null } },
    tooltip: {selected: true, actionConfig: { click: null } },
    frozen: {
      tooltipLabel: 'Crosshair Frozen',
      icon: 'px-utl:locked',
      eventName: "px-unfreeze-crosshair",
      onClickContext: "toolbar",
      customButtonStyle: "color: salmon;"
    }
  }
};
```


First, in the normal config, we are extending the basic crosshair feature by adding an on-click listener.

```javascript
crosshair: {
  actionConfig: {
    click: function() {
      this.fire("px-freeze-crosshair");
    }
  }
}
```


This listener attaches the supplied callback to the chart’s interaction space and, in this case, the callback fires an event for your app to catch.

Since `click` is not a normal event for the toolbar, we’ll also have to clear it on our other toolbar features when they are clicked. To do this, we extend the basic functionality in a similar manner:

```javascript
advancedZoom: { actionConfig: { click: null } },
```



Next, we want to define the frozen toolbar config, which will look very similar, except it will not define crosshair. By not defining crosshair, we’re removing it from the toolbar and the ability to use it. We also add a fully custom option to unlock the chart:


```javascript
frozen: {
  tooltipLabel: 'Crosshair Frozen',
  icon: 'px-utl:locked',
  eventName: "px-unfreeze-crosshair",
  onClickContext: "toolbar",
  customButtonStyle: "color: salmon;"
}
```



When this button gets clicked, it fires the `px-unfreeze-crosshair event`, which your app can listen to. Note that it also uses a `customButtonStyle` so you can make it look different from the other buttons to reinforce the frozen state / make it stand out from the other normal buttons.


Next, you’ll want to set up your freeze listener:

```javascript
document.addEventListener('px-freeze-crosshair', function() {
  timeseries.set("highlighterConfig.drawWithLocalCrosshairData", true);
  xy.set("highlighterConfig.drawWithLocalCrosshairData", true);

  timeseries.set("toolbarConfig", configs.timeseriesFreeze);
  xy.set("toolbarConfig", configs.xyFreeze);
});
```


In your listener, first, you want to tell the origin chart to draw the `crosshairData` that it is creating. Then disable the crosshair feature by swapping out the toolbar config.

To unfreeze, create a similar listener for the unfreeze event:

```javascript
document.addEventListener('px-unfreeze-crosshair', function() {
  var empty = {
      rawData: [],
      timeStamps: []
  };

  timeseries.set("highlighterConfig.drawWithLocalCrosshairData", false);
  xy.set("highlighterConfig.drawWithLocalCrosshairData", false);

  timeseries.set("toolbarConfig", configs.timeseries);
  xy.set("toolbarConfig", configs.xy);

  timeseries.set("crosshairData", empty);
  xy.set("crosshairData", empty);

});
```


Aside from reversing the changes we made in the first listener, you’ll also have to clear the `crosshairData` by defining an empty `crosshairData` set and applying it on all your charts.

With that, you should now have the ability to freeze crosshairs across your charts!

Note:</br>
Do not set `preventWebWorkerSynchronization` on XY or Polar if you want to enable crosshair - the feature depends on access to the web worker.
