'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickCounter = undefined;

var _dec, _class;

var _aureliaTemplating = require('aurelia-templating');

var _constants = require('./common/constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClickCounter = exports.ClickCounter = (_dec = (0, _aureliaTemplating.customElement)(_constants.constants.elementPrefix + 'click-counter'), _dec(_class = function () {
  function ClickCounter() {
    _classCallCheck(this, ClickCounter);

    this.count = 0;
  }

  ClickCounter.prototype.increment = function increment() {
    this.count++;
  };

  return ClickCounter;
}()) || _class);