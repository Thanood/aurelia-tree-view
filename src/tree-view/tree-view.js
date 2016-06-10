import {bindable, bindingMode, inject} from 'aurelia-framework';
import {NodeModel} from './node-model';
import {TreeNode} from './tree-node';
import {fireEvent} from '../common/events';
import {DragAndDrop} from './drag-and-drop';

@inject(Element, DragAndDrop)
export class TreeView {
  @bindable({
    defaultBindingMode: bindingMode.oneTime
  }) enableDrag: boolean = false;
  @bindable() expandOnSelect: boolean = false;
  @bindable() nodes: NodeModel[];
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected: NodeModel = null;

  constructor(element, dragAndDrop) {
    this.element = element;
    this.dragAndDrop = dragAndDrop;
  }

  bind() {
    this.enableDrag = (this.enableDrag === true || this.enableDrag === 'true');
  }

  attached() {
    if (this.enableDrag) {
      this.dragAndDrop.activate(this);
    }
  }

  onSelected(e) {
    if (this.selected && this.selected !== e.detail.node) {
      this.selected.deselectNode();
    }
    this.selected = e.detail.node;
    if (this.expandOnSelect) {
      this.selected.expandNode();
    }
    fireEvent(this.element, 'selected', e.detail);
  }

  expandOnSelectChanged(newValue) {
    this.expandOnSelect = (newValue === true || newValue === 'true');
  }

  moveNode(node: TreeNode, target: TreeNode) {
    target.model.children.push(node.model);
    let parent = node.element.parentNode;
    let children;
    while (parent !== null && parent.tagName !== 'TREE-NODE') {
      parent = parent.parentNode;
    }
    if (parent === null) {
      children = this.nodes;
    } else {
      children = parent.au['tree-node'].viewModel.model.children;
    }
    let pos = children.indexOf(node.model);
    children.splice(pos, 1);
  }
}
