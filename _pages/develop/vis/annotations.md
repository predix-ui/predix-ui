---
title: Using the annotations feature
layout: default
moduleName: view-develop-vis-annotations
pathToRoot: ../../../
---

# Introduction

Version 4.6.0 of the vis framework saw the introduction of the annotations feature. This feature has been voluntarily left unopiniated and much of its look and interaction will be left to the application to implement. This article will walk you through how the feature works and the <a href="https://www.predix-ui.com/px-vis-demos/px-vis-demos/annotations.html" target="_blank">example implementation</a> we provide.

<catalog-picture img-src="../../../img/guidelines/dev/vis/annotations/annotations_example" img-alt="example annotations" style="border:none;" caption="Implementation example of the annotations"></catalog-picture>

# Annotations feature: one array and some hooks

The feature is minimalistic from the chart perspective: one `annotationData` array containing all the annotation data and some events for the app to handle interactions with the annotations.

## annotationData

`annotationData` is an array containing one object for each annotation:
```js
{
  x: 1325897523,
  y: 15.7,
  series: y0,
  data: {

  }
}
```

`x` and `y` are data values (not pixel values). However they don't have to match an actual data point, the chart will convert those data values to the appropriate pixel values for displaying them.

`series` is an id of a series: for XY/Timeseries/Polar charts this is a series id in `seriesConfig` and for parallel coordinates/radar charts this is an axis. This is needed for the annotation to know which scale to use to convert the data values to pixel values.

`data` is an arbitrary object that can hold any information you might need in the annotation. Typically this would have at least a message string. This data object will be available in the event handlers for annotation interaction.

## Events

This array is all that is needed to display annotations. In order to ineract with those the following events are available:
  * `px-vis-annotation-enter`: Fired when the mouse enters an annotation icon (mouseenter event)
  * `px-vis-annotation-out`: Fired when the mouse out an annotation icon (mouseout event)
  * `px-vis-annotation-over`: Fired when the mouse hovers an annotation icon (mouseover event)
  * `px-vis-annotation-leave`: Fired when the mouse leave an annotation icon (mouseleave event)
  * `px-vis-annotation-click`: Fired when a click happens on an annotation icon (click event)

Each of those event holds a data object (`event.detail.data`) which will have:
  * an `annotationData` property containing the related `data` object from the `annotationData` array
  * an `icon` property which is the actual annotation icon that has been interacted with

Another event is fired when an annotation creation request happens, i.e <strong>when using the out of the box `annotations` toolbar configuration</strong> and the user clicks the chart: `px-vis-annotation-creation`. This event is defined in the toolbar configuration, so if using a custom annotations toolbar configuration you might want to copy it or create your own.

this event detail will contain the following `data` object:
```js
data: {
 chart: //the chart responsible for this interaction
 clickTarget: //the actual interaction target that has been clicked. Usually an axis interaction space (parallell coordinates/radar) or an interaction space
 mouseCoords:// the coordinates of the mouse relative to the clickTarget
}
```
the mouse coordinates can be converted to data values by calling
`getDataFromPixel(mouseCoords, series)` on the chart. `series` is
a series which scale will be used to convert (a `seriesConfig` series
for xy/timeseries/polar or an axes for parallel coordinates/radar).

# Example implementation

We provide an example of a possible implementation of the annotation feature. The demo can be found <a href="https://www.predix-ui.com/px-vis-demos/px-vis-demos/annotations.html" target="_blank">here</a> and the code <a href="https://github.com/PredixDev/px-vis-demos/blob/master/px-vis-demos-annotation.es6.js" target="_blank">there</a>.

## Requirements

This implementation aims at allowing creation, edition and deletion of annotations on any type of chart. The annotation message should be displayed in a tooltip when hovering an annotation icon.

Furthermore the annotation should always be linked to an actual data point, the closest to the mouse when clicking, rather than being allowed anywhere on the chart

## Custom toolbar config

