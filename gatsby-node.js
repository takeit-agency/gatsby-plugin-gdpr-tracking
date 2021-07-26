"use strict";

exports.onPreInit = function (_ref, options) {
  var reporter = _ref.reporter;

  if (!options.googleAnalytics && !options.googleAnalytics.trackingId) {
    reporter.warn("The Google GDPR Analytics plugin requires at least a tracking ID of Google Analytics.");
  }
};