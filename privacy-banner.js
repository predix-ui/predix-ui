(function(id) {
  function append(scriptid, url) {
    var d = document,
      sn = "script",
      f = d.getElementsByTagName(sn)[0];
    if (!f) f = d.head;
    var s = d.createElement(sn);
    s.async = true;
    s.id = scriptid;
    s.src = url;
    f.parentNode.insertBefore(s, f);
  }

  function getRootDomain() {
    var parts = window.location.hostname.split(".");
    if (parts.length === 2) rootDomain = parts[0];
    else if (parts.length > 2) {
      // see if the next to last value is a common tld
      var part = parts[parts.length - 2];
      if (part === "com" || part === "co") {
        rootDomain = parts[parts.length - 3]; // go back one more
      } else {
        rootDomain = part;
      }
    }

    return rootDomain;
  }

  window.evidon = {};
  window.evidon.id = id;
  var cdn = "//c.evidon.com/",
    rootDomain = getRootDomain(),
    noticecdn = cdn + "sitenotice/";
  append("evidon-notice", noticecdn + "evidon-sitenotice-tag.js", false);
  append("evidon-location", cdn + "geo/country.js", true);
  append("evidon-themes", noticecdn + id + "/snthemes.js", true);
  if (rootDomain)
    append(
      "evidon-settings",
      noticecdn + id + "/" + rootDomain + "/settings.js",
      true
    );

  window.evidon.priorConsentCallback = function() {};

  window.evidon.closeCallback = function() {};

  window.evidon.consentWithdrawnCallback = function() {};
})(3453);
