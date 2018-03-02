---
title: Using and configuring the toolbar
layout: default
moduleName: view-develop-vis-configure-toolbar
dynamicTheme: true
pathToRoot: ../../../
otherImports: |
    <link defer rel="import" href="../../../bower_components/px-vis-timeseries/px-vis-timeseries.html">
    <link defer rel="import" href="../../../bower_components/px-modal/px-modal.html">
    <link defer rel="import" href="../../../bower_components/iron-ajax/iron-ajax.html">
componentReadyCallBack: |
  var modal = Polymer.dom(this.root).querySelector('#modal'),
    holder = Polymer.dom(this.root).querySelector('#holder'),
    chart = Polymer.dom(this.root).querySelector('#chart'),
    modalConfig = {
      "config": {
        "advancedZoom": true,
        "pan": true,
        "tooltip": true
      }
    },
    expandConfig = {
      "config": {
        "expand": {
          "icon": "px-nav:expand",
          "onClick": function () {
            //remove chart from current page
            holder.removeChild(this);
            //set new toolbar config for interaction
            this.set('toolbarConfig', modalConfig);
            //make the chart bigger
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            this.set('width', w - 360);
            this.set('height', h - 350);
            //append chart in modal
            Polymer.dom(modal).appendChild(this);
            //open modal
            modal.set('opened', true);
          }
        }
      }
    };

  chart.set('toolbarConfig', expandConfig);

  modal.addEventListener('opened-changed', function () {
    if(!modal.opened) {
      //remove chart from modal
      Polymer.dom(modal).removeChild(chart);
      //restore "expand" toolbar config
      chart.set('toolbarConfig', expandConfig);
      chart.set('width', 550);
      chart.set('height', 200);
      //ensure we "clean" the sub row
      chart.set('toolbarSubConfig', []);
      //move chart back to the page
      holder.appendChild(chart);
    }
  });
---

# Introduction

Each px-vis chart can optionally contain a toolbar element which consists of a main row of items and optional sub-rows. The sub-row can contain additional sub-items related to the item in the main row.

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-toolbar/toolbar" img-alt="toolbar subpart" style="border:none;" caption="Toolbar with the 'zoom' main item selected"></catalog-picture>

In the picture above, the main row consists of a "zoom" and "pan" option. The "zoom" item has been selected, displaying the associated sub-row with zooming options.

The toolbar is a highly customizable element that provides ways for the user to interact with the chart. It should be used to define actions related to the whole chart as opposed to a single series: zooming, panning, fetching new data, exporting as an image, etc. For interaction and/or configuration related to a single series, use the register's dynamic menus instead.

# General overview

Although the learning curve for configuring advanced features in the toolbar can be a bit steep, the general concept is relatively simple: the toolbar defines an `actionConfig` which is passed to the chart, which is then passed down to the component that handles user interaction on the chart. This component then uses the `actionConfig` to define what should happen on click, hover, mouseLeave, etc.

This user interaction component is either:

* `px-vis-interaction-space` for Timeseries, XY and Polar;
* `px-vis-axis-interaction-space` for Parallel Coordinates and Radar (the `actionConfig` will automatically trickle down through the multi-axis and interactive-axis elements in this case).

This means that user interactions in Timeseries, XY and Polar can happen anywhere on the chart, whereas they are limited to the axes of Parallel Coordinates and Radar.

The `actionConfig` property can also be passed directly to the chart, rather than coming from the toolbar (see "Define a global toolbar" further down in this guide).

# actionConfig

The `actionConfig` property is the main way in which interactions are defined. It is an object, where each key represents a user-defined event to handle (on the appropriate interaction space), and each value is either a string representing a predefined action, or the custom function that should be run for that event.

## Predefined actions

The predefined actions available depend on the type of interaction space the chart is using. They can be found in the `actionMapping` of the corresponding interaction space.

Predefined actions available in all interactions spaces:

* `calcTooltipData`: calculates tooltipData for the current cursor position, based on the type
* `calcCrosshairData`: similar to calcTooltipData but for the crosshairData
* `calcTooltipAndCrosshairData`: calcTooltipData + calcCrosshairData
* `resetTooltip`: resets the tooltipData to an empty object
* `resetCrosshair`: resets the crosshairData to an empty object
* `resetTooltipAndCrosshairData`: resets both the tooltipData and crosshairData to an empty object

Predefined actions only available in px-vis-interaction-space:

* `startZooming`: starts drawing the zooming box
* `stopZooming`: stops drawing the zooming box and calculates the new extents based on the box (effectively zooming)
* `startPanning`: starts panning, while automatically binding a panning update on mousemove
* `stopPanning`: stops panning and removes the panning update binding on mousemove
* `reportMouseCoords`: fires a `px-vis-interaction-space-mouse-coords` event with the current mouse coordinates

