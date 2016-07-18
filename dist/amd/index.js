define(['exports', './tree-view/node-model', 'aurelia-framework', './config-builder'], function (exports, _nodeModel, _aureliaFramework, _configBuilder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  Object.keys(_nodeModel).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _nodeModel[key];
      }
    });
  });
  function configure(aurelia, configCallback) {
    var builder = new _configBuilder.ConfigBuilder();

    if (configCallback !== undefined && typeof configCallback === 'function') {
      configCallback(builder);
    }

    aurelia.globalResources(builder.globalResources);
  }
});