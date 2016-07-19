'use strict';

System.register(['aurelia-dependency-injection', 'aurelia-logging', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var inject, getLogger, customElement, bindable, noView, processContent, TargetInstruction, _dec, _dec2, _dec3, _dec4, _class, TreeViewTemplate;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_aureliaTemplating) {
      customElement = _aureliaTemplating.customElement;
      bindable = _aureliaTemplating.bindable;
      noView = _aureliaTemplating.noView;
      processContent = _aureliaTemplating.processContent;
      TargetInstruction = _aureliaTemplating.TargetInstruction;
    }],
    execute: function () {
      _export('TreeViewTemplate', TreeViewTemplate = (_dec = customElement('tree-node-template'), _dec2 = noView(), _dec3 = processContent(function (compiler, resources, element, instruction) {
        var html = element.innerHTML;
        if (html !== '') {
          instruction.template = html;
        }
        element.innerHTML = '';
      }), _dec4 = inject(TargetInstruction), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = function TreeViewTemplate(targetInstruction) {
        _classCallCheck(this, TreeViewTemplate);

        this.log = getLogger('tree-node-template');

        this.template = targetInstruction.elementInstruction.template;
        this.log.debug(targetInstruction);
      }) || _class) || _class) || _class) || _class));

      _export('TreeViewTemplate', TreeViewTemplate);
    }
  };
});
//# sourceMappingURL=../dist/dev/tree-view/tree-node-template.js.map
