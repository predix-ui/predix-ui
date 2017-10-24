---
title: Color
layout: default
moduleName: view-design-color
pathToRoot: ../../
---


The Predix Design System [color palette](#/css/view-design-color) is designed to adapt to a variety of IIoT experiences and to support user’s needs.

# Best Practices
### Consider the application's environment
The Predix Design System offers the flexibility to allow you to design an application to best suit your use case. A light theme, a dark theme or a mixed theme are available to use. For low or no-light environments, use a completely dark theme on one page to combat eye fatigue.

The Predix Design System offers flexibility to allow you to design an application to best suit your use case. For low or no-light environments, consider a completely dark theme on one page to combat eye fatigue.



### Be consistent across pages in your app
Pick a theme and stick with it. Audit your pages and workflows to make sure the layout and color usage will remain expected and consistent.


### Use color with purpose
Highlight important data visualizations and high impact information and do it consistently across your app. Cascade backgrounds from dark to light to reinforce information hierarchy.


# Background Color
The Predix Design System uses slightly-saturated grays for backgrounds and static text. Bold hues and highlight colors are intended to be used in [data visualizations](#/css/view-design-color), call-to-actions, and alerts.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_usage_do"
    img-alt="Background color correct"
    title="Do"
    caption="Use the identified [grays](#/css/view-design-color) from the Predix palette for material breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_usage_dont"
    img-alt="Background color incorrect"
    title="Don't"
    caption="Don't use data visualization or alert colors as backgrounds.">
  </catalog-picture>
</div>

### Hierarchy
Hierarchy can help to organize content according to relative importance. Leverage color to reinforce the emphasis of some content relative to other content.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_cascade_do"
    img-alt="Hierarchy correct"
    title="Do"
    caption="Cascade color to indicate an information hierarchy, use minimal dramatic breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_cascade_dont"
    img-alt="Hierarchy incorrect"
    title="Don't"
    caption="Avoid using excessive color banding to separate information.">
  </catalog-picture>
</div>

### Recommended Combinations
Applications can be created with a light theme, a mixed theme and a dark theme. Themes use three different grays each for the background containers. When applying background breaks, use colors within the same range of grays. $white is the default background for the light theme and $gray16 is the default background color for the light theme. Avoid using $black in the dark theme as a background color as it creates too high of a contrast.

<catalog-picture img-src="../../../img/guidelines/color_pages_schematic" img-alt="Color page schematic" caption="Recommended combinations for the light theme, mixed theme, and dark theme."></catalog-picture>

# Static Text
The Predix Design System uses a primary and secondary gray for each theme. The light theme primary gray is $gray15 and secondary gray is $gray10. The dark theme primary gray is $gray5 and secondary gray is $gray10. When combining themes, use the text color associated with the background color below to ensure proper contrast.

<catalog-picture img-src="../../../img/guidelines/color_text_contrast_do" img-alt="Color text on grays" caption="Note that light and dark themes use a different primary gray to allow for contrast."></catalog-picture>

# Actionable and Selectable Components
Actionable components allow the user to interact or modify the value of a component. Selectable components provide predetermined options that the user can choose from. Both types of components have five states: default, hover, pressed, light (focused), and disabled.


### Actionable Component Color Palette
Actionable components, e.g., primary buttons, toggles, sliders, range sliders, and progress bars, use the color $primary-default on both light and dark themes. The exception is actionable text which uses the color $d-actionable-default on the dark theme.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_actionable_light"
    img-alt="Actionable light color palette"
    title="Actionable light color palette">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_actionable_dark"
    img-alt="Actionable dark color palette"
    title="Actionable dark color palette">
  </catalog-picture>
</div>

*add example*

### Selectable Component Color Palette
Selectable components, e.g., dropdowns, date pickers, navigation, and tabs, use the color $select-default for both light and dark themes.


<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_selectable_light"
    img-alt="Selectable light color palette"
    title="Selectable light color palette">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_selectable_dark"
    img-alt="Selectable dark color palette"
    title="Selectable dark color palette (same as light)">
  </catalog-picture>
</div>

*add example*

### Disabled Component Color Palettes
Disabled states use the color $gray8 for the light theme and the color $gray10 for the dark theme to achieve the intended contrast on light and dark themes.. Note the opacity adjustments made for button text, button outline, and actionable text below in the graphic.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_disabled_gray_light"
    img-alt="Disabled gray light"
    title="Disabled gray light color palette">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_disabled_gray_dark"
    img-alt="Disabled gray dark"
    title="Disabled gray dark color palette">
  </catalog-picture>
</div>

*add example*


### Actionable Component Examples
<catalog-picture img-src="../../../img/guidelines/color_components_primary_default" img-alt="Actionable components" caption="Primary buttons, toggles, sliders, range sliders, progress bars, spinners, and forms"></catalog-picture>

<catalog-picture img-src="../../../img/guidelines/color_components_primary_actionable" img-alt="Actionable components" caption="Actionable text, actionable icons, tertiary buttons, and bare dropdowns"></catalog-picture>

### Selectable Component Examples
<catalog-picture img-src="../../../img/guidelines/color_components_select_default" img-alt="Selectable components" caption="Breadcrumb dropdowns, dropdowns, date picker, navigation, and tabs"></catalog-picture>



# Data Visualizations
Data visualizations use different color hues and intensity to distinguish information and to guide the attention of the user. Because large, complex data groupings are extremely common in the Industrial space, the Predix Design System provides a diverse range of [colors](#/css/view-design-color) to construct visually impactful charts.

<catalog-picture img-src="../../../img/guidelines/color_dataviz_highlight" img-alt="Color data visualizations" caption="Use color with purpose to highlight the focal point of the data visualization."></catalog-picture>

# Alerts
The Predix Design System also uses color to communicate meaning. Red is used as the most critical alert, while a neutral grey is the least crucial. In addition to color and to ensure accessibility, different shapes are used to communicate the levels of severity. Consider cultural associations when making color selections. Note that for Alert 4, blue was selected rather than green for accessibility reasons.

<catalog-picture img-src="../../../img/guidelines/color_alert_symbols" img-alt="Color alert symbols" caption="Alerts have five stages of severity that are designated by both color and shape."></catalog-picture>

# Accessibility
In their default states, the Predix Design System components pass the accessibility contrast test with an AAA or AA18 rating. The color palette allows for expanded choices should you have more stringent requirements or an extreme environment that calls for a unique design. For more information on accessibility visit https://developers.google.com/web/fundamentals/accessibility/

Check your contrast ratios to ensure they fall within accessibility standards with EightShapes' Contrast Grid. For example: [Light Theme](#http://contrast-grid.eightshapes.com/?background-colors=FFFFFF%2C%20%24white%0D%0A%23EBEFF2%2C%20gray1%0D%0A%23E2E8ED%2C%20gray2&foreground-colors=%23677E8C%2C%20%24gray10%0D%0A%232C404C%2C%20%24gray15&es-color-form__tile-size=compact), [Dark Theme](#http://contrast-grid.eightshapes.com/?background-colors=%2323343F%2C%20gray16%0D%0A%231B2A33%2C%20gray17%0D%0A%23121F26%2C%20gray18&foreground-colors=%23B6C3CC%2C%20gray5%0D%0A%23677E8C%2C%20gray10&es-color-form__tile-size=compact)

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_text_contrast_do"
    img-alt="Sufficient contrast"
    title="Do"
    caption="Sufficient contrast">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/color_text_contrast_dont"
    img-alt="Insufficient contrast"
    title="Don't"
    caption="Insufficient contrast">
  </catalog-picture>
</div>
