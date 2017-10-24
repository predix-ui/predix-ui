---
title: Typography
layout: default
moduleName: view-design-typography
pathToRoot: ../../
---

# Best Practices
### Exclusively use GE Inspira Sans

Inspira Sans is core part of the GE and Predix brand and was developed with digital use cases in mind. Offered in several weights and styles, it is the sole typeface of a Predix app.

### Create a typographic hierarchy
The Predix Design System has recommended sizes for page elements designed to make it easy to create an easy to scan information hierarchy. Utilize these sizes. Consider how your layout will be consumed and build a typographic hierarchy around it.

### Be selective with the use of bold
The Predix visual language is designed to be lightweight and easy to scan. Overusing bold can make an interface heavy and difficult to identify important information. Use Inspira Sans Bold in limited situations such as calling out the user's current
location in a hierarchy or highlighting their selected state.

### Be consistent
Consistency is a principle of the design system and it applies to type. Your application should have a consistent and expected usage of typography across all workflows.


# Type Family
GE Inspira Sans is the only typeface used in Predix applications. For design purposes, it's included in multiple formats in the [Design Starter Kit](#/about/start-designing). Additionally, it's included with and consumed by Predix UI Components.

While it is available in regular, bold, italic and bold italic forms, we discourage the use of GE Inspira Sans Bold and Bold Italic on Web and UI applications.

# Size & Usage
Suggested type sizes for applications are as follows:

| Element | Usage | Size & Appearance |
| ------- | ----- | ----------------- |
Page Headers & Titles | <span class="heading--page">Page Header<span> | 30px
Section header | <span class="heading--section">Section Header<span> | 20px Uppercase
| Sub-section header | <span class="heading--subsection">Subsection Header<span> | 15px Uppercase
| Body Copy | <span>Lorem ipsum dolor sit amet<span> | 15px, 20 Line Spacing
| Labels | <span class="label">label<span> | 12px Uppercase

</br>
In total, there are seven font sizZes available ranging from 12px to 75px. Font sizes above 30px are reserved for use on dashboard widgets.
<catalog-picture img-src="../../../img/guidelines/design/typography/type_sizes" img-alt="drop down nav"></catalog-picture>


# Hierarchy

It's important to maintain an consistent typographic hierarchy in your application. Mixing font sizes and styling without considering which information is most important can impede efficiency and purposefulness.
<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/typography/type_hierarchy_do"
    img-alt="type hierarchy correct"
    title="Do"
    caption="Cascading type sizes based on importance of information can help indicate an information hierarchy.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/typography/type_hierarchy_dont"
    img-alt="type hierarchy incorrect"
    title="Don't"
    caption="Not utilizing a hierarchy or using type sizes in a random fashion makes it harder for users to understand what's most important.">
  </catalog-picture>
</div>

# Weight
While it is available in both normal and bold weights, it is advised to use bold sparingly. For example, bold can be used to indicate the current selected state on a tab or in the context browser. It should not be used in displaying headers, titles
and metadata.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/typography/bold_do"
    img-alt="bold correct"
    title="Do"
    caption="Use bold sparingly. It can be used for emphasis of selected items such as to indicate the location in a hierarchy.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../../img/guidelines/design/typography/bold_dont"
    img-alt="bold incorrect"
    title="Don't"
    caption="Over applying bold can result in an app that is visually heavy and hard to scan.">
  </catalog-picture>
</div>
