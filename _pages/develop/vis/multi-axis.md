---
title: Setting up multi-axis on Timeseries and XY
layout: default
moduleName: view-develop-vis-multi-axis
pathToRoot: ../../../
---

# Introduction

By default, px-vis-timeseries and px-vis-xy-chart have one dependent axis, but you can configure them to have multiple dependent axes. This guide will walk you though how.

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/multi-axis" img-alt="example axis" style="border:none;" caption="Multi-Axis"></catalog-picture>


# Configuring a multi-axis chart

In the "Introduction to configuring a chart", we introduced the `seriesConfig` property. To create a multi-axis chart, we'll return to this property. This configuration produces a single axis chart:

```json
{
  "uniqueSeriesId1": {
    "x": "Timestamp",
    "y": "asset1",
    "name": "Asset 1",
    "type": "line"
  },
  "uniqueSeriesId2": {
    "x": "Timestamp",
    "y": "asset2",
    "name": "Asset 2",
    "type": "line"
  },
  "uniqueSeriesId3": {
    "x": "Timestamp",
    "y": "asset3",
    "name": "Asset 3",
    "type": "line"
  }
}
```

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/single-axis" img-alt="single axis" style="border:none;" caption="Single Axis"></catalog-picture>

The above example configuration defines three series, but does not define any axis. By default, if no axis is specified in the `seriesConfig`, it places the series on a default axis. Adding in an axis key will allow us to define different axes and specify to which axis each series belongs:

```json
{
  "uniqueSeriesId1": {
    "x": "Timestamp",
    "y": "asset1",
    "name": "Asset 1",
    "type": "line",
    "axis": {
      "id": "axisA",
      "side": "left",
      "number": "1"
    }
  },
  "uniqueSeriesId2": {
    "x": "Timestamp",
    "y": "asset2",
    "name": "Asset 2",
    "type": "line",
    "axis": {
      "id": "axisC",
      "side": "right",
      "number": "1"
    }
  },
  "uniqueSeriesId3": {
    "x": "Timestamp",
    "y": "asset3",
    "name": "Asset 3",
    "type": "line",
    "axis": {
      "id": "axisB",
      "side": "left",
      "number": "2"
    }
  }
}

```

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/multi-axis" img-alt="multi-axis" style="border:none;" caption="Multi-Axis"></catalog-picture>

You'll notice that the `axis` key expects an object value, itself with three keys:
* `id`: a unique identifier for the axis
* `side`: which side of the chart the axis should go
* `number`: an numerical order for each axis on that side

You'll notice in the above configuration that we've defined two axes on the left and one on the right. These axes have the ability to be reordered by the end users. However, at this time, the number of axes on the left and right side will remain fixed.

If you want multiple series to be on the same axis, just give them the same axis definition:

```json
{
  "uniqueSeriesId1": {
    "x": "Timestamp",
    "y": "asset1",
    "name": "Asset 1",
    "type": "line",
    "axis": {
      "id": "axisA",
      "side": "left",
      "number": "1"
    }
  },
  "uniqueSeriesId2": {
    "x": "Timestamp",
    "y": "asset2",
    "name": "Asset 2",
    "type": "line",
    "axis": {
      "id": "axisA",
      "side": "left",
      "number": "1"
    }
  },
  "uniqueSeriesId3": {
    "x": "Timestamp",
    "y": "asset3",
    "name": "Asset 3",
    "type": "line",
    "axis": {
      "id": "axisB",
      "side": "left",
      "number": "2"
    }
  }
}

```

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/two-series" img-alt="two series" style="border:none;" caption="Two series on one axis"></catalog-picture>


# Setting chart extents

If you want to manually set your chart extents on a single axis, you would do so like this:

```javascript
chartExtents = {
  "x": ["dynamic", "dynamic"],
  "y": [0,40]
};
```

This defines your y-axis to have a domain from 0 to 40. If you apply this to your multi-axis chart, it will set that domain for all the axes.

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/y40" img-alt="domain 0-40" style="border:none;" caption="All axes with a domain 0-40"></catalog-picture>

Instead, to set the chartExtents on a particular axis, you'll want to use that axis' `id`

```javascript
chartExtents = {
  "x": ["dynamic", "dynamic"],
  "axisA": [0,40],
  "axisC": [-2,2]
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/axisac" img-alt="axisA and axisC" style="border:none;" caption="Axis A with a domain 0 to 40 and Axis C with a domain -2 to 2"></catalog-picture>

Now, the custom domains get only applied to `axisA` and `axisC`, while `axisB` fallsback to `dynamic`.

# Configuring the y axes

Configuring the y axes is similar to setting its chartExtents. With a single axis, we customize properties of the y axis like this:

```javascript
yAxisConfig = {
  "unit": "Beard-seconds"
};
```

This would display a `unit` in the title. However, if we apply this configuration to a multi-axis chart, the unit gets applied to every axis.

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/unit" img-alt="unit" style="border:none;" caption="All axes with a unit"></catalog-picture>

Configurations listed in the yAxisConfig will be applied to every axis, which can be a nice shorthand for applying properties to all the axes. To apply specific configs to only one axis, nest the configuration with the axis ID as the key:

```javascript
yAxisConfig = {
  "unit": "Beard-seconds",
  "axisA": {
    "title": "Axis A"
  },
  "axisB": {
    "title": "Axis B",
    "unit": "MegaFonzie"
  },
  "axisC": {
    "title": "Axis C"
  }
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/multi-axis/axisconfig" img-alt="axis config" style="border:none;" caption="Specific configs for each axis"></catalog-picture>

You can see that each axis gets the general `unit`, 'Beard-seconds', which was listed without a specific axis. But each gets only the `title` in its particular config. You will also note that the config for `axisB` also has a different `unit`, which overwrites the general `unit` configuration.