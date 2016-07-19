'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var ConfigBuilder;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('ConfigBuilder', ConfigBuilder = function () {
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
      }());

      _export('ConfigBuilder', ConfigBuilder);
    }
  };
});
//# sourceMappingURL=dist/dev/config-builder.js.map
