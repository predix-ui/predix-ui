---
title: Page Layout
layout: default
moduleName: view-design-page-layout
pathToRoot: ../../
---

# Best Practices
### Efficient use of real estate
Strive for an edge-to-edge layout that takes advantage of screen real estate.

### Adhere to a layout grid
Choose a consistent layout grid to use across your product's pages. Consider the horizontal and vertical alignment of page components and content to aid in predictability and scan-ability.

### Use negative space to cluster information
Predix app pages are clean and easy to scan. Use negative space or light weight rules to cluster information. Px-layout has padding built into it's cells for this purpose.

### Establish a family
Structural consistency is critical in creating efficiency in a workflow. Choose layouts that are predicable and expected when designing your product.



# Basic Structure
The basic components of a page include an optional branding area, navigation, cards to group similar content, and an optional footer. Navigation may live on the left side or the top of the page structure.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/horizontal_layout"
    img-alt="horizontal layout"
    title="Page assembly with horizontal navigation">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/vertical_layout"
    img-alt="vertical layout"
    title="Page assembly with vertical navigation">
  </catalog-picture>
</div>


# Base Screen Sizes
|         |          |
| ------- | -------- |
| Desktop | 1280x960 |
| Tablet  | 1024x768 |
| Mobile  | 320x568  |

# Layout Grid
The layout grid is a 12 column, 15px grid supporting horizontal and vertical navigation as well as the inbox layout. Grids are available in the Design Starter Kit.
<catalog-picture img-src="../../../img/guidelines/design/page-layout/layout_grid" img-alt="layout grid"></catalog-picture>

There are several CSS modules in the design system that can be used to create a page layout:

* [px-layout-design](#/css/px-layout-design): Defines the 'grid' for Predix UI. Layout items can be autosized or given a specific width, and layouts reflow responsively on smaller viewports.

* [px-spacing](#/css/px-spacing-design): A collection of helper classes for spacing such as margin and padding.


* [px-flexbox-design](#/css/px-flexbox-design): Creates layout classes to give elements sizes and dynamically put elements in the right place. The flexbox module is a wrapper around all of CSS flexbox's non-unit-based properties.

* [px-widths-responsive-design](#/css/px-widths-design): Provides breakpoint-based classes for widths on elements.


# Grid Variations
There are five variations of the grid to supporting a one to six column layout, allowing a designer to choose a layout that matches the information to display.

### Six Column Grid
For information-dense screens and workflows such as cases, or asset records.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/six_column_grid"
    img-alt="six column grid">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/six_column_example"
    img-alt="6 column example">
  </catalog-picture>
</div>


### Three & Four Column Grids
Commonly used for dashboards or layouts with large widgets displaying high level information.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/three_column_grid"
    img-alt="three column grid">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/three_column_example"
    img-alt="three column example">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/four_column_grid"
    img-alt="four column grid">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/four_column_example"
    img-alt="four column example">
  </catalog-picture>
</div>


### Single Column
Commonly used for dashboards or layouts with large widgets displaying high level information.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/single_column_grid"
    img-alt="single column grid">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/single_column_example"
    img-alt="single column example">
  </catalog-picture>
</div>

### Combine column layouts to create variations that best fit your data:
<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/combined_grid"
    img-alt="combined grid">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/multi_column_example"
    img-alt="multi column example">
  </catalog-picture>
</div>


# Cards
Cards are used to group similar information into logical groups to make it easier for people to consume. They consist of a header area and content area, with spacing in between. The header can optionally contain a descriptive icon in the top left corner and/or a chevron button in the top right corner for configuration options or other menu items. The [px-card](#/components/px-card) component provides this functionality.

Information in cards can be clustered based on the grid layout of your choice.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/card_1up"
    img-alt="1 up card">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/card_2up"
    img-alt="2 up card">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/card_3up"
    img-alt="3 up card">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/card_example"
    img-alt="card example">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/page-layout/card_example_redline"
    img-alt="card example redline">
  </catalog-picture>
</div>