Predefined actions only available in px-vis-axis-interaction-space:

* `callAxisBrush`: toggles brushing on an axis, automatically updating the brush on mousemove. Typically called on both mousedown and mouseup to start/stop the brushing process
* `callAxisDrag`: toggles dragging on an axis, automatically updating the drag on mousemove. Typically called on both mousedown and mouseup to start/stop dragging and axis.

Given the actions above, the default `actionConfig` for px-vis-interaction-space is:

```javascript
{
  'mousedown': 'startZooming',
  'mouseup': 'stopZooming',
  'mouseout': 'resetTooltip',
  'mousemove': 'calcTooltipData'
}
```

This means that the default interaction is to control the zoom box on click and calculate the tooltipData when moving the cursor over the chart. The tooltipData is reset when the mouse leaves the chart, so that the register becomes empty instead of showing the last value.

## Custom functions

When running a custom function, it will be executed in the context of the chart - in your handler, `this` will be a reference to the chart itself. The handler will have one parameter that is an array holding the X and Y mouse coordinates relative to the interaction space target - the whole drawing space for `px-vis-interaction-space`, and a specific axis for `px-vis-axis-interaction-space`.

As of the v2.1.0 release of px-vis, the handler's parameter is an object with two keys:

* `mouseCoords`: holds the current mouse coordinates
* `target`: holds the element against which the the mouse coordinates are expressed

Using these two values, it is possible to retrieve the data values of a click rather than the pixel values. For example, a click handler for `px-vis-interaction-space` could look like this:

```javascript
handler: function(evt) {
  //using the X scale of the chart to convert pixel values to
  xValue = this.x(evt.mouseCoords[0]);
  //Assuming there's only 1 Y axis and we are in XY or timeseries. Otherwise you'll have to decide
  //against which axis this value should be calculated
  yValue = this.y['defaultAxis'](evt.mouseCoords[1]);
}
```

# Toolbar configuration/customization

The toolbar configuration dictates what items are present in the main row, what sub-row is defined for each main item, and what happens when clicking on a main item or a sub-item. It can be passed at the chart level through the `config` key in `toolbarConfig`:

```javascript
toolbarConfig = {
  'config': {}
}
```

Each key of this `config` object represents a new main item, with the value being the configuration for this item (including the related sub-row and sub-items).

## Predefined configurations

A set of predefined main items already exists in the toolbar and can be used by passing these as keys with a value of 'true':

* `axisBrush`: allows brushing on an axis (parallel coordinates and radar).
* `axisDrag`: allows dragging on an axis (parallel coordinates and radar).
* `crosshair`: enables crosshair search on the chart.
* `crosshairWithOptions`: enables crosshair search on the chart. Defines a sub-row with different options for crosshair search: closest point, point per series and points in area. Also includes two buttons to increase and decrease the search radius.
* `tooltip`: enables tooltip search and ensures the tooltip is on (other predefined configurations turn off the tooltip, but still allow for tooltipData to be calculated for use in the register).
* `pan`: enables panning on the chart. Also defines a single sub-row item that resets the chart extents to fit the current dataset.
* `zoom`: enables zooming on the chart. Also defines sub-row items for zoom in, zoom out, undo last zoom and reset zoom.
* `advancedZoom`: same config as `zoom`, plus sub-row items for zooming only on X, zooming only on Y, and zooming on both.
* `stripe`: enables striping. Also defines four sub-row items: inclusive striping, exclusive striping, add, and remove.


## Extending predefined configurations

A predefined configuration can be extended if necessary by using one of the predefined configuration keys and passing extra configuration as the value (see below for what can be added). This way it is possible to add more buttons to an existing predefined configuration.

## Custom configurations

When using a custom configuration, make sure each key of your `config` object is unique and different from those used in the predefined configurations.


* `icon`: icon to represent the item in the toolbar.
* `title`: description of the item (usually use this or the `icon` property, not both).
* `cursorIcon`: icon to display next to the cursor when hovering the interaction space.
* `tooltipLabel`: text shown in the tooltip when hovering the item.
* `selectable`: whether this item is selectable, meaning that it will turn blue when clicked. Usually used to indicate that some kind of mode has been enabled (i.e zoom only on Y) as opposed to a one time action (i.e zoom in).
* `selected`: if selectable, whether the item should be selected at initialization.
* `buttonGroup`: number, mandatory when selectable. In each row, all items with the same `buttonGroup` are "mutually exclusive" in terms of selection, so only the last item selected for a buttonGroup will be selected and the others will be automatically deselected.
* `onClick`: function to run when clicking this item. The function will be run in the context of the chart, unless `onClickContext` is set to "toolbar". It will have one parameter containing the configuration relating to this item.
* `onClickContext`: can be set to "toolbar" to run the `onClick` function in the context of the toolbar instead of the chart.
* `eventName`: if set, an event named with this string will be fired when clicking this item. It will contain the configuration for this item.
* `actionConfig`: the action config to set on the interaction space when clicking this item. Don't forget that you might want to reset (set to null) some handlers that might have been set by another item.


