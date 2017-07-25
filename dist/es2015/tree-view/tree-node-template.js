var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { customElement, bindable, noView, processContent, TargetInstruction } from 'aurelia-templating';
var TreeNodeTemplate = (function () {
    function TreeNodeTemplate(targetInstruction) {
        this.log = getLogger('aurelia-tree-view/tree-node-template');
        this.template = targetInstruction.elementInstruction.template;
        // this.log.debug(targetInstruction);
    }
    __decorate([
        bindable()
    ], TreeNodeTemplate.prototype, "model", void 0);
    TreeNodeTemplate = __decorate([
        customElement('tree-node-template'),
        noView(),
        processContent(function (compiler, resources, element, instruction) {
            var html = element.innerHTML;
            if (html !== '') {
                instruction.template = html;
            }
            element.innerHTML = '';
        }),
        inject(TargetInstruction)
    ], TreeNodeTemplate);
    return TreeNodeTemplate;
}());
export { TreeNodeTemplate };
