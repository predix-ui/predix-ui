---
title: Applying a Theme
moduleName: view-develop-migrate-theme
pathToRoot: ../../../
layout: default
---

This guide addresses how to apply a theme to your page.

# What changed
Before Cirrus, the Predix Design System components shipped with built in Predix Design System colors, fonts, etc as defaults. We've allowed end developers to apply custom themes for a while, but you didnt have to.

Now, as part of Cirrus, you MUST apply a theme. The components no longer ship with Predix defaults, so if you do not apply a theme, the components will have generic colors and fonts.

<div class="halves guidelines">
  <catalog-picture title="chart-unthemed" img-src="../../../img/guidelines/dev/migrate_theme/chart-unthemed" caption="Example of a chart unthemed">
  </catalog-picture>

  <catalog-picture title="chart-themed" img-src="../../../img/guidelines/dev/migrate_theme/chart-themed" caption="Example of a chart with theming applied">
  </catalog-picture>
</div>
<div class="halves guidelines">
  <catalog-picture title="slider-unthemed" img-src="../../../img/guidelines/dev/migrate_theme/slider-unthemed" caption="Example of slider unthemed">
  </catalog-picture>

  <catalog-picture title="slider-themed" img-src="../../../img/guidelines/dev/migrate_theme/slider-themed" caption="Example of slider with theming applied">
  </catalog-picture>
</div>


# What is a theme
Themes are a collection of CSS variables used to apply styles to Predix Design System components. Predix Design System components look at these CSS variables to apply a variety of styles, including colors, typefaces, and other styles. The API docs for each component include a list of available CSS variables. This approach is based on the methodology outlined by Polymer [here](https://www.polymer-project.org/1.0/docs/devguide/styling.html#xscope-styling)

# Available Themes

Predix Design System supplies two, prebuilt themes:
* [Light Theme](https://github.com/PredixDev/px-theme)
* [Dark Theme](https://github.com/PredixDev/px-theme)

You can view these two themes on this website. Simply flip the switch in the uppder right-hand corner.

You can also build your own themes by defining the CSS variables listed in each component.

# How to apply a theme
Applying a theme is easy. Simply include the theme in your project, import it, include the style, and voila, the styles are automatically applied to your components.

## Step 1
Include the theme in your project by including it in your `bower.json`:
``` js
"px-theme": "^3.0.0"
```
AND/OR
``` js
"px-dark-theme": "^2.0.0"
```

## Step 2
Import it onto your page:
```html
<link rel="import" href="../px-theme/px-theme-styles.html">
```
OR
```html
<link defer rel="import" href="../px-dark-theme/px-dark-theme-styles.html">
```

## Step 3
Include the styles on your page:
```html
<style include="px-theme-styles" is="custom-style"></style>
```
OR
```html
<style include="px-dark-theme-styles" is="custom-style"></style>
```

The styles will be available on your page and cascade down to subcomponents. So if you import the styles at the main page of your app, everything should get it. If you just import it to a subcomponent, then only that subcomponent and its children will pick up the styles.
