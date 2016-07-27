import {bindable} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {getLogger} from 'aurelia-logging';
import {bindingMode} from 'aurelia-binding';
import {NodeModel} from './node-model';
import {TreeNode} from './tree-node';
import {fireEvent} from '../common/events';

@inject(Element)
export class TreeView {
  @bindable() expandOnFocus: boolean = false;
  @bindable() nodes: NodeModel[];
  @bindable() multiSelect: boolean = false;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) focused: NodeModel = null;
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected: NodeModel[] = [];
  subscriptions = [];

  // comparers
  @bindable() compareEquality = null;

  bind() {
    this.multiSelect = (this.multiSelect === true || this.multiSelect === 'true');
  }

  constructor(element) {
    this.element = element;
    this.log = getLogger('tree-view');
    this.compareEquality = (args) => { return args.a === args.b; };

    let templateElement = this.element.querySelector('tree-node-template');
    if (templateElement) {
      this.templateElement = templateElement;
    } else {
      // this.log.warn('ctor - no template element');
    }
  }

  attached() { }

  detached() { }

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
    if (newValue) {
      // && this.templateElement
      this.enhanceNodes(newValue);
      this.preselectNodes(newValue);
    }
  }

  enhanceNodes(nodes: NodeModel[]) {
    nodes.forEach(node => {
      if (node.children && typeof node.children !== 'function') {
        this.enhanceNodes(node.children);
      }
      if (this.templateElement) {
        node._template = this.templateElement.au.controller.viewModel.template;
      }
      // node._tree = this;
      node._tree = {
        focusNode: this.focusNode.bind(this),
        selectNode: this.selectNode.bind(this),
        deselectNode: this.deselectNode.bind(this),
        multiSelect: this.multiSelect
      };
    });
  }

  preselectNodes(nodes: NodeModel[]) {
    nodes.forEach(node => {
      if (this.selected.find(n => this.compareEquality({a: node, b: n}))) {
        node.selected = true;
        node.expandNode().then(() => {
          this.preselectNodes(node.children);
        });
      }
    });
  }

  _suspendUpdate = false;
  focusNode(node: NodeModel) {
    if (!this._suspendUpdate && node !== this.focused) {
      if (this.focused) {
        this._suspendUpdate = true;
        this.focused.focused = false;
        this._suspendUpdate = false;
      }
      this.focused = node;
      fireEvent(this.element, 'focused', { node });
      if (this.expandOnFocus) {
        node.expandNode();
      }
      if (!this.multiSelect) {
        this.selected.splice(0);
        this.selectNode(node);
      }
    }
  }

  selectNode(node: NodeModel) {
    let existing = this.selected.findIndex(n => this.compareEquality({a: node, b: n}));
      if (existing === -1) {
      this.log.debug('selecting node', node);
      this.selected.push(node);
      fireEvent(this.element, 'selection-changed', { nodes: this.selected });
    }
  }

  deselectNode(node: NodeModel) {
    this.log.debug('deselecting node', node);
    // let index = this.selected.indexOf(node);
    let index = this.selected.findIndex(n => this.compareEquality({a: node, b: n}));
    if (index === -1) {
      this.log.error('node not found in selected', node);
    } else {
      this.selected.splice(index, 1);
      fireEvent(this.element, 'selection-changed', { nodes: this.selected });
    }
  }

  expandOnFocusChanged(newValue) {
    this.expandOnFocus = (newValue === true || newValue === 'true');
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
    this.log.debug('moveNode', node, target, sibling);

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
