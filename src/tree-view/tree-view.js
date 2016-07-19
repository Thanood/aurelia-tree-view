import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {getLogger} from 'aurelia-logging';
import {bindingMode} from 'aurelia-binding';
import {NodeModel} from './node-model';
import {TreeNode} from './tree-node';
import {fireEvent} from '../common/events';

@inject(Element)
export class TreeView {
  @bindable() expandOnSelect: boolean = false;
  @bindable() nodes: NodeModel[];
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected: NodeModel = null;

  constructor(element) {
    this.element = element;
    this.log = getLogger('tree-view');

    let templateElement = this.element.querySelector('tree-node-template');
    if (templateElement) {
      this.templateElement = templateElement;
    } else {
      // this.log.warn('ctor - no template element');
    }
  }

  created() {
    if (this.templateElement) {
      if (this.templateElement.au) {
        let viewModel = this.templateElement.au.controller.viewModel;
        this.log.debug('viewModel', viewModel);
      } else {
        this.log.warn('no viewmodel found for template', this.templateElement);
      }
    } else {
      // this.log.warn('created - no template element');
    }
  }

  nodesChanged(newValue, oldValue) {
    if (newValue && this.templateElement) {
      // newValue.forEach(node => {
      //   node._template = this.templateElement.au.controller.viewModel.template;
      // });
      this.enhanceNodes(newValue);
    }
  }

  enhanceNodes(nodes: NodeModel[]) {
    nodes.forEach(node => {
      if (node.children && typeof node.children !== 'function') {
        this.enhanceNodes(node.children);
      }
      node._template = this.templateElement.au.controller.viewModel.template;
    });
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

  // moveNode(node: TreeNode, target: TreeNode | TreeView) {
  //   console.log('moveNode', node, target);
  //   if (target instanceof TreeNode) {
  //     target.model.children.push(node.model);
  //   }
  //   // target.model.children.push(node.model);
  //   let parent = node.element.parentNode;
  //   let children;
  //   while (parent !== null && parent.tagName !== 'TREE-NODE') {
  //     parent = parent.parentNode;
  //   }
  //   if (parent === null) {
  //     children = this.nodes;
  //   } else {
  //     children = parent.au['tree-node'].viewModel.model.children;
  //   }
  //   let pos = children.indexOf(node.model);
  //   children.splice(pos, 1);
  // }

  moveNode(node: TreeNode, target: TreeNode | TreeView, sibling: TreeNode) {
    console.log('moveNode', node, target, sibling);

    if (target instanceof TreeNode) {
      // target.model.children.push(node.model);
      target.insertChild(node, sibling);
      let parent = node.element.parentNode;
      while (parent !== null && parent.tagName !== 'TREE-NODE') {
        parent = parent.parentNode;
      }
      if (parent === null) {
        parent = this;
        parent.removeNode(node);
      } else {
        parent.au['tree-node'].viewModel.removeChild(node.model);
      }
    }
  }

  removeNode(node: TreeNode) {
    console.warn('removeNode not implemented');
  }
}
