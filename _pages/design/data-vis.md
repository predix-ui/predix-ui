---
title: Data Visualization
layout: default
moduleName: view-design-data-vis
pathToRoot: ../../
---

Our Data Visualization tools provide vital information to our customers to ensure optimum performance of their Industrial ecosystem. Some key areas where our Vis tools can be used are monitoring the health of assets for maintenance optimization, a
success or failure of factory processes, or the operational status of a group of plants. Creating readable visualizations play a vital role in helping our customers make split second decisions on how to proceed with handling a variety of situations
that in turn could save lives and reduce maintenance costs.
The [Vis Framework Guides](#/guides/vis-guides-terminology) provide a general overview of data vis terminology as well as technical guidance on how to [configure charts](#/guides/vis-guides-configuring-charts) and [the toolbar](#/guides/vis-guides-toolbar).

# Best Practices
### Consider the nature of the data
Different types of data are suited for different types of visualizations.


### Account for the user's expectations of presentation
Some data is expected to be displayed in a specific way. For example, time-oriented data is best suited for a time-series chart while vibration data might be best suited for a polar
chart.


### How many points of data will need to be rendered onto the chart?
The quantity and density of the data to be displayed may assist in deciding on the best visualization.


### What are the interactions the user will need to evoke when consuming the data?
Data consumed on a dashboard has very different interaction needs than data being used for analysis.



# Data Vis Framework Charts
These charts are part of the D3-based data visualization framework. They are highly interactive and configurable and built to be performant with large amounts of data. More on our data visualization framework is [here](https://medium.com/ge-design/introducing-ges-data-visualization-framework-for-iot-27c350b02c04).

Px-vis was created in close collaboration with the GE Digital Asset Performance Management team, and with substantial input from users about how they look at data in monitoring and diagnostics scenarios.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/parallel_axis_example"
    img-alt="Parallel Chart"
    title="Parallel Chart"
    caption="Used for analyzing multivariate data to look for comparisons.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/pie_chart"
    img-alt="Pie Chart"
    title="Pie Chart"
    caption="Standard pie chart showing values relative to each other in a circular format.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/polar_example"
    img-alt="Polar Chart/Radar Chart"
    title="Polar Chart/Radar Chart"
    caption="Used to view multivariate data, preferred when sensors are displayed in a circular fashion on an asset or the element spins.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/spark_example"
    img-alt="Spark Chart"
    title="Spark Chart"
    caption="A small line chart without axes or measures that provides a user a glimpse of a trend.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/time_series_example"
    img-alt="Timeseries Chart"
    title="Timeseries Chart"
    caption="Provides means to analyze data over a period of time.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/xy_example"
    img-alt="XY Chart"
    title="XY Chart"
    caption="Used to find correlations between two or more parameters or tags.">
  </catalog-picture>
</div>


# Simple Charts
For lighter weight use cases, simple charts offer basic functionality with minimal interactivity and less configuration options.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/percent_circle_example"
    img-alt="Percent Circle Chart"
    title="Percent Circle"
    caption="Used for conveying a single value as a percentage of a whole circle.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/gauge_example"
    img-alt="Gauge Chart"
    title="Gauge"
    caption="A simple data visualization component for conveying a single value as a percentage of a circular arc.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/area_chart_example"
    img-alt="Simple Area Chart"
    title="Simple Area Chart"
    caption="Similar to the line chart with the area below the line filled in. Provides an easy way to quickly compare data.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/simple_bar_example"
    img-alt="Simple Bar Chart"
    title="Simple Bar Chart"
    caption="Provides a quick way to visualize data in single or stacked bars.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/horiz_bar_example"
    img-alt="Simple Horizontal Bar Chart"
    title="Simple Horizontal Bar Chart"
    caption="Provides a quick way to visualize data in single or stacked bars.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/simple_line_example"
    img-alt="Simple Line Chart"
    title="Simple Line Chart"
    caption="Used to visualize linear data in a simplified way for quick assessment.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/win_loss_example"
    img-alt="Simple Win-Loss Chart"
    title="Simple Win-Loss Chart"
    caption="Visualizes a series of positive & negative values as a bar chart.">
  </catalog-picture>
</div>


# Axis Layout
Effective treatment and layout of the axis in data visualizations makes it easier and faster to comprehend the data. Follow these guidelines as best practices when configuring data vis for your application.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/xaxis_do"
    img-alt="x axis correct"
    title="Do"
    caption="Do center label values on the axis line and et a vertical orientation of the axis label.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/xaxis_dont"
    img-alt="x axis incorrect"
    title="Don't"
    caption="Don't offset label values or set a horizontal orientation of axis label.">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/yaxis_do"
    img-alt="y axis correct"
    title="Do"
    caption="Do center label values on the axis line and et a vertical orientation of the axis label.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/yaxis_dont"
    img-alt="y axis incorrect"
    title="Don't"
    caption="Don't offset label values or set a horizontal orientation of axis label.">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/axis_lines_do"
    img-alt="axis lines correct"
    title="Do"
    caption="Do keep axis lines light to make the data stand out and increase scanability.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/axis_lines_dont"
    img-alt="axis lines incorrect"
    title="Don't"
    caption="Don't make axis lines dark or allow axis lines to float next to values.">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/radial_axis_do"
    img-alt="radial axis correct"
    title="Do"
    caption="Keep values centered on the axis line and in containers to allow for optimum readability. Labels should sit above or next to the axis line.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/radial_axis_dont"
    img-alt="radial axis incorrect"
    title="Don't"
    caption="Don't place values directly on the axis line without a container box or display labels inside the chart.">
  </catalog-picture>
</div>


# Color Treatment
The Predix UI visualization palette provides a diverse range of colors to construct visually impactful charts but more importantly, allows for distinction in the event of large, complex data groupings which are extremely common in the Industrial
space.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_color_do"
    img-alt="vis color correct"
    title="Do"
    caption="Use a variation of colors from different families to denote separation of series and provide better contrast.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_color_dont"
    img-alt="vis color incorrect"
    title="Don't"
    caption="Visually similar colors can make it difficult to parse the information in the visualization.">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_opacity_do"
    img-alt="vis opacity correct"
    title="Do"
    caption="Use opacity to easily show clusters of data.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_opacity_dont"
    img-alt="vis opacity incorrect"
    title="Don't"
    caption="Solid colors can obscure data rendered on the chart.">
  </catalog-picture>
</div>



# Chart Register
The chart register houses the list of mapped values and their associated colors. Depending on your use case it can be placed to the top or the right of a data visualization. It is not recommended that it is placed to the left or below the chart.

Tooltips can work with or instead of the register and display metadata about a particular item on the chart. It's important to keep tooltips succinct and as small as possible so they don't obscure the data they are augmenting.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_register_do"
    img-alt="vis register correct"
    title="Do"
    caption="Place register at the top or the right of the chart space.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_register_dont"
    img-alt="vis register incorrect"
    title="Don't"
    caption="Don't place the register to the left or below the chart space.">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_tooltip_do"
    img-alt="vis tooltip correct"
    title="Do"
    caption="Keep tags to a minimum height and consider splitting them into columns.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/data-vis/vis_tooltip_dont"
    img-alt="vis tooltip incorrect"
    title="Don't"
    caption="Don't insert a large number of tags into the tooltip. Consider using the register instead.">
  </catalog-picture>
</div>
