"use strict"

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault")

exports.__esModule = true
exports.onRouteUpdate = exports.onClientEntry = void 0

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"))

var _jsCookie = _interopRequireDefault(require("js-cookie"))

var timeoutLength = 32 //https://github.com/gatsbyjs/gatsby/commit/42f509eadb06753f7b529f3682f22e012c21dc9b#diff-bf0d94c8bf47d5c1687e342c2dba1e00R31

var currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development"
var defaultOptions = {
  environments: ["production"],
  debug: false,
  googleAnalytics: {
    anonymize: true,
    controlCookieName: 'gdpr-analytics-enabled',
    autoStart: true,
    cookieFlags: 'secure;samesite=none'
  },
  googleAds: {
    controlCookieName: 'gdpr-marketing-enabled',
    anonymize: true,
    cookieFlags: 'secure;samesite=none'
  },
  facebookPixel: {
    controlCookieName: 'gdpr-marketing-enabled',
    cookieFlags: 'secure;samesite=none'
  },
  hotjar: {
    controlCookieName: 'gdpr-analytics-enabled'
  }
}

function injectScript(content) {
  const $script = document.createElement('script')
  $script.innerHTML = content

  document.head.appendChild($script)
}

function initFb(window, facebookPixelOpt, debug) {
  if (typeof window.fbq === "function" && _jsCookie.default.get(facebookPixelOpt.controlCookieName) === "true" && window.fbqInitialized !== true) {
    if (debug) {
      console.log("onClientEntry - Cookies.get('" + facebookPixelOpt.controlCookieName + "') is true ==> start fbpixel")
    }

    window.fbq('init', facebookPixelOpt.pixelId)
    window.fbqInitialized = true
  }
}

var onClientEntry = function onClientEntry(_, _ref) {
  var _ref$environments = _ref.environments,
    environments = _ref$environments === void 0 ? defaultOptions.environments : _ref$environments,
    hotjar = _ref.hotjar,
    facebookPixel = _ref.facebookPixel,
    debug = _ref.debug

  if (debug) {
    console.log("onClientEntry - currentEnvironment:", currentEnvironment)
  } // check for the production environment


  if (!environments.includes(currentEnvironment)) {
    if (debug) {
      console.log("onClientEntry - abort tracking since the environment is to configured. environments: ", environments)
    }

    return null
  }

  var facebookPixelOpt = (0, _extends2.default)({}, defaultOptions.facebookPixel, facebookPixel)
  var hotjarOpt = (0, _extends2.default)({}, defaultOptions.hotjar, hotjar)

  if (typeof window.trackHotjar === "function" && _jsCookie.default.get(hotjarOpt.controlCookieName) === "true") {
    if (debug) {
      console.log("onClientEntry - Cookies.get('" + hotjarOpt.controlCookieName + "') is true ==> start hotjar tracking")
    }

    window.trackHotjar()
  }

  if (typeof window.gtag === "function") {
    window.gaLoaded = false

    if (debug) {
      console.log("onClientEntry - gtag function is defined. gaLoaded=" + gaLoaded)
    }
  }

  initFb(window, facebookPixelOpt, debug)
}

exports.onClientEntry = onClientEntry

