---
title: Illustrations
layout: default
moduleName: view-design-illustrations
pathToRoot: ../../
---

Illustrations help teach users about complex functionality in an application by reinforcing written explanations with images. An illustration can appear in a [popover](#/elements/px-popover), [modal](#/elements/px-modal), or within the content area of a page.

<catalog-picture img-src="../../img/guidelines/design/illustrations/illustration-hero" img-alt="Illustrated popover" caption="An example of an illustrated popover that explains a complex concept."></catalog-picture>

# Best Practices
### Less is more
Ask yourself if the illustration is really needed, or if text is enough to convey the idea clearly. If you do add an illustration, make sure supplementary text is not redundant. Omit words when possible to avoid creating multiple illustrations for different languages.

### Consider the context of use
Ensure your illustration fits appropriately the area where it is used (popovers, modals, etc). Maintain scale and color themes in the area of use. 

### Start small and work your way out
Illustrations should only be as big as needed to convey a concept legibly, but still respect the area in which they are viewed. Ask yourself what is the core of the idea that is being communicated, and remove any items that do not reinforce this idea.

### Use consistent illustrations
Keep illustration styles consistent with the design system language and brand. Your illustrations should look like they are coming from the same source. 

# Colors
The color scheme for illustrations is monochromatic, using only the Aqua [color set](#/css/visual/px-colors-design) from the Predix Design System. Illustrations can be on light or dark backgrounds. Depending on what color theme the illustration is being placed in, you can choose the right color combinations.

<catalog-picture img-src="../../img/guidelines/design/illustrations/illustrations-colors" img-alt="Illustrations colors by theme" caption="Colors line and fill on an illustration are the same across theme. Text color in illustrations vary depending on theme."></catalog-picture>

The aqua theme ensures illustrations look consistent regardless of the theme.
<catalog-picture img-src="../../img/guidelines/design/illustrations/diagram-themes" img-alt="Light and dark themed popover components." caption="Light and dark themed popover components. "></catalog-picture>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/illustration-color-do"
    img-alt="Illustrations colors correct"
    title="Do"
    caption="Use color intentionally to highlight concepts.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/illustration-color-dont"
    img-alt="Illustrations colors incorrect"
    title="Don't"
    caption="Do not abuse color as it creates confusion.">
  </catalog-picture>
</div>

# Lines and Fills
Illustrations are line art. Lines are 1 pixel thick and fills should be used sparingly. Lines can be solid, dotted or dashed; whatever makes the most sense for the story you are reinforcing. Corner radius can be whatever is most useful. Embrace simplicity by avoiding fills, textures and patterns inside your shapes.

<catalog-picture img-src="../../img/guidelines/design/illustrations/basic-shapes" img-alt="Line and fill colors example" caption="Use the same color for line and fill in both light and dark backgrounds."></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/illustrations/basic-lines" img-alt="Basic shapes in illustraions" caption="Use lines to create basic shapes."></catalog-picture>

Simple shapes and lines are always best.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/fill-do"
    img-alt="Shapes and lines correct"
    title="Do"
    caption="Use solid fills with 30% opacity if needed.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/fill-dont"
    img-alt="Shapes and lines incorrect"
    title="Don't"
    caption="Don't use lines as a fill or a series of lines to represent a shape when a simple shape works better.">
  </catalog-picture>
</div>

### Specification
Basic shapes using a 1-pixel border, solid and dashed (dash 5, gap 2) and shapes with fills.
<catalog-picture img-src="../../img/guidelines/design/illustrations/diagram-specs" img-alt="Illustration specs" caption="A light vs dark comparison of a simple shape rendered with different border styles, fills and text."></catalog-picture>

# Using Text
Text should only be incorporated into an illustration when necessary. Omit words when possible to avoid creating multiple illustrations for different languages.
Leverage the container where the illustration will be placed if additional text is needed. Avoid adding text for things that are obvious in the illustration.

Text in illustrations is always 12 pixels, GE Inspira Sans, with normal weight.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/text-do"
    img-alt="Text in illustration correct size"
    title="Do"
    caption="Use a 12px font size, with normal weight to maintain consistency.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/text-dont"
    img-alt="Text in illustrations incorrect size and style"
    title="Don't"
    caption="Do not add unnecessary text stylings (colors, caps, bold, or italics)">
  </catalog-picture>
</div>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/text-do-2"
    img-alt="Text in illustration correct"
    title="Do"
    caption="Leverage the container where the illustration will appear to add any claryfying text.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/illustrations/text-dont-2"
    img-alt="Text in illustrations incorrect"
    title="Don't"
    caption="Do not include lots of text in an illustration, as it reduces the impact of the illustration.">
  </catalog-picture>
</div>

# Tips for Creating illustrations
- Export as PNG
- Use our Sketch library; take advantage of our pre-made color palettes, icons and typography rules
- Create illustrations with design tools other than Sketch. Adobe Illustrator and InVision Freehand are great, but Sketch will do a better job of making sure your illustrations look and feel consistent.
