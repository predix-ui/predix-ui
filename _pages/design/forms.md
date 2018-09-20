---
title: Forms
layout: default
moduleName: view-design-forms
pathToRoot: ../../
---

Forms allow users to input data and interact with the application. The industrial Internet often has large amounts of data to be collected which makes well-designed forms crucial for accuracy and efficiency. Successful forms are easy to scan and presents the user with a minimum amount of input necessary to complete a task.


# Best Practices

### Keep forms succinct
Avoid overwhelming users with forms that have a multitude of fields and options to populate and select. Consider removing fields if information can be broken up into multiple pages or collected in some other way, i.e., a temperature sensor.

### Group related elements together
Visually group related form elements and keep labels close to their corresponding fields. Space fields generously, and clearly separate sections. This way it is easy to scan through a page by scrolling in order to select the section in question. Support accessibility by using the label attribute for [screen readers](https://www.w3.org/WAI/tutorials/forms/labels/).

### Use logical sequencing
Guide users through a form by organizing the information spatially and logically. Position fields that commonly occur and are used frequently at the beginning of the form. Use standard sequences in the order a user expects, e.g., credit-card number, expiration date, security code. Prompt a user with a cursor in the first field and give clear guidance as to how she navigates the Tab-key sequence. This supports accessibility and is important to some user's efficiency when doing repetitive tasks.

### Use clear validation
Provide users with immediate feedback to help expedite the speed and ease of filling out a form. Clearly identify when errors have been made so that users don't ignore or omit critical information.


# Form Construction
The most basic form contains a headline, section header, a text entry field, a secondary button, and a primary button. Forms use a three column grid structure and leverage the left two columns for form elements. The third row is reserved for instructional copy or contextual help. The buttons align to the bottom right corner of the form. The primary action button is always aligned to the right and can be $primary-default blue or $gray14 depending on the desired emphasis.

<catalog-picture img-src="../../img/guidelines/design/forms/form_simplest_form_grid" img-alt="Form with a three column grid" caption="Form elements populate the first and second column of a three column grid."></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/forms/form_simplest_form_sidebar" img-alt="Form with a three column grid without the gridlines" caption="The third column is reserved for instructional copy or contextual help. Use $gray1 for the right column background."></catalog-picture>


# Spacing
Visually separate form elements by using the vertical spacing conventions of 30 and 60 pixels. Use 30 pixels for elements that are in a group so they are closer together. Differentiate groups with separations of 60 pixels in height. The spacing guides are available in the Sketch stencil as symbols.

<catalog-picture img-src="../../img/guidelines/design/forms/form_simplest_form_spacing" img-alt="Form with horizontal spacing guides" caption="Color coded horizontal Spacing with numeric values"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/forms/form_simplest_form_grid-spacing" img-alt="Form with horizontal and vertical spacing" caption="Color-coded horizontal and vertical spacing as it would look like in Sketch. "></catalog-picture>


# Localization
When designing for different markets, consider how labels might be translated into another language. Some languages like German, French and Swedish might only offer very long words and can be difficult to squeeze into layouts initially designed in English. Where English and French might use separate terms, German  combines words which might truncate the message and leave the user guessing. Below are a few English, French and German translations:

E: Beef<br>
F: Du boef<br>
G: Rindfleisch<br>

E: Sunset<br>
F: Oucher de soleil<br>
G: Sonnenuntergang<br>

E: Beef labeling supervision task transition law<br>
F: Organisme de supervision de la transition de la loi sur l’étiquetage du boeuf<br>
G: Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz


# Checkout Form
Below is an example of a checkout form showing typical content. Note how the short dropdown menus on the bottom of the page use the sizing of the six column grid.

<catalog-picture img-src="../../img/guidelines/design/forms/form_checkout" img-alt="A checkout form example" caption="A checkout form example"></catalog-picture>

Below is the same example as above showing the grid and spacing.

<catalog-picture img-src="../../img/guidelines/design/forms/form_checkout_grid-spacing" img-alt="A checkout form example with the grid and spacing" caption="The grid and spacing of the example form above"></catalog-picture>
