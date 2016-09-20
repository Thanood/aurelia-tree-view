import {inject} from 'aurelia-dependency-injection';
import {getLogger} from 'aurelia-logging';
import {customElement, bindable, noView, processContent, TargetInstruction} from 'aurelia-templating';

@customElement('tree-node-template')
@noView()
@processContent((compiler, resources, element, instruction) => {
  let html = element.innerHTML;
  if (html !== '') {
    instruction.template = html;
  }
  element.innerHTML = '';
})
@inject(TargetInstruction)
export class TreeNodeTemplate {
  @bindable() model;
  log = getLogger('tree-node-template');

  constructor(targetInstruction) {
    this.template = targetInstruction.elementInstruction.template;
    this.log.debug(targetInstruction);
  }
}
