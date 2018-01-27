---
title: Configuring your axis
layout: default
moduleName: view-develop-vis-configure-axis
pathToRoot: ../../../
---

# Introduction

The px-vis charts rely upon d3.js for constructing an axis. While incredibly powerful, d3's axis can be difficult to configure. This guide will walk you through how to configure your chart axes.


<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis" img-alt="example axis" style="border:none;" caption="Example axis"></catalog-picture>


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
This object will set the `ticks` property on the underlying axis component to 5.

A full list of the configuration options available can be seen <a href="https://www.predix-ui.com/#/elements/vis/px-vis/px-vis-axis" target="_blank">here</a>.

# Axis configuration properties

## d3.tickFormat

`tickFormat` allows you to specify how d3 should format your number or date/time tick values. Depending on the type of axis, you will either specify a formatting string or a formatting function.

Refer to <a href="https://github.com/d3/d3-format" target="_blank">d3-format</a> and <a href="https://github.com/d3/d3-time-format" target="_blank">d3-time-format</a> for their docs.

### Some examples formating a number:

#### Default

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-number-default" img-alt="normal" style="border:none;" caption="Normal Axis"></catalog-picture>

#### Fixed Point

```js
let myConfig = {
  tickFormat: '.2f'
}
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-format-fixed" img-alt="fixed point" style="border:none;" caption="Showing fixed points"></catalog-picture>

#### Adding a prefix

```js
let myConfig = {
  tickFormat: '+.2f'
}
```
<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-format-prefix" img-alt="prefix" style="border:none;" caption="Adding a '+' prefix"></catalog-picture>


#### Scientific notation

```js
let myConfig = {
  tickFormat: '.1e'
}
```
<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-format-e" img-alt="e" style="border:none;" caption="Scientific notation"></catalog-picture>


### Some examples formating time:

Formating numbers is easy because you can just pass in a formating string. With time however, you have to pass in a formating function, which also opens up a lot more options. Here are some examples:

#### Default day range

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-days-default" img-alt="days" style="border:none;" caption="Normal day range axis"></catalog-picture>

#### Abbreviated day name and day of the month

```js
let myFormat = Px.d3.timeFormat("%a %d");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-days-ad" img-alt="days" style="border:none;" caption="Day range formated in local time with abbreviated day name and day of the month number"></catalog-picture>

You'll notice that we've provided a format quite similar to the default format. But by using the `timeFormat` function, we've corerced it into local time. If you wish to maintain UTC, then use `utcFormat` instead. Also note, that while you can coerice the values into local time (or to UTC if you are in local time), it is better to address this by changing the `xAxisType` property on the chart. See below in the FAQ

```js
// d3 format function with the formatting string
let myFormat = Px.d3.utcFormat("%a %d");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-days-ad-utc" img-alt="days" style="border:none;" caption="Day range formated in local time with abreviated day name and day of the month number"></catalog-picture>


#### d/mm/yyy

```js
let myFormat = Px.d3.utcFormat("%x");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-days-x" img-alt="days" style="border:none;" caption="Day range formated as d/m/yyyy"></catalog-picture>


#### Full day names

```js
let myFormat = Px.d3.utcFormat("%A");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-days-A" img-alt="days" style="border:none;" caption="Day range formated with full day names"></catalog-picture>


#### Default hour range

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-hour-default" img-alt="hours" style="border:none;" caption="Normal hour range axis"></catalog-picture>


#### Hour: Minute AM/PM

```js
let myFormat = Px.d3.utcFormat("%I:%M %p");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-hour-IMp" img-alt="hour" style="border:none;" caption="Hour range formated with hour: minute and am/pm"></catalog-picture>


#### Local time with timezone

```js
let myFormat = Px.d3.timeFormat("%I:%M %Z");

let myConfig = {
  tickFormat: myFormat
};
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-hour-IMZ" img-alt="hour" style="border:none;" caption="Hour range formated into local time timezone"></catalog-picture>

One thing to note when playing with the format, by default, d3 will change the format depending on your zoom level to a more appropriate value. Once you specify a format, that feature is disabled and you will have to manually update the format with each zoom. Or clear the provided format by providing `null`.

```js
let myConfig = {
  tickFormat: null
};
```


## d3.ticks

`ticks` is an interesting/confusing one. `ticks` can take two type of data, a `Number` or an `Object`.

If you give it a number, then it will try to display approximately that number of ticks. The reason is that it will still try to create a nice, logical axis, so even though you say give me *n* ticks, it will give you a number of ticks that work for your data domain.

If you give it an Object, then there are two optional keys you can assign:
* `interval`: Same as just assigning ticks a Number
* `format`: Same as d3.tickFormat

#### Default

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis" img-alt="normal" style="border:none;" caption="Normal Axis"></catalog-picture>

#### Ticks as a number

```js
let myConfig = {
  ticks: 5
}
```

Equivalent to

```js
let myConfig = {
  ticks: {
    interval: 5
  }
}
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-ticks-5" img-alt="ticks" style="border:none;" caption="Ticks set to 5. Note that it is actually showing 6 ticks"></catalog-picture>

#### Ticks as an object with interval and format

```js
let myConfig = {
  ticks: {
    interval: 5,
    format: '.2f'
  }
}
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-ticks-obj" img-alt="ticks" style="border:none;" caption="Ticks interval and formatter set"></catalog-picture>


## d3.tickValues

`tickValues` allows you to specify absolutely what the tick values for your axis should be. It is an array of values. Example:

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis" img-alt="normal" style="border:none;" caption="Normal Axis"></catalog-picture>

```js
let myConfig = {
  tickValues: [0,4,5,7.7,10]
}
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-tickvalues" img-alt="tick values" style="border:none;" caption="Axis with tick values"></catalog-picture>

