---
title: Datetime Release Notes
moduleName: view-develop-datetime-changes
pathToRoot: ../../../
layout: default
---

### The datetime components
* [px-calendar-picker](#/components/px-calendar-picker) v2
* [px-datetime-field](#/components/px-datetime-field) v2
* [px-datetime-picker](#/components/px-datetime-picker) v2
* [px-datetime-range-field](#/components/px-datetime-range-field) v2
* [px-datetime-range-panel](#/components/px-datetime-range-panel) v2
* [px-rangepicker](#/components/px-rangepicker) v3
* px-datetime-common v2 - This repo holds the core logic for the other datetime components.

## General changes to all of the datetime components
* Polymer 1.x/2.x hybrid support.
* Allowed to have an blank state.
* For single date components, the property `dateTime` has been removed. The `momentObj` is the new source of truth. To set an initial value, pass in a moment object to the `momentObj` property. Listen to the `moment-obj-changed` event to know when the moment object has been updated.
* For range components, the property `range` has been removed. The `fromMoment` and `toMoment` are the new sources of truth. To set an initial value, pass in moment objects to the `fromMoment` and `toMoment` properties. Listen to the `px-datetime-range-submitted` event to know when either one of the moment objects has been updated. Another option is to listen to `from-moment-changed` and `to-moment-changed` to know when `fromMoment` and `toMoment` update separately.
* Updated validation to catch `blockFutureDates`/`blockPastDates`/`minDate`/`maxDate` validation errors to the millisecond.
* Renamed properties `min` and `max` to `minDate` and `maxDate`.

# Individual Components
## px-calendar-picker
* Removed the `singleSelectedDate` property.

## px-datetime-field
* Added the `required` property. If this is set, the component will be invalid when left empty.
* Added the `isFieldValid` property. Reflects if the input field is valid.
* Replaced `showValidationMessage` with `hideValidationMessage`. `hideValidationMessage` is `false` by default.
* Renamed `preventNotificationOnChange` to `preventApply`.

## px-datetime-range-field
* Added the `required` property. If this is set, the component will be invalid if left empty.
* Removed `preventNotificationOnChange`.

## px-datetime-range-panel
* Updated the component's position from `absolute` to `static`.

## px-rangepicker
* Exposed the `hideIcon` property.
* The panel now dynamically aligns to the rangepicker's position on the screen.
* Updated `_opened` to `opened`.
