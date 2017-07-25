"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var aurelia_logging_1 = require("aurelia-logging");
var aurelia_templating_1 = require("aurelia-templating");
var TreeNodeTemplate = (function () {
    function TreeNodeTemplate(targetInstruction) {
        this.log = aurelia_logging_1.getLogger('aurelia-tree-view/tree-node-template');
        this.template = targetInstruction.elementInstruction.template;
        // this.log.debug(targetInstruction);
    }
    __decorate([
        aurelia_templating_1.bindable()
    ], TreeNodeTemplate.prototype, "model", void 0);
    TreeNodeTemplate = __decorate([
        aurelia_templating_1.customElement('tree-node-template'),
        aurelia_templating_1.noView(),
        aurelia_templating_1.processContent(function (compiler, resources, element, instruction) {
            var html = element.innerHTML;
            if (html !== '') {
                instruction.template = html;
            }
            element.innerHTML = '';
        }),
        aurelia_dependency_injection_1.inject(aurelia_templating_1.TargetInstruction)
    ], TreeNodeTemplate);
    return TreeNodeTemplate;
}());
exports.TreeNodeTemplate = TreeNodeTemplate;