In addition, a main item may have a `subConfig` object defining all the sub-item configurations. The global structure of the `config` object becomes:

```javascript
config = {
  'yourMainItem1': {
    //set of properties you set for your item
    'subConfig': {
      'yourSubItem1': {
        //set of properties for sub item 1
      },
      'yourSubItem2': {
        //set of properties for sub item 2
      }
    }
  }
}
```

The predefined configurations use the exact same structure. The following code illustrates how the `advancedZoom` predefined configuration is coded internally:

```json
'advancedZoom': {
  'tooltipLabel': 'Zoom',
  'icon': 'px-nav:search',
  'cursorIcon': 'px-nav:search',
  'buttonGroup': 1,
  'selectable': true,
  'onClick': 'function() {this.set("_internalShowTooltip", false); this.set("extentsAction", "zoom");}',
  'actionConfig': {
    'mousedown': 'startZooming',
    'mouseup': 'stopZooming'
  },
  'subConfig': {
    'x': {
      'title': 'X',
      'buttonGroup': 1,
      'tooltipLabel': 'Zoom on X axis only',
      'eventName': 'my-custom-click',
      'selectable': true,
      'onClick': 'function() { this.set("selectionType", "xAxis");}'
    },
    'y': {
      'title': 'Y',
      'buttonGroup': 1,
      'tooltipLabel': 'Zoom on Y axis only',
      'selectable': true,
      'onClick': 'function() { this.set("selectionType", "yAxis");}'
    },
    'xy': {
      'title': 'XY',
      'tooltipLabel': 'Zoom on X and Y axis',
      'buttonGroup': 1,
      'selectable': true,
      'onClick': 'function() { this.set("selectionType", "xy");}'
    },
    'zoomIn': {
      'icon': 'px-utl:add',
      'tooltipLabel': 'Zoom in',
      'eventName': 'px-vis-toolbar-zoom-in'
    },
    'zoomOut': {
      'icon': 'px-utl:remove',
      'tooltipLabel': 'Zoom out',
      'eventName': 'px-vis-toolbar-zoom-out'
    },
    'undoZoom': {
      'icon': 'px-utl:reply',
      'tooltipLabel': 'Undo zoom',
      'eventName': 'px-vis-toolbar-undo-zoom'
    },
    'resetZoom': {
      'icon': 'px-nav:expand',
      'tooltipLabel': 'Reset zoom',
      'eventName': 'px-vis-toolbar-reset-zoom'
    }
  }
}
```

# Examples
## Define a custom toolbar for moving a chart into a modal

Scenario: you have a set of small non-interactive charts in your app so that your user can quickly parse high-level information. Once the user decides to investigate a chart, it should be maximized and interactive.

For this scenario, we'll use `px-modal` and two toolbar configurations. The idea is that when the chart is in "small mode" it will use a toolbar configuration with just one button. When this button is clicked, the chart will be moved into the px-modal and get a new toolbar configuration with different interactions:

```javascript
smallModallModeConfig = {
  "config": {
    "expand": {
      "icon": "px-nav:expand",
      "onClick": function () {
        //remove chart from current page, holder is the current parent of the chart
        holder.removeChild(this);
        //set new toolbar config for interaction
        this.set('toolbarConfig', modalConfig);
        //make the chart bigger and adjust given this website left and top menu/banner
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.set('width', w - 360);
        this.set('height', h - 350);
        //append chart in modal
        Polymer.dom(modal).appendChild(this);
        //open modal
        modal.modalButtonClicked();
      }
    }
  }
};
```

```javascript
modalConfig = {
  "config": {
    "advancedZoom": true,
    "pan": true,
    "tooltip": true
  }
}
```

We then listen on the `px-modal` for a "close" event, then move the chart back to where it initially was and restore the toolbar to the one item configuration:


```javascript
modal.addEventListener('btnModalNegativeClicked', function() {
  //remove chart from modal
  Polymer.dom(modal).removeChild(chart);
  //restore "small mode" toolbar config
  chart.set('toolbarConfig', smallModeConfig);
  //restore chart size
  chart.set('width', 550);
  chart.set('height', 200);
  //ensure we "clean" the sub row
  chart.set('toolbarSubConfig', []);
  //move chart back to the page
  holder.appendChild(chart);
});
```

