import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {LogManager} from 'aurelia-logging';
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
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
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

  toggleNode() {
    if (this.model.expanded) {
      this.model.collapseNode();
      fireEvent(this.element, 'collapsed', { node: this.model });
    } else {
      this.model.expandNode();
      fireEvent(this.element, 'expanded', { node: this.model });
    }
  }
}
