'use strict';

System.register(['aurelia-framework', './config-builder', './tree-view/node-model'], function (_export, _context) {
  "use strict";

  var Aurelia, ConfigBuilder;
  return {
    setters: [function (_aureliaFramework) {
      Aurelia = _aureliaFramework.Aurelia;
    }, function (_configBuilder) {
      ConfigBuilder = _configBuilder.ConfigBuilder;
    }, function (_treeViewNodeModel) {
      var _exportObj = {};

      for (var _key in _treeViewNodeModel) {
        if (_key !== "default") _exportObj[_key] = _treeViewNodeModel[_key];
      }

      _export(_exportObj);
    }],
    execute: function () {
      function configure(aurelia, configCallback) {
        var builder = new ConfigBuilder();

        if (configCallback !== undefined && typeof configCallback === 'function') {
          configCallback(builder);
        }

        aurelia.globalResources(builder.globalResources);
      }

      _export('configure', configure);
    }
  };
});
//# sourceMappingURL=dist/dev/index.js.map
