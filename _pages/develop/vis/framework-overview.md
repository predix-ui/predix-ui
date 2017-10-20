---
title: Vis Framework Overview
layout: default
moduleName: view-develop-vis-framework-overview
pathToRoot: ../../../
---

# Introduction

Px-vis a charting platform, developed by the Predix UI team. It relies on the open source d3 library, and provides wrappers around a lot of features and functionalities offered in D3.
Please note that you do not need to know any d3 to use px-vis, but if you do, you can make modifications with d3 on top of the charts.

Px-vis is written using Polymer – an open source library maintained by Google - and can be incorporated into any framework using either the provided Polymer components.

If you're building a new chart using the px-vis Polymer building blocks, you can use the provided Polymer behaviors/components.

You do need to know Polymer to use px-vis – to use any of the building blocks or charts, you simply import them and use the tags in your app, with the appropriate attributes. This greatly reduces the time spent building your chart from scratch.

One of the main advantages of px-vis over other charting libraries is how customizable it is – by default, all of the px-vis building blocks and charts follow the Predix Design System guidelines, and have the default colors and spacing specified in them, ensuring that the developer has a well-tested baseline from which they can start customizing the chart in question. If you do need to customize the look and feel, you can find the customization options in the API.

The px-vis platform supports both SVG and Canvas, and you can choose the correct workspace for the type of chart needed. It even has an SVG-Canvas hybrid you can use to optimize the draw time – the platform is smart enough to use the fastest tools for the job.

There are 3 different ways of using the px-vis platform

1. Use the existing charts, such as px-vis-radar, for example. These charts are built with the same px-vis building blocks you have access to.
2. Build your own charts using the px-vis building blocks detailed below.
3. Extend the existing charts using the provided building blocks.

### Existing Charts
Px-vis offers an ever-expanding selection of charts.

