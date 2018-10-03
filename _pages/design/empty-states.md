---
title: Empty States
layout: default
moduleName: view-design-empty-states
pathToRoot: ../../
---

Empty states occur when there are no items to display in a content area (page, section, widget, card, list, etc).
Having an empty state provides users with feedback on the state of the system and help prevent confusion.

# Best Practices
### Be helpful and informative
Use easy to understand language that clearly indicates the state of the data or page.  An empty state should be one to two short sentences that can be quickly read. 

### Provide a resolution (if possible)
Whenever possible, provide clear calls to action complementing the helper text. This will allow the user to move forward or resolve a potential issue.

### Provide feedback
Do not leave the user guessing as to the status of the system. Use empty states to provide feedback and prevent confusion. 

# Usage
Empty states should provide contextualized information to the user, based on the type of data that is expected. Empty states can also guide the user towards an action. 

Common situations when an empty state is appropriate:
- No object or data exists 
- User has no permissions to view a page
- When a user action is required to display content
- After a user deleted all the data within a section or widget
- A search or filter that returned no results
- Data failed to load in a page or specific sections/components

## Anatomy
Empty states are composed of:
- Helper text (Required)
- An icon (Optional) that gives an idea of the type of data or object that will be visible in this page. Make sure you use the [Predix icons](#/elements/px-icon-set) or follow the [iconography guidelines](#/design/foundation/iconography) when creating new icons. If you cannot find an icon that communicates the idea clearly, do not include one.
- An action (Optional) that will provide a resolution or change to the state of data. Some example actions are creating a record, adding an item to a table, etc. Make sure the action complements the ways in which users will add data to a page or section once it is in a non-empty state. 

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-states-anatomy" img-alt="Empty States Anatomy" caption="Empty states anatomy (icon and action are optional)"></catalog-picture>

# Empty Page
Empty pages can occur in situations where there is no data in the system yet to create a view. In these cases, provide the user with clear information on the current state, and provide a call to action that will start populating this page. 

Consider the context of use and what information is relevant to the user and potential edge cases based on permissions. For example, for users with no edit or create permissions, the CTA button would not be visible, but the empty state will still be relevant.

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-do" img-alt="Empty page with CTA" caption="Empty page with call to action"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/no-permissions-empty" img-alt="No permissions page" caption="An Empty State page for users who don't have access to a page/feature"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-selection" img-alt="Empty body until user action" caption="Empty states can help inform users on the action that needs to be taken to display content on the page"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-action-needed" img-alt="Search to show content" caption="Help inform users that a search query will display content on the page"></catalog-picture>

## Color and sizing
Full page empty states are always centered in the content area they are located in. 

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-spacing" img-alt="Empty state page spacing" caption="Spacing for empty state in full page or large body area"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-spec" img-alt="Empty state page spec light theme" caption="Empty state page spec light theme"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-spec-dk" img-alt="Empty state page spec dark theme" caption="Empty state page spec dark theme"></catalog-picture>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/empty-state-page-dont-2"
    img-alt="Empty page incorrect"
    title="Don't"
    caption="Do not leave entire pages blank if there is no data available. Use empty states to inform the user if there are issues with the system or no available data.">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/empty-state-page-dont"
    img-alt="Empty state on full page with icon incorrect"
    title="Don't"
    caption="Do not fill out the entire page with an empty state icon. If you use an icon, stick to max 60x60 px for a full page empty state.">
  </catalog-picture>
</div>

# In-line Empty States
In-line empty states occur within the content of a page, when there are no items to display in a content area (section, widget, card, list, etc).
In these situations, display a message to the users to indicate if an action is required to add data, or that the current state is valid (i.e, there was no error loading the data). This message should be contextualized to the type of data that is expected.

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-sections" img-alt="In-line empty state" caption="Empty page section"></catalog-picture>

## Color and sizing
In-line empty states are always centered in the content area they are located in. 

<catalog-picture img-src="../../img/guidelines/design/empty-states/in-line-empty-spacing" img-alt="In-line empty state spacing" caption="Spacing for in-line empty state"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-spec" img-alt="In-line empty state spec light theme" caption="In-line empty state spec light theme"></catalog-picture>

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-page-spec-dk" img-alt="In-line empty state spec dark theme" caption="In-line empty state spec dark theme"></catalog-picture>

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/in-line-empty-do"
    img-alt="In-line empty state correct"
    title="Do"
    caption="Provide feedback on the state of a section">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/in-line-empty-dont"
    img-alt="In-line empty state incorrect"
    title="Don't"
    caption="Leave a section empty with no indication of the state of the data">
  </catalog-picture>
</div>

# Other components
The guidelines for in-line empty states are applicable to some components.

## Tables
Industrial applications rely heavily on displaying data in tables. As such, it is essential to provide users with feedback if for some reason data is not displaying in tables.

<div class="layout">
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/empty-table-do"
    img-alt="Empty state table correct"
    title="Do"
    caption="Provide a helper text message that indicates the reason for not seeing data in the table">
  </catalog-picture>
  <catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/empty-states/empty-table-dont"
    img-alt="Empty state table incorrect"
    title="Don't"
    caption="Do not leave widgets and other components empty with no indication of why the user is not seeing data">
  </catalog-picture>
</div>

## Widgets
Data visualizations such as widgets in a dashboard may sometimes fail to load data or time out. Make sure you are communicating to the user what is the state of data in the widget, and if there is a way to resolve this issue, provide an action for the user.

You can complement the empty states with a notification strip to indicate the page is experiencing issues. See the [notifications guidelines](#/design/communication/notifications) for more details.

<catalog-picture img-src="../../img/guidelines/design/empty-states/widgets-empty-states" img-alt="Widget empty states" caption="Showing empty states on widgets"></catalog-picture>

## Dropdowns
Depending on how you are loading data in your application, you may run into situations where data in dropdowns does not load correctly, or loads only when the user interacts with the dropdown. Consider disabling the dropdown until data has loaded, and if no data is available preventing the user from clicking. Alternatively, an empty state in the dropdown can help provide feedback that the data did not load.

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-state-components" img-alt="Empty states in dropdown" caption="Empty states in dropdowns"></catalog-picture>

## Panels & Inbox
Other components that can show empty states include inboxes and panels. The layout and rules for in-line empty states are applicable to these components.

<catalog-picture img-src="../../img/guidelines/design/empty-states/empty-post-search" img-alt="No results inbox" caption="Empty state in Inbox"></catalog-picture>
