'use strict';

System.register(['aurelia-templating', './common/constants'], function (_export, _context) {
  "use strict";

  var customElement, constants, _dec, _class, ClickCounter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
    }, function (_commonConstants) {
      constants = _commonConstants.constants;
    }],
    execute: function () {
      _export('ClickCounter', ClickCounter = (_dec = customElement(constants.elementPrefix + 'click-counter'), _dec(_class = function () {
        function ClickCounter() {
          _classCallCheck(this, ClickCounter);

          this.count = 0;
        }

        ClickCounter.prototype.increment = function increment() {
          this.count++;
        };

        return ClickCounter;
      }()) || _class));

      _export('ClickCounter', ClickCounter);
    }
  };
});
//# sourceMappingURL=dist/dev/click-counter.js.map
