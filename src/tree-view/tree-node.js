import {bindable, inject} from 'aurelia-framework';
import {NodeModel} from './node-model';
import {fireEvent} from '../common/events';

@inject(Element)
export class TreeNode {
  @bindable() model: NodeModel = null;
  
  constructor(element: Element) {
    this.element = element;
  }
  
  selectNode() {
    this.model.selectNode();
    fireEvent(this.element, 'selected', { node: this.model });
  }
}
