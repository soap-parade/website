// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"IHW9":[function(require,module,exports) {
window.fathom = function () {
  var fathomScript = document.currentScript || document.querySelector('script[src*="script.js"][site]') || document.querySelector("script[data-site]") || document.querySelector("script[site]"),
      siteId = fathomScript.getAttribute("data-site") || fathomScript.getAttribute("site"),
      honorDNT = !1,
      auto = !0,
      canonical = !0,
      excludedDomains = [],
      allowedDomains = [];
  "true" == (fathomScript.getAttribute("data-honor-dnt") || fathomScript.getAttribute("honor-dnt")) && (honorDNT = "doNotTrack" in navigator && "1" === navigator.doNotTrack), "false" == (fathomScript.getAttribute("data-auto") || fathomScript.getAttribute("auto")) && (auto = !1), "false" == (fathomScript.getAttribute("data-canonical") || fathomScript.getAttribute("canonical")) && (canonical = !1), (fathomScript.getAttribute("data-excluded-domains") || fathomScript.getAttribute("excluded-domains")) && (excludedDomains = (fathomScript.getAttribute("data-excluded-domains") || fathomScript.getAttribute("excluded-domains")).split(",")), fathomScript.getAttribute("data-included-domains") || fathomScript.getAttribute("included-domains") ? allowedDomains = (fathomScript.getAttribute("data-included-domains") || fathomScript.getAttribute("included-domains")).split(",") : (fathomScript.getAttribute("data-allowed-domains") || fathomScript.getAttribute("allowed-domains")) && (allowedDomains = (fathomScript.getAttribute("data-allowed-domains") || fathomScript.getAttribute("allowed-domains")).split(","));

  function trackPageview() {
    window.fathom.trackPageview();
  }

  function spaHistory() {
    var pushState;
    void 0 !== history && (pushState = history.pushState, history.pushState = function () {
      var ret = pushState.apply(history, arguments);
      return window.dispatchEvent(new Event("pushstate")), window.dispatchEvent(new Event("locationchangefathom")), ret;
    }, window.addEventListener("popstate", function () {
      window.dispatchEvent(new Event("locationchangefathom"));
    }), window.addEventListener("locationchangefathom", trackPageview));
  }

  function spaHash() {
    window.addEventListener("hashchange", trackPageview);
  }

  if (fathomScript.getAttribute("data-spa") || fathomScript.getAttribute("spa")) switch (fathomScript.getAttribute("data-spa") || fathomScript.getAttribute("spa")) {
    case "history":
      spaHistory();
      break;

    case "hash":
      spaHash();
      break;

    case "auto":
      (void 0 !== history ? spaHistory : spaHash)();
  }
  var scriptUrl,
      trackerUrl = "https://cdn.usefathom.com/";

  function encodeParameters(params) {
    return params.cid = Math.floor(1e8 * Math.random()) + 1, "?" + Object.keys(params).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
    }).join("&");
  }

  function qs() {
    for (var pair, data = {}, pairs = window.location.search.substring(window.location.search.indexOf("?") + 1).split("&"), i = 0; i < pairs.length; i++) {
      pairs[i] && (pair = pairs[i].split("="), -1 < ["keyword", "q", "ref", "s", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term", "action", "name", "pagename", "tab"].indexOf(decodeURIComponent(pair[0])) && (data[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])));
    }

    return data;
  }

  function trackingEnabled() {
    var fathomIsBlocked = !1;

    try {
      fathomIsBlocked = window.localStorage && window.localStorage.getItem("blockFathomTracking");
    } catch (err) {}

    var prerender = "visibilityState" in document && "prerender" === document.visibilityState,
        isExcludedDomain = -1 < excludedDomains.indexOf(window.location.hostname),
        isAllowedDomain = !(0 < allowedDomains.length) || -1 < allowedDomains.indexOf(window.location.hostname);
    return !(fathomIsBlocked || prerender || honorDNT || isExcludedDomain) && isAllowedDomain;
  }

  function getLocation(params) {
    var a,
        location = window.location;
    return void 0 === params.url ? canonical && document.querySelector('link[rel="canonical"][href]') && ((a = document.createElement("a")).href = document.querySelector('link[rel="canonical"][href]').href, location = a) : (location = document.createElement("a")).href = params.url, location;
  }

  return fathomScript.src.indexOf("cdn.usefathom.com") < 0 && ((scriptUrl = document.createElement("a")).href = fathomScript.src, trackerUrl = "https://" + scriptUrl.hostname + "/"), auto && setTimeout(function () {
    window.fathom.trackPageview();
  }), {
    siteId: siteId,
    send: function send(params) {
      var img;
      trackingEnabled() && ((img = document.createElement("img")).setAttribute("alt", ""), img.setAttribute("aria-hidden", "true"), img.style.position = "absolute", img.src = trackerUrl + encodeParameters(params), img.addEventListener("load", function () {
        img.parentNode.removeChild(img);
      }), img.addEventListener("error", function () {
        img.parentNode.removeChild(img);
      }), document.body.appendChild(img));
    },
    beacon: function beacon(params) {
      trackingEnabled() && navigator.sendBeacon(trackerUrl + encodeParameters(params));
    },
    trackPageview: function trackPageview(params) {
      var hostname,
          pathnameToSend,
          location = getLocation(params = void 0 === params ? {} : params);
      "" !== location.host && (hostname = location.protocol + "//" + location.hostname, pathnameToSend = location.pathname || "/", "hash" == fathomScript.getAttribute("data-spa") && (pathnameToSend += location.hash), this.send({
        p: pathnameToSend,
        h: hostname,
        r: params.referrer || (document.referrer.indexOf(hostname) < 0 ? document.referrer : ""),
        sid: this.siteId,
        qs: JSON.stringify(qs())
      }));
    },
    trackGoal: function trackGoal(code, cents) {
      var location = getLocation({}),
          hostname = location.protocol + "//" + location.hostname;
      this.beacon({
        gcode: code,
        gval: cents,
        qs: JSON.stringify(qs()),
        p: location.pathname || "/",
        h: hostname,
        r: document.referrer.indexOf(hostname) < 0 ? document.referrer : "",
        sid: this.siteId
      });
    },
    trackEvent: function trackEvent(name) {
      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var location = getLocation({}),
          hostname = location.protocol + "//" + location.hostname;
      this.beacon({
        name: name,
        payload: JSON.stringify(payload),
        p: location.pathname || "/",
        h: hostname,
        r: document.referrer.indexOf(hostname) < 0 ? document.referrer : "",
        sid: this.siteId,
        qs: JSON.stringify(qs())
      });
    },
    setSite: function setSite(siteId) {
      this.siteId = siteId;
    },
    blockTrackingForMe: function blockTrackingForMe() {
      window.localStorage ? (window.localStorage.setItem("blockFathomTracking", !0), alert("You have blocked Fathom for yourself on this website.")) : alert("Your browser doesn't support localStorage.");
    },
    enableTrackingForMe: function enableTrackingForMe() {
      window.localStorage && (window.localStorage.removeItem("blockFathomTracking"), alert("Fathom has been enabled for this website."));
    }
  };
}();
},{}]},{},["IHW9"], null)
//# sourceMappingURL=/script.e06de281.js.map