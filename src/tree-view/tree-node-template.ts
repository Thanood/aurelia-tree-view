import { inject } from 'aurelia-dependency-injection';
import { getLogger, Logger } from 'aurelia-logging';
import { customElement, bindable, noView, processContent, TargetInstruction, ViewCompiler } from 'aurelia-templating';
import { NodeModel } from './node-model';

@customElement('tree-node-template')
@noView()
@processContent((compiler: ViewCompiler, resources: any, element: Element, instruction: any) => {
    const html = element.innerHTML;
    if (html !== '') {
        instruction.template = html;
    }
    element.innerHTML = '';
})
@inject(TargetInstruction)
export class TreeNodeTemplate {
    @bindable() model: NodeModel;
    private log: Logger;
    private template: any;

    constructor(targetInstruction: any) {
        this.log = getLogger('aurelia-tree-view/tree-node-template');
        this.template = targetInstruction.elementInstruction.template;
        // this.log.debug(targetInstruction);
    }
}