In order to make it easier to find the closest point to the mouse we are going to use a custom annotations toolbar config. This custom config is an extended version of the out of the box one: we only change the tooltip search mode to be the closest point and make sure we run the tooltip search on hovering:
```js
{
  'tooltipLabel': 'Annotations',
  'icon': 'px-vis:comment',
  'cursorIcon': 'px-vis:comment',
  'buttonGroup': 1,
  'onClick': function () {
    this.set('_internalShowTooltip', false);
    this.set('showStrongIcon', true);
    //setting tooltip search to closest point
    this.set('interactionSpaceConfig.searchType', 'closestPoint');
    this.set('interactionSpaceConfig.searchFor', 'point');
  },
  'onDeselect': function () {
    this.set('showStrongIcon', false);
    //reset tooltip search to timestamp
    this.set('interactionSpaceConfig.searchFor', 'timestamp');
  },
  'actionConfig': {
    //clear tooltip if mouse leaves the chart
    'mouseout': 'resetTooltip',
    //search for tooltip data on hover
    'mousemove': 'calcTooltipData',
    'mousedown': 'null',
    'click': function (evt) {
      this.fire('px-vis-event-request', { 'eventName': 'px-vis-annotation-creation', 'data': { 'mouseCoords': evt.mouseCoords, 'clickTarget': evt.target, 'chart': this } })
    },
    'mouseup': 'null'
  },
  'subConfig': {
    'hideAnnotations': {
      'tooltipLabel': 'Hide Annotations',
      'icon': 'px-vis:hide',
      'buttonGroup': 1,
      'toggle': true,
      'onClick': 'function(button) {this.$$("px-vis-annotations").set("hide", button.selected);}'
    }
  }
}
```

The config looks a bit daunting but only the commented lines have been added, the rest is just the copied out of the box configuration.

## Creation

For creation we listen to the `px-vis-annotation-creation` event. When it is fired we try to retrieve the value of the closest point and its associated series, which will be available in the `tooltipData` since we run the tooltip data search on hover (see `createAnnotation` in the demo code for actual code implementation).

Once we have the data values and series we open a modal the user can interact with. The modal will display the series, data values as well as a text area used to input the actual annotation.

<catalog-picture img-src="../../../img/guidelines/dev/vis/annotations/annotation_creation" img-alt="annotation creation" caption="Modal for creating an annotation"></catalog-picture>

When the user clicks create we update the chart's `annotationData` with the data values, series and message.

## Display annotation message

We display the annotation on the `px-vis-annotation-enter` event. We set the annotation message to the tooltip, set the annotation icon as the tooltip target and force the tooltip open:

```js
if(!this._lockTooltip) {
  this.$.ttContent.annotationMessage = evt.detail.data.annotationData.data.message;

  this.set('_ttTarget', evt.detail.data.icon);
  this.$.tooltip.set('opened', true);
}
```

On `px-vis-annotation-leave` we force the tooltip close.

```js
if(!this._lockTooltip) {
  this.$.tooltip.set('opened', false);
}
```

## Edit/Delete annotations

For editing annotations we listen to `px-vis-annotation-click`. When this happens we "lock" the tooltip: `this._lockTooltip = true;`, preventing it from hiding.

We then modify the tooltip content to display a text area with the message and three buttons: Cancel, Delete and Save.

<catalog-picture img-src="../../../img/guidelines/dev/vis/annotations/annotation_edit" img-alt="annotation editing" style="border:none;" caption="Editing an annotation"></catalog-picture>

On Cancel we just close the tooltip.

On Save we update the `annotationData` with the new message.

On Delete we remove this annotation from `annotationData`.

```js
var index;
if(this._editAction === 'save') {
  index = this.currentChart.annotationData.indexOf(this._currentDataEdit);
  this.currentChart.annotationData[index].data.message = this.$.ttContent.annotationMessage;
} else if(this._editAction === 'delete') {
  index = this.currentChart.annotationData.indexOf(this._currentDataEdit);
  this.currentChart.splice('annotationData', index, 1);
}
```

#Conclusion

The example we provide is that: just an example. The annotations feature is pretty open in terms of implementation and interaction, feel free to imagine different ways to create/edit/delete them!