Note how it still rounds the value of 7.7 by default. To show the decimal point, you'll still have to provide a formatter to show the decimal value.


# FAQ

## I want Local Time, not UTC

**Q:** Px-vis-timeseries is displaying UTC time. I want to display local time

```html
<px-vis-timeseries></px-vis-timeseries>
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-scale-time" img-alt="time scale" style="border:none;" caption="Axis type set to default 'time'"></catalog-picture>

**A:** Change the chart property xAxisType to `timeLocal` instead of the default `time`.


```html
<px-vis-timeseries id="myChart" x-axis-type="timeLocal"></px-vis-timeseries>
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-scale-timeLocal" img-alt="time scale" style="border:none;" caption="Axis type set 'timeLocal'"></catalog-picture>

Additionally, you'll have to configure the register/tooltip with the `timezone` property to get the axis and register/tooltip in sync. Note that the register/tooltip use moment.js, so refer to moment.js docs for appropriate notation. Example:

```js
myChart.set('registerConfig', { timezone:  "America/Los_Angeles" });
```

---

## I want X timezone, not Local or UTC

**Q:** I want to display a specific timezone on px-vis-timeseries. Not UTC time or the computer's local time.

**A:** Use `tickFormat` and pass in a custom formatting function.

Unfortunately there is no way to do this "natively" in d3. The easiest is to utilize moment and moment-timezone or your time formatter of choice. Wrap it in a callback function and format your tick like so:

```js

let myFormat = function(d) {
  return Px.moment(d).tz("America/Los_Angeles").format("HH:ss");
}
myChart.set('xAxisConfig', { tickFormat: myFormat });
```

Additionally, you'll have to configure the register/tooltip with the `timezone` property to get the axis and register/tooltip in sync. Example:

```js
myChart.set('registerConfig', { timezone: "America/Los_Angeles" });
```

Refer to the <a href="https://momentjs.com" target="_blank">MomentJs docs</a> for proper timezone strings and formatting strings.

---

## I want dates, not a Unix timestamp

**Q:** I am using px-vis-xy-chart and want the x-axis to display dates or times instead of a Unix timestamp.

```html
<px-vis-xy-chart></px-vis-xy-chart>
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-scale-linear" img-alt="linear time scale" style="border:none;" caption="Axis type set to linear and it should be time"></catalog-picture>

**A:** Use px-vis-timeseries instead. They are very similar charts, but timeseries has been optimized for timeseries data on the x-axis. It will display dates/times by default.

```html
<px-vis-timeseries></px-vis-timeseries>
```

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-scale-time" img-alt="time scale" style="border:none;" caption="Axis type set properly to time"></catalog-picture>

---

## My tick labels are overlapping

**Q:** My chart is narrow and my tick values are overlapping
<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-overlap" img-alt="overlapping" style="border:none;" caption="My ticks are overlapping"></catalog-picture>

**A:** See above on how to change the number of ticks and their format to take up less space. You can also change the tick placement, rotate them, change their type size, etc. Consult with your designers about how best to modify your tick values to conserve space.

<catalog-picture img-src="../../img/guidelines/dev/vis/configure-axis/axis-overlap-fixed" img-alt="overlapping fixed" style="border:none;" caption="Fixed by changing the format"></catalog-picture>

---

## My tick labels or title are being cut off

**Q:** My tick labels and/or title are being cut off

<style>
  .short {
    --px-catalog-picture-max-height: 350px;
    margin-bottom: 50px;
  }
</style>
<catalog-picture class="short" img-src="../../img/guidelines/dev/vis/configure-axis/axis-cutoff" img-alt="cutoff" style="border:none;" caption="Title cut off"></catalog-picture>


**A:** The chart `margin` property exists to provide space around the chart for the axis ticks and title. You will need to increase this `margin`.

Alternatively, depending on your ticks, you may want to change the tickFormat to a format that takes up less/more consistent space, such as specifying a fixed number of decimals or using scientific notation.

```html
<px-vis-timeseries margin='{ "left": 75 }'></px-vis-timeseries>

```

<catalog-picture class="short" img-src="../../img/guidelines/dev/vis/configure-axis/axis-cutoff-fixed" img-alt="cutoff fixed" style="border:none;" caption="Cut off title fixed"></catalog-picture>

---

## My tick labels or title are still being cut off

**Q:** My tick labels and/or title are still being cut off after I added a margin.

**A:** Add more to the margin. It is a pixel value so each 1 is a small amount. Plus some charts have some default min margin to begin with.

---

## I want to change my Ordinal Axis

**Q:** I want to change the values of an Ordinal scale on XY-chart

**A:** You cannot customize just the ticks. The values are displayed as you provide them in the seriesConfig or chartExtents, so you would have to change these values.


# D3 Documentation
To read d3's documentation, please see:

### Scale:
<a href="https://github.com/d3/d3-scale" target="_blank">https://github.com/d3/d3-scale</a>

### Axis:
<a href="https://github.com/d3/d3-axis" target="_blank">https://github.com/d3/d3-axis</a>

### Formatting:

**Number:** <a href="https://github.com/d3/d3-format" target="_blank">https://github.com/d3/d3-format</a>

**Date/Time:** <a href="https://github.com/d3/d3-time-format" target="_blank">https://github.com/d3/d3-time-format</a>
