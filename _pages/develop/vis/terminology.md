---
title: Vis Terminology
layout: default
moduleName: view-develop-vis-terminology
pathToRoot: ../../../
---

# Introduction

When starting to work with vis or the charts the terminology might be a bit confusing in terms of what to call each subpart of a chart. A timeseries chart is a good example because it has most of the available components.

Let's start by deconstructing the components in this timeseries chart.

<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/TS_basic" img-alt="Simple Timeseries" style="border:none;" caption="Simple Timeseries Chart"></catalog-picture>



# Basic/common components


## Series
Technically each series is a set of datapoints that we are trying to visualize on a chart. In this instance each series is represented with one colored line.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/series" img-alt="series subpart" style="border:none;"></catalog-picture>

## Register
The register displays values associated with each series, usually based on the mouse position on the chart.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/register" img-alt="register subpart" style="border:none;"></catalog-picture>

## Cursor
The cursor is a set of lines and circles highlighting sepcific data points, usually based on mouse position. The cursor and register are in sync.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/cursor" img-alt="cursor subpart" style="border:none;"></catalog-picture>

## Chart navigator
The chart navigator allows to filter data based on time. In a timeseries chart this would mean an X based zoom, for other chart just less data showing up on the chart.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/chart_navigator" img-alt="chart_navigator subpart" style="border:none;"></catalog-picture>

## Toolbar (and sub toolbar)
The toolbar is a deeply configurable subpart allowing the user to choose what type of interaction to use on the chart. It is a set of fully customizable buttons and actions, as well as optional sub buttons.
<catalog-picture img-src="../../img/guidelines/dev/vis/configure-toolbar/toolbar" img-alt="toolbar subpart" style="border:none;"></catalog-picture>

## Register dynamic menu
The register dynamic menu is a configurable menu with a set of action that would be run against a specific series. By default no actions are configured so it won't show unless you configure it.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/dynamic_menus" img-alt="dynamic_menus subpart" style="border:none;"></catalog-picture>



# Advanced subparts

## Thresholds
Thresholds are visual indications of a specific limit on a Y axis. They can be used on timseries and XY charts.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/thresholds" img-alt="thresholds subpart" style="border:none;"></catalog-picture>

## Events
Events are a visual indication of a meaningful change at a specific time. They are used on timeseries chart and are visually customizable.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/event" img-alt="events subpart" style="border:none;"></catalog-picture>

## Brushes
Brushes are used to filter the data visible on the chart. They can be used to include or exclude the data contained within the brush. It can be used on parallel coordinates and radar charts.
<catalog-picture img-src="../../img/guidelines/dev/vis/terminology/brushes" img-alt="brushes subpart" style="border:none;"></catalog-picture>