var onRouteUpdate = function onRouteUpdate(_ref2, _ref3) {
  var location = _ref2.location
  var _ref3$environments = _ref3.environments,
    environments = _ref3$environments === void 0 ? defaultOptions.environments : _ref3$environments,
    googleAnalytics = _ref3.googleAnalytics,
    googleAds = _ref3.googleAds,
    facebookPixel = _ref3.facebookPixel,
    debug = _ref3.debug

  if (debug) {
    console.log("onRouteUpdate - currentEnvironment:", currentEnvironment)
  } // check for the production environment


  if (!environments.includes(currentEnvironment)) {
    if (debug) {
      console.log("onRouteUpdate - abort tracking since the environment is to configured. environments: ", environments)
    }

    return null
  }

  var facebookPixelOpt = (0, _extends2.default)({}, defaultOptions.facebookPixel, facebookPixel)
  var googleAnalyticsOpt = (0, _extends2.default)({}, defaultOptions.googleAnalytics, googleAnalytics)
  var googleAdsOpt = (0, _extends2.default)({}, defaultOptions.googleAds, googleAds)

  if (debug) {
    console.log("onRouteUpdate - start tracking functions definitions")
  } // Google Analytics


  window.trackGoogleAnalytics = function () {
    if (debug) {
      console.log("onRouteUpdate - inside trackGoogleAnalytics function googleAnalytics options:", googleAnalyticsOpt)
    }

    if ((googleAnalyticsOpt.autoStart || _jsCookie.default.get(googleAnalyticsOpt.controlCookieName) === "true") && googleAnalyticsOpt.trackingId) {
      if (debug) {
        console.log("onRouteUpdate - inside trackGoogleAnalytics function - tracking is active!!")
      }

      if (!window.gaLoaded) {
        if (debug) {
          console.log("onRouteUpdate - initialize gtag with Date (gtag('js', new Date()))")
        }

        gtag('js', new Date())
        window.gaLoaded = true
      }

      if (debug) {
        console.log("onRouteUpdate - gaLoaded:", window.gaLoaded)
      }

      if (debug) {
        console.log("onRouteUpdate - inside trackGoogleAnalytics - track page view for path: ", location.pathname)
      }

      gtag('config', googleAnalyticsOpt.trackingId, {
        'anonymize_ip': googleAnalyticsOpt.anonymize.toString(),
        'page_path': location.pathname,
        'cookie_flags': googleAnalyticsOpt.cookieFlags
      })
    } else {
      if (debug) {
        console.log("onRouteUpdate - inside trackGoogleAnalytics function - tracking is disabled!!")
      }
    }
  }

  window.trackGoogleAnalyticsEvent = function (category, params) {
    if ((googleAnalytics.autoStart || _jsCookie.default.get(googleAnalyticsOpt.controlCookieName) === "true") && googleAnalyticsOpt.trackingId) {
      if (debug) {
        console.log("onRouteUpdate - inside trackGoogleAnalyticsEvent function - tracking is active!!")
      }

      gtag('event', category, params)
    } else {
      if (debug) {
        console.log("onRouteUpdate - inside trackGoogleAnalyticsEvent function - tracking is disabled!!")
      }
    }
  } // - Google Ads pixel
  // check if the marketing cookie exists


  window.trackGoogleAds = function () {
    if (_jsCookie.default.get(googleAdsOpt.controlCookieName) === "true" && googleAdsOpt.trackingId) {
      gtag('config', googleAdsOpt.trackingId, {
        'anonymize_ip': googleAdsOpt.anonymize.toString(),
        'page_path': location.pathname,
        'cookie_flags': googleAdsOpt.cookieFlags
      })
    }
  }

  window.trackGoogleAdsEvent = function (category, params) {
    if (_jsCookie.default.get(googleAdsOpt.controlCookieName) === "true" && googleAdsOpt.trackingId) {
      gtag('event', category, params)
    }
  } // facebook pixel


  window.trackFbPixel = function () {
    if (_jsCookie.default.get(facebookPixelOpt.controlCookieName) === "true" && typeof window.fbq === "function" && facebookPixelOpt.pixelId) {
      initFb(window, facebookPixelOpt, debug)
      window.fbq('track', 'PageView')
    }
  }

  if (debug) {
    console.log("onRouteUpdate - call tracking functions")
  } //setTimeout workaround to try to ensure the page title loads


  setTimeout(function () {
    window.trackGoogleAnalytics()
    window.trackGoogleAds()
    window.trackFbPixel()
  }, timeoutLength)
}

exports.onRouteUpdate = onRouteUpdate