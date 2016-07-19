define(['exports', 'aurelia-dependency-injection', 'aurelia-logging', 'aurelia-templating'], function (exports, _aureliaDependencyInjection, _aureliaLogging, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TreeViewTemplate = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _dec3, _dec4, _class;

  var TreeViewTemplate = exports.TreeViewTemplate = (_dec = (0, _aureliaTemplating.customElement)('tree-node-template'), _dec2 = (0, _aureliaTemplating.noView)(), _dec3 = (0, _aureliaTemplating.processContent)(function (compiler, resources, element, instruction) {
    var html = element.innerHTML;
    if (html !== '') {
      instruction.template = html;
    }
    element.innerHTML = '';
  }), _dec4 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function TreeViewTemplate(targetInstruction) {
    _classCallCheck(this, TreeViewTemplate);

    this.log = (0, _aureliaLogging.getLogger)('tree-node-template');

    this.template = targetInstruction.elementInstruction.template;
    this.log.debug(targetInstruction);
  }) || _class) || _class) || _class) || _class);
});