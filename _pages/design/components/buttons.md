---
title: Buttons
layout: default
moduleName: view-design-buttons
pathToRoot: ../../../
---

Buttons allow users to take actions in an interface.
<catalog-picture img-src="../../img/guidelines/design/components/buttons/buttons-hero" img-alt="Px Buttons" caption="Types of Px buttons"></catalog-picture>

# Buttons
Buttons can be used in forms, modal windows, tables, cards, and more to indicate actions to the user.
When text is included in a button, use action verbs that clearly indicate to the user what the result will be when a button is pressed.

## Sizes
Buttons are available in four sizes. For the most part, the regular size button is the default and recommended size for desktop and mobile applications.
Depending on the context of use, your application may require larger click targets for users (like applications that are meant to be used with protective gloves on, or large operator displays).

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-sizes" img-alt="Px Button Sizes" caption="Px Button Sizes"></catalog-picture>

## Types and Behavior
Cirrus does not include buttons in alternative colors (red, green, etc). This is intentional, to avoid confusion between buttons and alerts or labels.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/light-button-states" img-alt="Px Light Buttons States and Spec" caption="Px Light Buttons States and Spec"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/components/buttons/dark-button-states" img-alt="Px Dark Buttons States and Spec" caption="Px Dark Buttons States and Spec"></catalog-picture>

## Usage
| Button Type | Usage |
| -----| -----|
| Call to Action (CTA) | Create emphasis for the main call to action on the page or component.
| Primary | For a call to action within a button or actions set. Use when a CTA already exists on the page.
| Secondary | Default button style, used for secondary actions on the page or component.
| Tertiary | When giving the user multiple actions, but may want to call attention or visually separate an action. Use sparingly.
| Disabled | When the action cannot be performed until a condition or action is completed on the page


For English and other left-to-right language applications, the secondary buttons should come before the Call to Action (CTA), which should be the last element at the bottom right corner of a component. In this way, the CTA Button is the last thing a user’s eye lands on.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/basic-button-placement-modal" img-alt="Button placement order in component" caption="Button placement order in component"></catalog-picture>

Your page should only have one call to action button, but can have various primary and secondary buttons. This is to clearly indicate the path forward to the user. When keyboard shortcuts are used, hitting “Enter” on the keyboard has the same effect as clicking the Call to Action Button.

Multiple primary actions can exist within a page, but stick to a single primary button within a set of buttons in a component or page section.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-order" img-alt="Button placement order" caption="Button placement order"></catalog-picture>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/primary-sec-cta"
    img-alt="Primary actions correct"
    title="Do"
    caption="Combine primary and CTA buttons to emphasize the path forward to the user">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/2-cta-dont"
    img-alt="Primary actions incorrect"
    title="Don't"
    caption="Do not have more than one main Call to Action on a page.">
  </catalog-picture>
</div>

The different button types can be used side-by-side depending on the desired effect.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/action-buttons-do"
    img-alt="Action buttons set correct"
    title="Do"
    caption="Create emphasis to the primary action within a set of buttons">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/action-buttons-dont"
    img-alt="Action buttons set incorrect"
    title="Don't"
    caption="Do not mix and match all button types together">
  </catalog-picture>
</div>

When giving users multiple options, a good rule of thumb is to use the CTA button for the main action, and visually separate a destructive or negative action. The distinction can be enforced with a tertiary button.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/basic-button-placement-discard" img-alt="Modal with 3 action choices" caption="Modal with 3 action choices"></catalog-picture>

## Buttons with icon
Icons can be used in buttons to better communicate the action that will be triggered.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-with-icons" img-alt="Buttons with Icons" caption="Buttons with Icons"></catalog-picture>

# Bare buttons
Bare buttons lose the outline and fill, and can be used to make the page appear more open.
When there is no text, the icon serves as the click target for the action.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-with-icons-bare-types" img-alt="Bare buttons" caption="Bare buttons"></catalog-picture>

## Behavior
The default, hover and pressed states apply to all bare type of buttons (icon only, icon and text, text only).

<catalog-picture img-src="../../img/guidelines/design/components/buttons/buttons-with-icons-bare-spec" img-alt="Bare buttons spec" caption="Bare buttons spec"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-with-icons-bare-spec-dark" img-alt="Bare buttons spec (dark theme)" caption="Bare buttons spec (dark theme)"></catalog-picture>

## Usage
Bare buttons can help emphasize specific actions when combined with outlined and other button styles.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/iconic-buttons-do"
    img-alt="Iconic buttons correct"
    caption="Be consistent in the use of iconic buttons">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/buttons-combination-examples"
    img-alt="Button combination for actions"
    caption="Combine button styles to create emphasis to certain actions">
  </catalog-picture>
</div>

Bare buttons and iconic buttons can also be used for in-line actions, or as actions in toolbars.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/button-combinations-examples-2"
    img-alt="Toolbar actions"
    caption="Bare buttons as actions in toolbar">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/button-combinations-examples-3"
    img-alt="Contextual Actions"
    caption="Iconic buttons in-line actions in tables">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/iconic-buttons-2-do"
    img-alt="Iconic buttons grouped actions correct"
    title="Do"
    caption="Group together actions to provide a more focused action path, and surface key actions.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/iconic-buttons-2-dont"
    img-alt="Iconic buttons overload incorrect"
    title="Don't"
    caption="Do not surface all possible actions at all times using iconic buttons.">
  </catalog-picture>
</div>

# Button Groups (Toggle buttons)
Button groups allow to toggle between similar actions and place them close together. Button groups allow for single or multiple selection from a limited number of options.

When used in multi selection mode, the button group serves as a filter to display multiple options.

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-groups" img-alt="Button groups" caption="Button Groups"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-group-specs-light" img-alt="Button Groups spec light" caption="Button Groups Spec (light theme)"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/components/buttons/button-group-specs-dark" img-alt="Button Groups spec dark" caption="Button Groups Spec (dark theme)"></catalog-picture>

## Usage
Button groups can be used to toggle between different views of content in a page.
They are used less frequently than other button types.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/button-groups-do"
    img-alt="Button groups correct"
    title="Do"
    caption="Use button groups to toggle between a small set of options (3-4 max)">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/components/buttons/button-groups-dont"
    img-alt="Button groups incorrect"
    title="Don't"
    caption="Do not overwhelm the user with too many toggle options. A dropdown or other switch mechanism would be more appropriate.">
  </catalog-picture>
</div>

# Implementation
PX CSS implementation for [Buttons](#/css/visual/buttons/px-buttons-design) and [Button Group](#/css/visual/buttons/px-button-group-design).
