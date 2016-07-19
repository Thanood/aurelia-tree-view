define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ConfigBuilder = exports.ConfigBuilder = function () {
    function ConfigBuilder() {
      _classCallCheck(this, ConfigBuilder);

      this.globalResources = [];
    }

    ConfigBuilder.prototype.useAll = function useAll() {
      return this.useClickCounter();
    };

    ConfigBuilder.prototype.useClickCounter = function useClickCounter() {
      this.globalResources.push('./tree-view/tree-view');
      this.globalResources.push('./tree-view/tree-node-template');
      return this;
    };

    return ConfigBuilder;
  }();
});