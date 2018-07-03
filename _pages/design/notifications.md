---
title: Notifications and Alerts
layout: default
moduleName: view-design-notifications
pathToRoot: ../../
---

When choosing an [alert message](#/components/px-alert-message) or [notification](#/components/px-notification), consider what your user is trying to accomplish and what type of information needs to be brought to the users attention. Using the proper alert message or notification is critical in providing the right information and allowing the user to accomplish their task. The Predix Design System includes several components that are designed to inform the user. Choosing the right component will depend on the use case, the information, and the task.

# Best Practices
### Be purposeful and useful
Be careful not to inundate the user with alerts or notifications. Use an alert or notification when it's necessary to validate, inform or need the user to take action. Be deliberate and intentional when using alerts or notifications since they will grab the attention of the user.

### Know when to interrupt
Whether you use an alert message, a notification, or modal dialog, the intent is to inform the user of a change in process or state. In most cases, you don't want to interrupt the users workflow. However, the criticality of the change will drive whether it is necessary to interrupt the user and require them to take action.

### Consider other ways to inform
It is easy to default to using a notification to validate a change of a state. Consider using other methods to show a change in state, such as, a transition. Be aware of the frequency that the user must perform a task and if it is necessary to inform the user of a change in state.

### Be concise and clear
Provide a simple message that is relevant to the action performed. A message should be one to two short sentences that can be quickly read. Avoid using a read more option if possible. If your message is very long, consider distilling the message down to the most important point. Do not use a notification or alert message to explain a process.



# Notification
The [notification component](#/components/px-notification) is a visual bar that notifies the user of a change in state or provides status. The notification is intended to appear in context of the change or status. It can be applied at the page or a component level. Only one notification can appear at any given moment per instance.

## Confirmation

<catalog-picture img-src="../../img/guidelines/design/notifications/Confirmation-Example" img-alt="Confirmation example" caption="A user is added to a list and receives a confirmation when the user is successfully added."></catalog-picture>

The notification can be used to confirm a user's action. A confirmation should be timely and provide instant feedback that an action is successful or unsuccessful. The confirmation should appear in context of the object that is affected.

The notification can be configured to have a time span and will automatically be dismissed. 5 seconds is the recommended time span for a notification. You can also provide a way for the user to dismiss the notification before it automatically dismisses. If the notification is used to indicate an error state, you can persist the notification till the user corrects the state. If applicable, you can provide a method to get to the error within the notification. No other notifications can pass until the state has been corrected.

Notifications do not stack. There can only be one notification that can be seen at a time. If your workflow will trigger consecutive confirmations, consider only surfacing the most important information to the user and using other methods of confirming if necessary.

## Status Indicator

<catalog-picture img-src="../../img/guidelines/design/notifications/status-indicator" img-alt="Status Indicator" caption="A user applies a filter to a list and the applied filters are displayed in a status notification."></catalog-picture>

The notification can indicate the status of an object. For example, status can indicate an applied filter or that a page is not synced. Status indicators will generally persist till the state is removed or changed. A status indicator is not meant to be shown by default, but it is intended to show when there is a change in state and the user needs to be informed of this change.

When using the notification component to indicate a filtered view, you can use px-chips to show the applied filters. The user can remove individual filters by removing a chip and you can provide a way to remove all the filters with a clear all button.

<catalog-picture img-src="../../img/guidelines/design/notifications/filter-count" img-alt="Filter Count"></catalog-picture>

If you expect the user to apply many filters, consider displaying a count of the filters and allowing the user to view the applied through a panel or modal.


## Display in Context

You can display a notification in context of an area or component. Displaying a notification in context of where the action or error has occurred reduces ambiguity and clearly displays the intent.

A notification can be used to show the state of data. For example, a dashboard that was unable to pull the latest data should inform the user that the data is not fresh. Ideally the app will automatically attempt to refresh the data, but you can also allow the user to manually attempt to refresh. A notification can be applied at the dashboard level or at the widget level.

<catalog-picture img-src="../../img/guidelines/design/notifications/display-in-context" img-alt="In Context Notification" caption="A notification displays for a widget that has outdated data."></catalog-picture>

If multiple widgets are not syncing, consider using a single notification to indicate the syncing issue rather than have a lot of notifications on the screen.

<div class="layout">
<catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/notifications/do-in-context"
    img-alt="Indicate the data on the page is not current whenmultiple widgets are not syncing properly."
    caption="Indicate the data on the page is not current when multiple widgets are not syncing properly."
    title="Do">
</catalog-picture>
<catalog-picture
    class="layout__item picture-side-by-side"
    img-src="../../img/guidelines/design/notifications/dont-in-context"
    img-alt="Indicating each individual widget that has a syncing issue is not valuable when it is clear that the entire dashboard is suffering from connection issue."
    caption="Indicating each individual widget that has a syncing issue is not valuable when it is clear that the entire dashboard is suffering from connection issue."
    title="Don't">
</catalog-picture>
</div>

## Behavior
The notification can be configured to push or overlay the content. Choosing whether the notification should overlay or push content will depend on how often and the type of information.

### Overlay
The overlay behavior will float above content and cover any elements or components in the area where the notification will appear.

It is best to overlay content when confirming an action. The goal is to provide feedback with minimal disruption. A timed event and allowing the user to dismiss the notification will provide the user complete control over the notification.

### Push
The push behavior will push the content to make room for the notification to appear.

It is best to push content when there is a persistent change of state. The goal is to provide a strong affordance that a change of state has occurred. A persistent notification will remain until the user changes the state. If you expect a large number of notifications to appear, be aware that the content will constantly be shifting and can cause a jarring experience.

## Things to Consider
If you expect the user to invoke many confirmations in their workflow, consider leaving an ample amount of padding to accommodate for a notification.

Be aware of the overlaying notification location and be sure it does not cover essential components or elements. Even with a dismissible or timed notification, covering essential elements to a user's workflow can cause frustration.

# Alert Message
The [alert message component](#/components/px-alert-message) is a toast notification that floats above the page. Alert messages can appear in a queue with the most recent appearing at the top. Alert messages can be configured to have a time span and will automatically be dismissed. 5 seconds is the recommended time span for an alert message. You can also provide a way for the user to dismiss the alert message before it automatically dismisses.

<catalog-picture img-src="../../img/guidelines/design/notifications/alert-example" img-alt="Alert Example"></catalog-picture>

Alert messages are best used for system or application level messages which are pushed. Alert messages can be passive or require a user to acknowledge. When there is an issue that the user can take action on, you can provide an action to go to the issue within the alert message. It is best to provide a historical log of alert messages.

A alert message can be used to inform the user of a state of an action taken on a section of the application that the user is currently not on. For example, the user can start an uploading process in a section of the application. The user navigates to another section of the application before the upload process completes. An alert message can be used to notify the user that the upload process completed or failed.

## Things to Consider

Be aware of the type of actions that will trigger an alert message. You do not want to inundate the user with messages that do not require their attention or their acknowledgement.

Consider giving the user the flexibility to control what type of alert messages they see. Not all users will need to see the same type of messages.

# Modal Dialog
The modal dialog component places the user in a mode which disables the main window and the user must interact with the modal dialog before they can return to the parent application. A modal dialog is intended to interrupt the user's task and bring their attention to an immediate need.

<catalog-picture img-src="../../img/guidelines/design/notifications/modal-example" img-alt="Modal Example"></catalog-picture>

Use a modal dialog as an alert or notification only for the most critical events or confirmations. For example, use a modal dialog to confirm a destructive action like permanently deleting an object.

# Severity

## Color
<catalog-picture img-src="../../img/guidelines/design/notifications/severity-colors" img-alt="Severity colors"></catalog-picture>

The Predix Design System provides [base colors](#/css/visual/px-colors-design) for alerts. Status colors and definitions are provided with the notification and alert message components. Red is used as the most critical alert, while a neutral grey is the least crucial. The definitions and colors are meant to be a guide and can be customized to match your business or industry.

## Shape
<catalog-picture img-src="../../img/guidelines/design/notifications/criticality-shape" img-alt="Shape diagram"></catalog-picture>
In addition to colors, a set of shapes are provided to further communicate the level of severity. The shapes are designed on a scale of severity based on angularity. Numerical values are also provided to help rank the alerts.

We provide a range of properties to help match or establish a standard for your business or industry.

