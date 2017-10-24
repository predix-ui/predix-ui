---
title: Migrating to use themes
moduleName: view-develop-migrate-theme
pathToRoot: ../../../
layout: default
---

This guide addresses how the Predix Design System components require a theme after Cirrus.

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

# Read the full guide

* Read the ["Theme component styles and colors" developer guide](https://www.predix-ui.com/#/develop/theming) for a step-by-step theming tutorial
