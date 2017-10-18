---
title: Mobile
layout: default
moduleName: view-design-mobile
pathToRoot: ../../
---

The Predix Design System contains multiple CSS modules to facilitate page layout. When building mobile applications, consider using [px-widths-responsive-design](#/css/px-widths-responsive-design) to add mobile breakpoints to your app. Most Predix UI components are flexible and support multiple screen sizes and when combined with px-responsive-design, you'll be able to tailor your app for desktop, tablet or mobile experiences.


# Navigation
The [px-appnav](#/components/px-app-nav/) and [px-context-browser](#/components/px-context-browser/) components was built with mobile breakpoints in mind so it will adapt gracefully from desktop
to mobile. It is recommended to use either the drop down or vertical configurations for mobile devices and phones.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/mobile/mobile_nav_dropdown"
    img-alt="mobile nav dropdown">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/mobile/mobile_nav_hamburger"
    img-alt="mobile nav hamburger">
  </catalog-picture>
</div>

# Page Layout
Generally speaking, most desktop layouts will translate relatively well to tablets. On a phone or a small handheld device there's much less screen real estate. In that case, Predix mobile applications should utilize a single column card layout with
stacked cards.

To minimize page length and scrolling consider a left to right horizontal gesture to switch between cards. This interaction is especially valuable for dashboards where on the desktop there's typically two or three charts per card.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/mobile/mobile_card"
    img-alt="mobile card">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/mobile/mobile_swiping"
    img-alt="mobile swiping">
  </catalog-picture>
</div>

# Data Tables
While many desktop apps rely on data tables to display grids of information, data tables don't translate very well to mobile phones. Instead, consider using [px-table-view](#/components/px-table-view/) which provides a more mobile-friendly way of viewing data.

<catalog-picture img-src="../../../img/guidelines/design/mobile/mobile_data_table" img-alt="mobile data table"></catalog-picture>
