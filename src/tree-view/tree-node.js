import {bindable, inject, LogManager} from 'aurelia-framework';
import {NodeModel} from './node-model';
import {fireEvent} from '../common/events';

@inject(Element, LogManager)
export class TreeNode {
  @bindable() model: NodeModel = null;

  constructor(element: Element, logManager) {
    this.element = element;
    this.log = logManager.getLogger('tree-node');
  }

  insertChild(child: NodeModel, before: NodeModel) {
    let pos = this.model.children.indexOf(before);
    // TODO: insert at position
    this.model.children.push(child);
  }

  // removeNode(node: TreeNode) { }
  removeChild(child: NodeModel) {
    let pos = this.model.children.indexOf(child);
    if (pos > -1) {
      this.model.children.splice(pos, 1);
    } else {
      this.log.warn('child not found in model', child, this.model.children);
    }
  }

  selectNode() {
    this.model.selectNode();
    fireEvent(this.element, 'selected', { node: this.model });
  }
}
