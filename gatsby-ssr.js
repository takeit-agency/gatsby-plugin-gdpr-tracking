"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.onRenderBody = void 0;

var _react = _interopRequireDefault(require("react"));

var onRenderBody = function onRenderBody(_ref, _ref2) {
  var setHeadComponents = _ref.setHeadComponents,
      setPostBodyComponents = _ref.setPostBodyComponents;
  var _ref2$googleAnalytics = _ref2.googleAnalytics,
      googleAnalytics = _ref2$googleAnalytics === void 0 ? {} : _ref2$googleAnalytics,
      _ref2$environments = _ref2.environments,
      environments = _ref2$environments === void 0 ? ['production'] : _ref2$environments,
      hotjar = _ref2.hotjar,
      _ref2$facebookPixel = _ref2.facebookPixel,
      facebookPixel = _ref2$facebookPixel === void 0 ? {} : _ref2$facebookPixel;
  var currentEnvironment = process.env.ENV || process.env.NODE_ENV || "development";

  if (!environments.includes(currentEnvironment)) {
    return null;
  } // Lighthouse recommends pre-connecting to googletagmanager


  // setHeadComponents([/*#__PURE__*/_react.default.createElement("link", {
  //   rel: "preconnect dns-prefetch",
  //   key: "preconnect-googletagmanager",
  //   href: "https://www.googletagmanager.com"
  // }), /*#__PURE__*/_react.default.createElement("link", {
  //   rel: "preconnect dns-prefetch",
  //   key: "preconnect-google-analytics",
  //   href: "https://www.google-analytics.com"
  // })]);
  // var anonymize = typeof googleAnalytics.anonymize !== "undefined" && googleAnalytics.anonymize === true;
  // var setComponents = googleAnalytics.head ? setHeadComponents : setPostBodyComponents;
  // setComponents([/*#__PURE__*/_react.default.createElement("script", {
  //   async: true,
  //   src: "https://www.googletagmanager.com/gtag/js?id=" + googleAnalytics.trackingId
  // }), /*#__PURE__*/_react.default.createElement("script", {
  //   key: "gatsby-plugin-gdpr-tracking",
  //   dangerouslySetInnerHTML: {
  //     __html: "\n        " + (anonymize === true ? "function gaOptout(){document.cookie=disableStr+'=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/',window[disableStr]=!0}var gaProperty='" + googleAnalytics.trackingId + "',disableStr='ga-disable-'+gaProperty;document.cookie.indexOf(disableStr+'=true')>-1&&(window[disableStr]=!0);" : "") + "\n         window.dataLayer = window.dataLayer || [];\n         function gtag(){dataLayer.push(arguments);}\n        "
  //   }
  // })]);

  if (hotjar && hotjar.trackingId) {
    setHeadComponents([/*#__PURE__*/_react.default.createElement("script", {
      key: "gatsby-plugin-hotjar",
      dangerouslySetInnerHTML: {
        __html: "\n              var hjLoaded = false;\n              function trackHotjar() {\n                if (!hjLoaded) {\n                  (function(h,o,t,j,a,r){\n                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};\n                      h._hjSettings={hjid:" + hotjar.trackingId + ",hjsv:" + (hotjar.snippetVersion || '6') + "};\n                      a=o.getElementsByTagName('head')[0];\n                      r=o.createElement('script');r.async=1;\n                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;\n                      a.appendChild(r);\n                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')\n                  hjLoaded = true;\n                }\n             }\n          "
      }
    })]);
  }

  // if (facebookPixel && facebookPixel.pixelId) {
  //   setHeadComponents([/*#__PURE__*/_react.default.createElement("script", {
  //     key: "gatsby-plugin-gdpr-cookies-facebook-pixel",
  //     dangerouslySetInnerHTML: {
  //       __html: "\n            !function(f,b,e,v,n,t,s)\n            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n            n.callMethod.apply(n,arguments):n.queue.push(arguments)};\n            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\n            n.queue=[];t=b.createElement(e);t.async=!0;\n            t.src=v;s=b.getElementsByTagName(e)[0];\n            s.parentNode.insertBefore(t,s)}(window, document,'script',\n            'https://connect.facebook.net/en_US/fbevents.js');\n          "
  //     }
  //   })]);
  // }
};

exports.onRenderBody = onRenderBody;
