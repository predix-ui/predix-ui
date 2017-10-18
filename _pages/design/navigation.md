---
title: Navigation
layout: default
moduleName: view-design-navigation
pathToRoot: ../../
---

When choosing a navigation construct, consider the key use cases and workflows of your application as well as the display size and devices it will be delivered on.  An effective navigation system is critical in making your application purposeful and efficient. The Predix Design System includes several components that are designed to work together as main navigation.
[Px-app-nav](#/components/px-app-nav) is the core navigation component and offers several configurations to suit a variety of use cases. It can be configured horizontally, vertically or as a dropdown menu. [Px-breadcrumbs](#/components/px-breadcrumbs) provides the ability to show the user their path through your application and easily navigate up to a parent level. [Px-context-browser](#/components/px-context-browser) works in conjunction with the breadcrumb component to allow a user to set the context of their app. Finally, [px-branding-bar](#/components/px-branding-bar) provides a space to apply a custom branding element such as an application name, logo or specific color.

The [px-app-header](#/components/px-app-helpers/px-app-header) component illustrates how some of these components can work together in an assembly.

# Best Practices

### Support workflows, not features
The top level navigation should support core workflows and be meaningful and easy to digest for the end user. Use the content as navigation when possible to enforce efficiency in workflows.

### Keep the hierarchy shallow
Keep the hierarchy as shallow as possible. This improves way-finding within the application and ensures the navigation structure will scale across form factors with ease.

### Use short and scannable names
Choose names that are easily consumable and align with the workflow to be performed.

### Make the iconography count
Use meaningful and identifiable iconography to augment naming and supply a visual anchor. Avoid repeating or reusing icons in main navigation.


# Global Navigation Types
### Horizontal Navigation
For applications where users will likely switch between main navigation items frequently, the horizontal configuration is a good option. The navigation is persistent and designed for 5-8 top level items, although it can support more. Icons can be
used as visual indicators, but they are optional.
<catalog-picture img-src="../../../img/guidelines/design/navigation/horizontal_nav" img-alt="horizontal nav"></catalog-picture>

### Vertical Navigation
In cases where there's a substantial number of main navigation links (8+), using vertical navigation or top navigation is up to a designer's discretion. The component can be left open or closed based on preference, so it represents a fairly flexible
navigation option.
<catalog-picture img-src="../../../img/guidelines/design/navigation/vertical_nav" img-alt="vertical nav"></catalog-picture>

### Dropdown
Recommended for applications that have five or less sub-sections where the use cases don't call for frequently switching between navigation items.
<catalog-picture img-src="../../../img/guidelines/design/navigation/drop_down_nav" img-alt="drop down nav"></catalog-picture>

# Sub-navigation
Core navigation components support one level of sub navigation. If your information architecture requires an additional level, you can combine navigation components to address this need.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/subnavigation_1"
    img-alt="subnavigation 1"
    title="Left nav informs top nav"
    caption="When combining components, the left navigation can inform the choices on the top navigation component.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/subnavigation_2"
    img-alt="subnavigation 2"
    title="Top nav informs the left nav"
    caption="The top navigation can also inform a vertical column containing sub-navigation links.">
  </catalog-picture>
</div>


# Content Driven Navigation
If your app has fewer than three top level items, rely on the content for navigation. Consider the persona's use case and the workflow between the items and how to integrate them. If there is no workflow between the top level items, consider separating
them into different applications.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/content-nav-do"
    img-alt="content nav correct"
    title="Do"
    caption="Use content to navigate between work flows.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/content-nav-dont"
    img-alt="content nav incorrect"
    title="Don't"
    caption="Avoid creating a navigation scheme with only two options.">
  </catalog-picture>
</div>


# Wayfinding
Many Predix applications are used to display information about a specific machine or a group of machines. Being clear about where a user is in a hierarchy or what machine they are viewing is extremely important.
### Breadcrumbs
Breadcrumbs indicate the path a user has taken to a particular page or object. They are used in conjunction with global navigation and are typically displayed below the main navigation and above the page title. The component for breadcrumbs is <a href="/#/components/px-breadcrumbs/" target="_top">px-breadcrumbs</a>.

<catalog-picture img-src="../../../img/guidelines/design/navigation/breadcrumbs" img-alt="breadcrumbs"></catalog-picture>


### Context Browser
The context browser works in conjunction with breadcrumbs. It may live below, above or with the main navigation depending on your application's information architecture. In cases where setting the context is the main function of the application, it
can even serve as the main navigation. The component for breadcrumbs is <a href="/#/components/px-context-browser/" target="_top">px-context-browser</a>.

<catalog-picture img-src="../../../img/guidelines/design/navigation/context-browser" img-alt="context browser"></catalog-picture>


# In-Page Navigation
### Tabs
Tabs can be used as a page element to switch between different types of information that apply to the same context. It's recommended to keep tabs to a maximum number of 6, avoid nested tabs and keep labels concise at one or two words. The [px-tabs](#/components/px-tabs) component provides this functionality.

Tabs are typically placed below the page header above the main content, but can also be found as part of the main content area or within components. Only one tab should be active at one time and should cluster like-content or tasks to avoid switching frequently between tabs.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/tabs-do"
    img-alt="tabs correct"
    title="Do"
    caption="Use a concise number of tabs to allow access to info about a singular topic">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/tabs-dont"
    img-alt="tabs incorrect"
    title="Don't"
    caption="Avoid using tabs as a main navigation construct.">
  </catalog-picture>
</div>


### Modals
Use modals for lightweight tasks and confirmations such as confirming a save or a deletion. Avoid using modals for large tasks that require referencing information on the origin page.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/modal-do"
    img-alt="modal correct"
    title="Do"
    caption="Use modals for lightweight tasks and confirmations.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/navigation/modal-dont"
    img-alt="modal incorrect"
    title="Don't"
    caption="Avoid overloading modals with heavyweight tasks.">
  </catalog-picture>
</div>