This example is implemented below. We try to fit the modal in the available space. Note: this is a crude approach - a lot more could be done.

<div>
  <iron-ajax
    url="[[importPath]]configure-toolbar_data.json"
    handle-as="json"
    auto
    last-response="{{data}}">
  </iron-ajax>
  <px-modal id="modal" accept-text="Close" reject-text="Cancel"></px-modal>
  <div id="holder" >
    <px-vis-timeseries
      id="chart"
      width="550"
      height="200"
      slot="body"
      chart-data="[[data]]"
      series-config='{
        "y0":{"x":"timeStamp","y":"y0","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y1":{"x":"timeStamp","y":"y1","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y2":{"x":"timeStamp","y":"y2","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y3":{"x":"timeStamp","y":"y3","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1}}'
      margin='{"left":0,"right":0,"top":0,"bottom":0}'
      x-axis-config='{"ticks":3}'
      navigator-config='{"xAxisConfig":{"ticks":3}}'
    ></px-vis-timeseries>
  </div>
</div>

## Define a global toolbar driving several charts

Scenario: have a single place that defines what interaction should be used on a set of charts.

In this scenario, we will use a `px-vis-toolbar` outside of the charts. This toolbar will define an `actionConfig` as well as a `toolbarSubConfig` which will be passed to each chart. The action config will define the interaction and the secondary toolbar will dictate which secondary toolbar to show. For example, when clicking the "zoom" main item on the global toolbar, it can pass down the set of zooming options to each chart, so that each chart will be in zoom mode but the user can still independently choose which zooming options to use on each chart.

The external toolbar code is:

```html
<px-vis-toolbar
  current-sub-config="{{toolbarSubConfig}}"
  action-config="{{actionConfig}}"
  horizontal-alignment="left"
  id="toolbar"
  config='{
    "advancedZoom": true,
    "pan": true,
    "tooltip": true
  }'>
</px-vis-toolbar>
```


Each of the two charts need a bit of extra configuration:

```html
<px-vis-...
  toolbar-config='{ "config": {} }'
  toolbar-sub-config="[[toolbarSubConfig]]"
  action-config='[[actionConfig]]'>
</px-vis-...>
```

Resulting in:

<div>
  <px-vis-toolbar
    current-sub-config='{{toolbarSubConfig}}'
    action-config='{{actionConfig}}'
    horizontal-alignment='left'
    id="toolbar"
    config='{
      "advancedZoom": true,
      "pan": true,
      "tooltip": true
    }'>
  </px-vis-toolbar>
  <div id="holder">
    <px-vis-timeseries
      id="chart2"
      class="flex__item"
      chart-data="[[data]]"
      height=200
      toolbar-config='{ "config": {}}'
      toolbar-sub-config="[[toolbarSubConfig]]"
      action-config='[[actionConfig]]'
      register-config='{ "type": "horizontal"}'
      render-to-canvas
      series-config='{
        "y0":{"x":"timeStamp","y":"y0","type":"scatter","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y1":{"x":"timeStamp","y":"y1","type":"scatter","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"square","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y2":{"x":"timeStamp","y":"y2","type":"scatter","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"diamond","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
        "y3":{"x":"timeStamp","y":"y3","type":"scatter","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"wye","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1}}'
      margin='{"left":0,"right":0,"top":0,"bottom":0}'
      x-axis-config='{"ticks":3}'
      navigator-config='{"xAxisConfig":{"ticks":3}, "height":75}'>
    </px-vis-timeseries>
    <div style="margin-top: 20px;">
      <px-vis-timeseries
        id="chart3"
        class="flex__item"
        chart-data="[[data]]"
        height=200
        toolbar-config='{ "config": {}}'
        toolbar-sub-config="[[toolbarSubConfig]]"
        action-config='[[actionConfig]]'
        register-config='{ "type": "horizontal"}'
        render-to-canvas
        series-config='{
          "y0":{"x":"timeStamp","y":"y0","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
          "y1":{"x":"timeStamp","y":"y1","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
          "y2":{"x":"timeStamp","y":"y2","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1},
          "y3":{"x":"timeStamp","y":"y3","type":"line","yAxisUnit":"u","xAxisUnit":"u","markerSize":64,"markerSymbol":"circle","markerScale":1,"markerFillOpacity":0.6,"markerStrokeOpacity":1}}'
        margin='{"left":0,"right":0,"top":0,"bottom":0}'
        x-axis-config='{"ticks":3}'
        navigator-config='{"xAxisConfig":{"ticks":3}, "height":75}'>
      </px-vis-timeseries>
    </div>
  </div>
</div>
