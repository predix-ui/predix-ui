---
title: Contribution
moduleName: view-develop-contribution
pathToRoot: ../../
layout: default
---

Want to contribute your suggestions to the Predix Design System? **Here's how you can help.**

Please follow the below steps carefully, so your suggestions will be clear and developers can make effective fixes.

## GitHub Issues

The GitHub issue tracker is the preferred channel for bug reports, feature requests and submitting pull requests, so please respect the following guidelines:

* Please **do** fill out the issue or pull request template with the requested information so we are able to better understand, diagnose, and address the issue or request.
* Please **do not** use the GitHub issue tracker for personal support requests. Stack Overflow ([`predix`](https://stackoverflow.com/questions/tagged/predix-ui) tag), or the documentation and forums on [Predix.io](https://predix.io) are better places to ask for help.
* Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.
* Please **do not** post vague comments like "+1" or ":thumbsup:". Use [GitHub's "reactions" feature](https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments). We reserve the right to delete comments.

## Bug Reports

A bug is a _demonstrable problem_ caused by the code in the repository. Good bug reports are extremely helpful.

Guidelines for bug reports:

* **Validate and lint your code** - [validate your HTML](http://html5.validator.nu) and [lint your HTML](http://www.dirtymarkup.com/) to ensure your problem isn't caused by a simple error in your own code.
* **Use the GitHub issue search** - check if the issue has already been reported.
* **Check if the issue has been fixed** - try to reproduce the issue by using the latest `master` or development branch in the repository.
* **Isolate the problem** - ideally create a [reduced test case](https://css-tricks.com/reduced-test-cases/) and a live example using [CodePen](http://codepen.io/mdwragg/pen/LNwmpB) or [jsfiddle](https://jsfiddle.net/Lqmcwhw0/3/). Each component's API and demo page includes a link to a pre-populated CodePen or Glitch that can help as a starting point.

A good bug report shouldn't require others to get more information. Please be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? Do other browsers show the bug differently? What would you expect for the outcome? Such details will help people fix potential bugs.

## Feature Requests

Feature requests are welcome, but before opening one, determine if your idea suits the scope and aims of the Predix Design System. *You* need to make a strong case and convince the Predix Design System team to adopt your feature. Please provide as much detail and context as possible.


## Pull Requests

Pull requests require acceptance of GE's [contributor license agreement](https://www.predix-ui.com/#/develop/cla) so start by reading it over and registering your GitHub account.

Your pull requests (for patches, improvements, and new features) are a big help. The requests should be focused and avoid unrelated commits. **Please ask** before making a significant pull request (e.g., implementing features, refactoring code, or porting to a different language) that our team may not merge into the component.

Please follow the same coding conventions used throughout the project (indentation, accurate comments, etc.) and any other requirements (such as test coverage). **Do not edit any of the CSS files directly!** The files are automatically generated. You should edit the source files in `sass/` instead.

Please use the following process to have your work considered for the project:

1. [Fork](https://help.github.com/fork-a-repo/) the component.

2. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

3. Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html) or your code is unlikely to be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up your commits before making them public.

4. Locally merge (or rebase) the latest commits into your branch:

   ```bash
   git pull [--rebase] origin master
   ```

5. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the `master` branch.

## Code Guidelines

#### HTML

[Adhere to this guide](http://codeguide.co/#html)

- Use tags and elements appropriate for an HTML5 doctype (e.g., self-closing tags).
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) attributes in documentation examples to promote accessibility.

#### CSS

[Adhere to this guide](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Except in rare cases, don't remove default `:focus` styles (via e.g. `outline: none;`) without providing alternative styles. See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.

#### JS

- 2 spaces (no tabs)
- no errors / warnings
