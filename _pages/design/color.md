---
title: Color
layout: default
moduleName: view-design-color
pathToRoot: ../../
---


The Predix Design System [color palette](#/css/visual/px-colors-design) is designed to adapt to a variety of IIoT experiences and to support user’s needs.

# Best Practices
### Consider the application's environment
The Predix Design System offers flexibility to allow you to design an application to best suit your use case. For low or no-light environments, consider a completely dark theme on one page to combat eye fatigue.



### Be consistent across pages in your app
Pick a theme and stick with it. Audit your pages and workflows to make sure the layout and color usage will remain expected and consistent.


### Use color with purpose
Highlight important data visualizations and high impact information and do it consistently across your app. Cascade backgrounds from dark to light to reinforce information hierarchy.


# Backgrounds
The Predix Design System uses slightly-saturated [grays](#/css/visual/px-colors-design) for backgrounds and text. Bold hues and highlight colors are intended to be used in [data visualizations](#/css/visual/px-colors-design), call-to-actions, and alerts.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_2-1_usage_do"
    img-alt="Background color correct"
    title="Do"
    caption="Use the identified grays from the Predix palette for material breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_2-2_usage_dont"
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
    img-src="../../../img/guidelines/design/color/color_3-1_cascade_do"
    img-alt="Hierarchy correct"
    title="Do"
    caption="Cascade color to indicate an information hierarchy, use minimal dramatic breaks.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_3-2_cascade_dont"
    img-alt="Hierarchy incorrect"
    title="Don't"
    caption="Avoid using excessive color banding to separate information.">
  </catalog-picture>
</div>

### Recommended Combinations
Applications can be created with a light theme, a mixed theme and a dark theme. Themes use three different grays each for the background containers. When applying background breaks, use colors within the same range of grays. $white is the default background for the light theme and $gray16 is the default background color for the light theme. Avoid using $black in the dark theme as a background color as it creates too high of a contrast.

<catalog-picture img-src="../../../img/guidelines/design/color/color_4_pages_schematic" img-alt="Color page schematic" caption="Recommended combinations for the light theme, mixed theme, and dark theme."></catalog-picture>

# Text
The Predix Design System uses a primary and secondary gray for each theme. The light theme primary gray is $gray15 and secondary gray is $gray10. The dark theme primary gray is $gray5 and secondary gray is $gray10. When combining themes, use the text color associated with the background color below to ensure proper contrast. Note that light and dark themes use a different primary gray to allow for contrast.

<catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_5-1_text_primary_light"
    img-alt="Text light color palette" caption="Light theme primary and secondary grays">
</catalog-picture>


<catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_5-2_text_primary_dark"
    img-alt="Text dark color palette" caption="Dark theme primary and secondary grays">
</catalog-picture>


# Action Component Colors
Actionable components are categorized into two groups, primary actions and select actions. Primary actions are indicated by with $primary-default (blue), and select actions are indicated by $select-default (green). An exception is made for actionable text on dark backgrounds which uses $d-actionable-default (light blue).

<catalog-picture img-src="../../../img/guidelines/design/color/color_6-1_action_components" img-alt="Action component colors"></catalog-picture>


# Primary Action Component Colors
Primary action colors indicate to the user that she can interact with a component. They are the same for dark and light themes with one exception. The exception is the use of the color $d-actionable-default on the dark theme for actionable text and icons.


<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_7-1_primary_light"
    img-alt="Light theme primary action colors"
    title="Light theme primary action colors">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_7-2_primary_dark"
    img-alt="Dark theme primary action colors"
    title="Dark theme primary action colors">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_7-5_actionable_dark"
    img-alt="Dark theme primary action colors for actionable text"
    title="EXCEPTION: Dark theme primary action colors for actionable text">
  </catalog-picture>
</div>

### Primary Action Component Examples
<catalog-picture img-src="../../../img/guidelines/design/color/color_10-1_components_primary_default" img-alt="Primary actionable components" caption="Primary action buttons, toggles, sliders, range sliders, progress bars, spinners, and forms"></catalog-picture>

<catalog-picture img-src="../../../img/guidelines/design/color/color_10-2_components_primary_actionable" img-alt="Primary actionable components" caption="EXCEPTION: For dark backgrounds use $d-actionable-default for actionable text, actionable icons, tertiary buttons, and bare dropdowns"></catalog-picture>



# Select Action Component Colors
Select action colors indicate to the user that she can choose options from that component. They are the same for dark and light themes.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_7-3_select_light"
    img-alt="Light theme select action colors"
    title="Light theme select action colors">
  </catalog-picture>
  </div>

  <div class="layout">
    <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_7-4_select_dark"
    img-alt="Dark theme select action colors"
    title="Dark theme select action colors">
  </catalog-picture>
</div>



### Select Action Component Examples
<catalog-picture img-src="../../../img/guidelines/design/color/color_10-3_components_select_default" img-alt="Selectable action components" caption="Select components: Breadcrumb dropdowns, dropdowns, date pickers, navigation, and tabs"></catalog-picture>



# Disabled Action Component Colors
Disabled colors indicate to the user that the component is not active. The states use the color $gray8 for the light theme and the color $gray10 for the dark theme to achieve the intended contrast on both light and dark themes. Note that the opacity was adjusted for button text and button outlines, and actionable text below in the graphic.


<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_8-2_disabled_gray_light"
    img-alt="Light theme disabled colors"
    title="Light theme disabled colors">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_8-3_disabled_gray_dark"
    img-alt="Dark theme disabled colors"
    title="Dark theme disabled colors">
  </catalog-picture>
</div>


### Disabled Button Examples
<catalog-picture img-src="../../../img/guidelines/design/color/color_8-4_disabled_examples" img-alt="Disabled examples" caption="Example disabled button on light and dark themes"></catalog-picture>



# Alerts
The Predix Design System also uses [color](#/css/visual/px-colors-design) to communicate meaning. Red is used as the most critical alert, while a neutral grey is the least crucial. To ensure accessibility, different shapes are used to communicate the levels of severity. Consider cultural associations when making color selections. Note that for Alert 4, blue was selected rather than green for accessibility reasons (red vs green color blindness).

<catalog-picture img-src="../../../img/guidelines/design/color/color_12_alert_symbols" img-alt="Color alert symbols" caption="Alerts have five stages of severity that are designated by both color and shape."></catalog-picture>



# Data Visualizations
Data visualizations use different color hues and intensity to distinguish information and to guide the attention of the user. Because large, complex data groupings are extremely common in the Industrial space, the Predix Design System provides a diverse range of [colors](#/css/visual/px-colors-design) to construct visually impactful charts.

The naming convention for colors indicates their use for light or dark themes. Light theme colors end in 4, 5 or 6. Dark theme colors end in 2, 3 or 4.


<catalog-picture img-src="../../../img/guidelines/design/color/color_11_dataviz_highlight" img-alt="Color data visualizations" caption="Use color with purpose to highlight the focal point of the data visualization."></catalog-picture>


# Accessibility
In their default states, the Predix Design System components pass the accessibility contrast test with an AAA or AA18 rating. The color palette allows for expanded choices should you have more stringent requirements or an extreme environment that calls for a unique design. For more information on accessibility visit https://developers.google.com/web/fundamentals/accessibility/

Check your contrast ratios to ensure they fall within accessibility standards with EightShapes' Contrast Grid. For example: [Light Theme](http://contrast-grid.eightshapes.com/?background-colors=FFFFFF%2C%20%24white%0D%0A%23EBEFF2%2C%20gray1%0D%0A%23E2E8ED%2C%20gray2&foreground-colors=%23677E8C%2C%20%24gray10%0D%0A%232C404C%2C%20%24gray15&es-color-form__tile-size=compact), [Dark Theme](http://contrast-grid.eightshapes.com/?background-colors=%2323343F%2C%20gray16%0D%0A%231B2A33%2C%20gray17%0D%0A%23121F26%2C%20gray18&foreground-colors=%23B6C3CC%2C%20gray5%0D%0A%23677E8C%2C%20gray10&es-color-form__tile-size=compact)

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_13-1_text_contrast_do"
    img-alt="Sufficient contrast"
    title="Do"
    caption="Sufficient contrast">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/color/color_13-2_text_contrast_dont"
    img-alt="Insufficient contrast"
    title="Don't"
    caption="Insufficient contrast">
  </catalog-picture>
</div>
