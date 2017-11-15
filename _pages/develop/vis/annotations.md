---
title: Introducing the Annotations Feature
layout: default
moduleName: view-develop-vis-annotations
pathToRoot: ../../../
---

# Introduction

Starting with version 4.5.0 of px-vis, the new annotations feature became available. This feature provides API hooks for handling annotations on a chart. The vis framework and the charts are unopiniated on the design and interactions for creating and interacting with those annotations, leaving the design to the application.


This article will walk you through the annotation feature and explain how to add it to your charts and app.

For an example of a possible implementation of annotations, go [here](https://www.predix-ui.com/px-vis-demos/px-vis-demos/annotations.html).

# Concept

The chart can display annotations based on `annotationData`:

```js
[{
  x: 1325897523,
  y: 15.7,
  series: y0,
  data: {

  }
 },
 ...
]
```

`x` and `y` are data values that will be used to position the annotation. `series` refer to the actual series that should be used in reference to those data values: for XY/Timeseries/Polar those are the plotted series where for Parallel Coordinates/Radar those refer to an axis.

`series` needs to be specified for the chart to be able to position the annotation:
  * XY/Timeseries/Polar: needed to determine which axis the annotation relates to. A series is always internally linked to an axis, and ultimately a scale that will be used to determine the pixel values.
  * Parallel Coordinates/Radar: needed to decide on which axis to position the annotation

<=========
`data` is optional and could be any other key, the idea being that any kind of data can be stored in the `annotationData`. The whole annotation data (including `x`, `y` and `series`) will then be passed back when an annotation request is made (see 'Annotations Events' below).
======
`data` is an optional field and can consist of any key/value pairs.  Since any kind of data can be stored in the `annotationData`, this field allows you to specify custom data you want associated with this annotation point. The whole annotation data (including `x`, `y` and `series`) will then be passed back when an annotation request is made (see ‘Annotations Events’ below).
========>

The charts then display those annotations and provide events for interaction with those annotations.

# Creating Annotations

Programmatically creating annotations is as simple as adding objects to the `annotationData` array. From a user interaction perspective it can be done through a toolbar custom configuration.

The idea is to create a new toolbar button with interactions when clicking on the chart (see the [toolbar configuration guide](https://www.predix-ui.com/#/develop/vis/configure-toolbar) for more info).

On a click a user interface can be shown for the user to input the annotation message and potential additional information.

Through the event handler which is called on-click we have access to the mouse coordinates. We also need to determine which series to associate the new annotation with: this can either be decided by the user through a dropdown for example or programmatically chosen. The series information is required to properly position the annotation during user interactions such as panning and zooming.

We can then find the data values associated with the mouse coordinates by calling `getDataFromPixel(mousePos, series)` on the chart. Please note that those values don't necessarily match actual values in `chartData`, they represent the values at the point the mouse clicked.

We then update the `annotationData` of the chart.

Here is the sample code run in the annotations demo when clicking the chart:

```js
//store current chart for further use
this.currentChart = evt.detail.data.chart;

//get chart type
this.isRadarParallel = this.currentChart.nodeName === 'PX-VIS-PARALLEL-COORDINATES' || this.currentChart.nodeName === 'PX-VIS-RADAR';

//find the series available
if(this.isRadarParallel) {
  //find what axis we clicked on. The click target is the interaction
  //space on top of the axis
  var axis = evt.detail.data.clickTarget.parentElement;
  this.set('currentDimension', axis.getAttribute('dimension'));
} else {
  var keys = Object.keys(this.currentChart.completeSeriesConfig);
  this.set('dropdownSeries', keys);
  this.set('dropdownDisplayValue', keys[0]);
}

//store mouse pos for further use
this.mousePos = evt.detail.data.mouseCoords;

//open the modal
this.$.modal.modalButtonClicked();
```

this code stores a few interesting values and open a modal. The user then inpouts the message in the modal, potentially chooses the series linked to the annotation and saves it. On saving the demo runs this piece of code:

```js
//process data and assign to currentChart
var seriesFound,
    val,
    newData;

//get series
if(this.isRadarParallel) {
  seriesFound = this.currentDimension;
} else {
  seriesFound = this.dropdownSelected ? this.dropdownSelected : this.dropdownDisplayValue;
}

//find data values from mouse pos
val = this.currentChart.getDataFromPixel(this.mousePos, seriesFound);

//create annotation data
newData = {
  x: val[0],
  y: val[1],
  data: {
    message: this.$.modalText.value.trim()
  },
  series: seriesFound
};

//assign new data to the chart
this.currentChart.push('annotationData', newData);
this.$.modalText.value = '';
```

# Annotations Events

Once events have been created they are then displayed on a chart through a comment icon:

<catalog-picture img-src="../../../img/guidelines/dev/vis/annotations/annotations" img-alt="Annotations" style="border:none;" caption="Timeseries with three annotations"></catalog-picture>

The vis framework then provides events on interaction with those icons so that the app can decide how to display and interact the annotations:
  * px-vis-annotation-enter: Fired when the mouse enters an annotation icon (native mouseenter event)
  * px-vis-annotation-out: Fired when the mouse out an annotation icon (native mouseout event)
  * px-vis-annotation-over: Fired when the mouse hovers an annotation icon (native mouseover event)
  * px-vis-annotation-leave: Fired when the mouse leave an annotation icon (native mouseleave event)
  * px-vis-annotation-click: Fired when a click happens on an annotation icon (native click event)

Each of those events contain data relative to what icon has been clicked and the annotation data related to it. Evt.detail will contain the following `data` object:

```js
data: {
  annotationData: {
    x: ,
    y: ,
    data: {

    },
    series
  },
  icon: //the icon html element interacted with
```

Using those events the application can decide how/when to display the annotation. In the demo we use the following interactions:
  * enter: display a tooltip with the annotation message
  * leave: hide the tooltip
  * click: lock the tooltip and modify it so that the user can edit or delete the annotation

