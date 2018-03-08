---
title: Contribution License Agreement
moduleName: dev-cla
pathToRoot: ../../
layout: default
otherStyleIncludes: |
    <style include="px-cla-styles"></style>
otherImports: |
    <link async rel="import" href="../../css/px-cla-styles.html">
---

Want to contribute your suggestions to the Predix Design System? **Here's how you can help.**

Please follow the below steps carefully, so your suggestions will be clear and developers can make effective fixes.
<form action="https://formspree.io/cla@ge.com" method="POST">
  <fieldset class="form-field" style="max-width:400px;">
    <legend>Basic form</legend>
    <ol class="list-bare">
      <li class="form-field">
        <label for="contributor-name">Name</label>
        <input class="text-input" name="contributor-name" id="contributor-name" type="text" placeholder="Boomer King">
      </li>
      <li class="form-field">
        <label for="contributor-email">Email address</label>
        <input class="text-input" name="contributor-email" id="contributor-email" type="email" placeholder="vegas@predix-ui.com">
      </li>
      <li class="form-field">
        <label for="contributor-github">Github Username</label>
        <input class="text-input" name="contributor-github" id="contributor-github" type="text" placeholder="@borderterrier">
      </li>
      <li class="form-field">
        <input name="contributor-agree" id="basic-form-checkbox" type="checkbox">
        <span class="label--inline" for="basic-form-checkbox">I agree to your terms</span>
      </li>
    </ol>
    <input class="btn" type="reset" value="Cancel">
    <input class="btn btn--primary" type="submit" value="Submit">
  </fieldset>
</form>
