---
title: Setting up multi-axis on Timeseries and XY
layout: default
moduleName: view-develop-vis-multi-axis
pathToRoot: ../../../
---

# Introduction

By default, px-vis-timeseries and px-vis-xy-chart have one dependent axis, but you can configure them to have multiple dependent axes. This guide will walk you though how.


<catalog-picture img-src="../../../img/guidelines/dev/vis/multi-axis/single-axis" img-alt="example axis" style="border:none;" caption="Single Axis"></catalog-picture>

<catalog-picture img-src="../../../img/guidelines/dev/vis/multi-axis/multi-axis" img-alt="example axis" style="border:none;" caption="Multi-Axis"></catalog-picture>


# How axes work in d3

The first thing to understand is what parts go together to create an axis - a d3 scale, d3 axis, and d3 formaters.

First, you have your scale, which converts your data into a pixel coordinate. D3 provides many different types of scales to help with that data-to-pixel conversion. Px-vis supports several different scales, but the charts often have these scales fixed to a particular type. The exceptions are Timeseries and XY-Chart where you can configure the scales types via the `xAxisType` and `yAxisType` properties. In general, you do not need to worry about this, but the type of scale does affect what configuration option there are and if your data is displayed as a number, datetime, or string.

This scale is then combined with a d3 axis object to create the visual representation.

Additionally, formatting function can get used to control the values shown on the ticks.

All together, d3 does an amazing job trying to display a logical axis for your data's domain, but sometimes you want it to show different tick values. There are many different options to help you do that as outlined below.

# Passing configuration from the chart to an axis

To configure the axes in a Predix Design System chart, you'll want to create an axisConfig object to pass to the chart. This object  takes the axis properties as keys and the values you are setting as the corresponding value.

Example:
```js
let myConfig = {
  ticks: 5
}

// bind or set the chart's xAxisConfig property equal to the config object
myChart.set('xAxisConfig', myConfig);

```
