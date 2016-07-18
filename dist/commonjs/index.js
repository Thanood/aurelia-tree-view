'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _nodeModel = require('./tree-view/node-model');

Object.keys(_nodeModel).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nodeModel[key];
    }
  });
});

var _aureliaFramework = require('aurelia-framework');

var _configBuilder = require('./config-builder');

function configure(aurelia, configCallback) {
  var builder = new _configBuilder.ConfigBuilder();

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}