Currently, you can use
* [Parallel Coordinates](#/components/px-vis-parallel-coordinates)
* [Pie Chart](#/components/px-vis-pie-chart)
* [Polar Chart](#/components/px-vis-polar)
* [Radar](#/components/px-vis-radar)
* [Spark](#/components/px-vis-spark)
* [Timeseries](#/components/px-vis-timeseries)
* [XY](#/components/px-vis-xy-chart)

### Build Your Own Charts
If you decide to create a chart from scratch, the bare minimum you will need is a workspace, a scale, and a drawing tool. You can read more about all of these tools below.

### Extend Existing Charts
Since the existing charts were built using the existing building blocks, you can use the same building blocks to extend the charts.




# Prerequisites
To use any of the px-vis building blocks, you'll need to follow these three steps

### 1. Bower install
To use any of the px-vis components mentioned on this page, you'll first need to add px-vis as a dependency in your application.

To use the bower registry, you must have bower installed. If you do not have it installed, you can install it by going to your command line, and typing in `npm install bower –g`.

Once you have bower installed on your machine, you can install the px-vis framework by typing in `bower install px-vis` into a command line prompt.

This will retrieve the px-vis repository, and save it in your bower_components folder, making it available inside your app.

### 2. Import the px-vis component
Once you've added px-vis as a dependency, you can include the component you're interested in, by importing it into your app using the link tag.

Here is an example

```html
<link rel="import" href="bower_components/px-vis/px-vis-svg.html" />
```

substitute px-vis-svg.html with the component you'd like to import.

### 3. Include tag
The final step is to include the tag in your code, and specify the customization attributes that fit your needs.

Here is an example

```html
<px-vis-svg
  svg="{{svg}}"
  width="[[width]]"
  height="[[height]]"
  margin="[[margin]]">
</px-vis-svg>
```




# Concepts & Patterns

### Requirements
Each new chart needs, - at the bare minimum – a workspace component (svg, canvas or a hybrid svg-canvas), a way to scale your data (scale, multi-scale or radial scale), and a drawing tool.

### Attribute definition and export
Components within the px-vis framework can create certain things (such as the svg workspace, for example), and pass them along to other components in the framework that require them.

You can see where the data is initially created by observing which component has a two way binding ( {{twoWayBinding}} ) on an attribute, instead of a one way binding ( [[oneWayBinding]] ) – this indicates that this component doesn't just consume the attribute – it creates it, and pushes it out.

For example,  take this px-vis-svg component


```html
<px-vis-svg
  svg="{{svg}}"
  width="[[width]]"
  height="[[height]]"
  margin="[[margin]]">
</px-vis-svg>
```

Here, the component uses the one-way bound width, height, and margin, and defines and exports the svg attribute for consumption in other components.




# Start charting

When you build a chart, the first thing you need is to pick the type of workspace you'll use.
Each chart will only have 1 workspace in it – this means you have to only choose one of the following as your workspace.

You can choose one of the 2 main options, or a 1 hybrid option

### Canvas
Canvas provides a rasterized (flattened) version of a workspace – it has the advantage of loading things much faster than SVG, but you pay the price by exchanging speed with quality – canvas lines and text are not as crisp as SVG and providing interactions with things drawn on canvas is more difficult, and Canvas is best suited for large quantities of data where speed of data rendering is a key requirement.
</br>[API Documentation](#/components/px-vis-canvas)


### Svg
SVG provides an easy to read XML code for creating vector based lines/paths.
It works best when you need higher quality images, with more details, and provides easier user interactions capabilities – however, please note that after a certain number of points/lines, it does come with a hefty price that comes from the number of DOM manipulation that comes from adding all the created nodes to the DOM.
The more points/lines/paths you add into your svg workspace, the slower your chart is going to load.

When using svg in the workspace, working with elements may require more extensive handling, e.g. pinpointing the cursor’s exact position. To help you with this, the px-vis framework offers the px-vis-interaction-space interaction tool.
</br>[API Documentation](#/components/px-vis-svg)


### Svg-canvas
This is a hybrid of both Svg and Canvas, using the best features of each.

* svg layer on top(svg attribute) : Can hold,  lines, axis, etc.
* canvas layer in the middle(canvasContext): Used to draw the data efficiently.
* A secondary svg layer on the bottom(svgLower): Used to hold gridlines, background images, etc.

[API Documentation](#/components/px-vis-svg-canvas)


### Data Binding Exports

All 3 workspaces have one thing in common – they all "export" a workspace through two-way data binding, achieved by specifying an attribute – specific to each component -  and using two-way binding to "export" that value.

With px-vis-svg, this is achieved with the svg attribute

```html
<px-vis-svg
  ...
  svg="{{svg}}"
  ...
></px-vis-svg>
```

with px-vis-canvas, using the convasContext attribute

```html
<px-vis-canvas
  ...
  canvas-context="{{canvasContext}}"
  ...
></px-vis-canvas>
```

and, px-vis-svg-canvas, which has both, and an additional svgLower attribute

```html
<px-vis-svg-canvas
  ...
  canvas-context="{{canvasContext}}"
  svg="{{svg}}"
  svg-lower="{{svgLower}}"
  ...
></px-vis-svg-canvas>
```




# Interpret your data

All charts need a way to take your data and translate it to pixels on the screen.
Px-vis provides you with 3 different types of scaling your data -  You only need  1 scale per chart.
All 3 types translate data to pixel coordinates, and pixel coordinates back into data.


### Scale
This component provides two scales – an X (independent axis) and Y (dependent axis). Scale is available as either a behavior or a component (Polymer HTML elements).
</br>[API Documentation](#/components/px-vis-scale)

### Multi Scale
This component provides a single ordinal X axis and multiple independent continuous Y axes. This scale is only available as a component.
</br>[API Documentation](#/components/px-vis-multi-scale)

### Radial Scale
This component provides an X and Y - similar to scale, but the scale accepts polar data and returns Cartesian pixel coordinates, creating a polar plot. This scale is only available as a component.
</br>[API Documentation](#/components/px-vis-radial-scale)


### Scale data Binding Exports


#### X & Y

The x and y attributes are created by px-vis-scale, and exported using two-way binding. Please note, both x & y are not numbers, but functions that return an object. This object has properties that can be called, such as the range() (this is the pixel space) or domain() (this is the value space)  functions.


#### domainChanged

Since Polymer cannot observe the output of functions, px-vis uses another property called domainChanged – which is a Boolean, to fake listening to changes. The value of domainChanged is of less importance, since px-vis is only looking for a notification that the values for x & y have changed.





# Drawing tools

Px-vis has many tools for you to use to draw different shapes/lines in your chart, each one with its own benefits, starting from the simple px-line-svg and px-vis-scatter, to the more complicated px-vis-pie and px-vis-radar-grid - It's up to you to find the correct drawing tool for your need.

### Axis
Draws an axis line with tick marks. Can be vertical or horizontal and can be positioned on any edge of the chart
</br>[API Documentation](#/components/px-vis-axis)


### Clip Path
Draws an SVG rectangular clipPath, preventing SVG from drawing anything outside of the clip rectangle. Does not work with Canvas.
</br>[API Documentation](#/components/px-vis-clip-path)


### Clip path complex area
Draws an SVG compound polygonal clipPath, preventing SVG from drawing anything outside of the clip shape. Does not work with Canvas.
</br>[API Documentation](#/components/px-vis-clip-path-complex-area)


### Event
Used for marking an event occurrence. Draws an icon and line vertically.
The icon includes a tooltip, which can contain the X value, event name and event ID.
</br>[API Documentation](#/components/px-vis-event)


### Gridlines
Draws horizontal or vertical grid lines in your chart, depending the passed in configuration.  Helps in the association of axes values and data points.
</br>[API Documentation](#/components/px-vis-gridlines)


### Highlight Line Canvas
Similar to line-canvas, draws lines to highlight specific data.
</br>[API Documentation](#/components/px-vis-highlight-line-canvas)


### Highlight Line
Similar to line-svg, draws lines to highlight specific data.
</br>[API Documentation](#/components/px-vis-highlight-line)


### Highlight Scatter Canvas
Similar to scatter-canvas, draws scatters to highlight specific data.
<!--</br>[API Documentation](#/components/px-vis-highlight-scatter-canvas)-->


### Highlight Scatter
Similar to scatter-svg, draws scatters to highlight specific data.
<!--</br>[API Documentation](#/components/px-vis-highlight-scatter)-->


### Interactive Axis
Draws an axis with integrated user interactivity, such as brush and drag.
</br>[API Documentation](#/components/px-vis-interactive-axis)


### Line Canvas
Draws a line representation of data, using Canvas. Can either draw single or multiple lines depending on configuration and data.
</br>[API Documentation](#/components/px-vis-line-canvas)


### Line SVG
Draws a line representation of your data, using SVG. Can either draw single or multiple lines depending on configuration and data.
</br>[API Documentation](#/components/px-vis-line-svg)


### Multi Axis
Draws multiple Axes positioned ordinally. Each axis can have an individual or shared scale. Can be radial or horizontal.
</br>[API Documentation](#/components/px-vis-multi-axis)


### Pie
Draws a pie or donut representation of your data, using SVG. Includes a tooltip and popover. The colors need to be included in the data set, through a colorIndex property.
</br>[API Documentation](#/components/px-vis-pie)


### Radar Grid
Creates polygonal grid lines. Used as a background for radar charts.
</br>[API Documentation](#/components/px-vis-radar-grid)


### Radial gridlines
Creates circular grid lines. Used as a background for polar charts.
</br>[API Documentation](#/components/px-vis-radial-gridlines)


### Scatter
Draws symbols which represents your data using SVG. The symbols can be customized using markerSymbol; the default is a circle.
</br>[API Documentation](#/components/px-vis-scatter)


### Striping
Draws striped areas on the chart.
</br>[API Documentation](#/components/px-vis-striping)


### Threshold
Creates a horizontal line to indicate a predefined threshold level.  Threshold attributes are set through threshold-config which can contain a title, line color and type.
</br>[API Documentation](#/components/px-vis-threshold)





# Active Interaction Tools

The end user can click, hover or manipulate the data by performing an action.

### Axis Interaction Space
A drawn box used to select a range on an axis. Usually drawn by a mouse, although the box can be drawn programmatically. To enable the brush, you have to select the axis so the cursor is triggered, then drag to draw the rectangle which will then remove all other data points outside of the brushed area. This brush can also be deleted programmatically or through a user interaction by clicking off the brush.
</br>[API Documentation](#/components/px-vis-axis-interaction-space)


### Axis Drag

Provides drag behavior to an axis, allowing the user to reposition the axis using their mouse.


### Brush
A drawn box used to select range on a 1-dimensional region. Usually drawn by a mouse, although the box can be drawn programmatically. It always has visible handles and the brushed (selected) area always stays visible. While using the mouse, you are confined to the visible portion of the workspace.
</br>[API Documentation](#/components/px-vis-brush)


### Chart Navigator
This component provides a way to filter your data –with a brush - based on the time domain.
The chart navigator is a small chart accompanying the main chart or charts, intended to display the entire data set for the provided series.
When tied to a timeseries chart, the filtering results in zooming and panning. In non-timeseries charts, it filters the displayed data based on the time domain.
</br>[API Documentation](#/components/px-vis-chart-navigator)


### Dynamic Menu
A configurable dropdown menu, used inside a register. Can be used to hook custom functions, fire events, and define actions which pertain to a particular series.
</br>[API Documentation](#/components/px-vis-dynamic-menu)


### Interaction Space
Interaction Space is an invisible rectangle overlaid on the chart which captures mouse interactions and performs calculations for zooming, panning and tooltip functionality.

Can be configured for custom interactions on the chart through actionContext.
</br>[API Documentation](#/components/px-vis-interaction-space)


### Register
An HTML element which can be used to display the series names, colors, values, and timestamps.
Each register can include dynamic menus that can be configured to interact with a particular series.  Includes px-vis-register-item, px-vis-register-item-pie and px-vis-register-datetime.
</br>[API Documentation](#/components/px-vis-register)


### Toolbar
A configurable element enabling direct interaction with the chart.
There are sample interactions provided as "out of the box" examples in chart demos; however, the toolbar is fully configurable and can be customized to any application requirements that requires direct interaction with the chart.
Each main row button can have a defined sub row – either one of which can trigger events or/and function calls. The toolbar can return an actionContext property, used by px-vis-interaction-space, to define custom mouse interactions on the chart.
</br>[API Documentation](#/components/px-vis-toolbar)




# Passive Interaction Tools

Your user cannot click or change anything on the element – it is a read-only element.

### Cursor
A tool used to highlight data points using a configurable circles and lines. Typically used to draw attention to a particular data point.
</br>[API Documentation](#/components/px-vis-cursor)


### Cursor-Line
A tool used to highlight data points using a line. Typically used to draw attention to a particular data point.
</br>[API Documentation](#/components/px-vis-cursor-line)


### Tooltip
A floating version of the register which can follow the mouse, or be triggered on hover over data points, displaying the same information as the register. The tooltip does not have any interactions with the dynamic menu and only contains informational data values.
Use of the tooltip is not recommended since it covers the data beneath it.
</br>[API Documentation](#/components/px-vis-tooltip)





# Utilities

Px-vis provides you with some handy utilities to help you with building your charts.

### vis-d3 & vis-behavior-d3

Loads d3 for px and stores any other version of d3 that was previously loaded. Used to avoid d3 version conflicts. The previously loaded versions are stored in window.Px.oldD3.


### Data Converter

Converts data from the timeseries Predix Service to the standard vis format. The data converter Is also used to create the seriesConfig attribute from the provided data.
