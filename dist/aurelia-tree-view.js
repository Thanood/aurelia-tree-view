import {customElement,bindable,noView,processContent,TargetInstruction,ViewCompiler,ViewResources,ViewSlot} from 'aurelia-templating';
import {Aurelia} from 'aurelia-framework';
import {computedFrom,observable,createOverrideContext,bindingMode} from 'aurelia-binding';
import {getLogger} from 'aurelia-logging';
import {inject,Container} from 'aurelia-dependency-injection';
import {TaskQueue} from 'aurelia-task-queue';

@customElement(`${constants.elementPrefix}click-counter`)
export class ClickCounter {
  count = 0;

  increment() {
    this.count++;
  }
}

/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [];

  useAll() : ConfigBuilder {
    return this.useClickCounter();
  }

  useClickCounter(): ConfigBuilder {
    this.globalResources.push('./tree-view/tree-view');
    this.globalResources.push('./tree-view/tree-node-template');
    return this;
  }
}

export function configure(aurelia: Aurelia, configCallback?: (builder: ConfigBuilder) => void) {
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}



export const constants = {
  bindablePrefix: 'au-',
  attributePrefix: 'au-',
  elementPrefix: 'au-',
  eventPrefix: 'tree-view-'
};

/**
* Fire DOM event on an element
* @param element The Element which the DOM event will be fired on
* @param name The Event's name
* @param data Addition data to attach to an event
*/
export function fireEvent(element: Element, name: string, data? = {}) {
  let event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

/**
* Fire DOM event on an element with the md-on prefix
* @param element The Element which the DOM event will be fired on
* @param name The Event's name, without md-on prefix
* @param data Addition data to attach to an event
*/
export function fireTreeViewEvent(element: Element, name: string, data? = {}) {
  return fireEvent(element, `${constants.eventPrefix}${name}`, data);
}

const log = getLogger('node-model');

export class NodeModel {
  title = '';
  payload = null;
  children: NodeModel[];
  childrenGetter: {():Promise<NodeModel[]>};
  visible = true;
  expanded = false;
  @observable() focused = false;
  @observable() selected = false;
  loading = false;
  _template = null;
  _templateModel = null;
  _tree = null;

  static createFromJSON(nodes: any[]) {
    let models = [];
    nodes.forEach(node => {
      let children = node.children;
      if (typeof children === 'function') {
        // create promise wrapper so children are of type NodeModel
        children = () => {
          return new Promise((resolve, reject) => {
            node.children().then(ch => {
              resolve(NodeModel.createFromJSON(ch));
            });
          });
        };
      } else {
        children = node.children ? NodeModel.createFromJSON(node.children) : null;
      }
      let payload = node.payload;
      if (!payload) {
        payload = {};
        let keys = Object.keys(node);
        keys.forEach(key => {
          switch (key) {
            case 'children':
            case 'title':
              break;
            default:
              payload[key] = node[key];
              break;
          }
        });
      }
      models.push(new NodeModel(node.title, children, payload));
    });
    return models;
  }

  constructor(title: string, children?: NodeModel[] | {():Promise<NodeModel[]>}, payload?: any) {
    this.title = title;
    this.payload = payload;
    if (typeof children === 'function') {
      this.childrenGetter = children;
    } else {
      this.children = children || [];
    }
    if (this.hasChildren) {
      this.collapseNode(true);
    }
  }

  @computedFrom('children')
  get hasChildren() {
    let result = false;
    if (this.children) {
      result = this.children.length > 0;
    } else {
      result = true;
    }
    return result;
  }

  expandNode(force = false) {
    if (!this.expanded || force) {
      let promise: Promise<NodeModel[]>;
      if (this.childrenGetter) {
        this.loading = true;
        promise = this.childrenGetter().then(children => {
          children.forEach(child => {
            if (this._template) {
              child._template = this._template;
            }
            child._tree = this._tree;
          });
          this.children = children;
        });
      } else {
        promise = Promise.resolve();
      }
      return promise.then(() => {
        this.loading = false;
        this.children.forEach(child => {
          child.visible = true;
        });
        this.expanded = true;
      });
    }
  }

  collapseNode(force = false) {
    if (this.children && (this.expanded || force)) {
      this.children.forEach(child => {
        child.visible = false;
      });
      this.expanded = false;
    }
    return Promise.resolve();
  }

  focusedChanged(newValue) {
    this._tree.focusNode(this);
  }

  toggleFocus() {
    this.focused = !this.focused;
  }

  selectedChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue) {
        this._tree.selectNode(this);
      } else if (newValue === false) {
        this._tree.deselectNode(this);
      }
    }
  }

  selectChildren(recursive = false) {
    let promise;
    if (this.expanded) {
      promise = Promise.resolve();
    } else {
      promise = this.expandNode();
    }
    return promise.then(() => {
      let childPromises = [];
      this.children.forEach(child => {
        child.selected = true;
        if (recursive) {
          log.debug('selecting children recursively', this);
          childPromises.push(child.selectChildren(recursive));
        }
      });
      return Promise.all(childPromises);
    });
  }

  deselectChildren(recursive = false) {
    let promise;
    if (this.expanded) {
      promise = Promise.resolve();
    } else {
      promise = this.expandNode();
    }
    return promise.then(() => {
      let childPromises = [];
      this.children.forEach(child => {
        child.selected = false;
        if (recursive) {
          childPromises.push(child.deselectChildren(recursive));
        }
      });
      return Promise.all(childPromises);
    });
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}

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
    // this.log.debug(targetInstruction);
  }
}

@inject(Element, ViewCompiler, ViewResources, Container, TaskQueue)
export class TreeNode {
  @bindable() model: NodeModel = null;

  constructor(element: Element, viewCompiler: ViewCompiler, viewResources: ViewResources, container: Container, taskQueue: TaskQueue) {
    this.element = element;
    this.viewCompiler = viewCompiler;
    this.viewResources = viewResources;
    this.container = container;
    this.taskQueue = taskQueue;
    this.log = getLogger('tree-node');
  }

  attached() {
    if (this.model && this.model._template && this.templateTarget) {
      this.useTemplate();
    }
  }

  detached() {
    if (this.viewSlot) {
      this.unbindTemplate();
    }
  }

  insertChild(child: NodeModel, before: NodeModel) {
    let posChild = this.model.children.indexOf(child);
    if (posChild > -1) {
      let posBefore = this.model.children.indexOf(before);
      this.model.children.splice(posChild, 1);
      this.model.children.splice(posBefore, 0, child);
    } else {
      this.model.children.push(child);
    }
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
    // if (before) {
    //   let posBefore = this.model.children.indexOf(before);
    //   let posChild = this.model.children.indexOf(child);
    // } else {
    //   this.model.children.push(child);
    // }
  }

  useTemplate() {
    let template = this.model._template;
    let model = this.model._templateModel;
    let viewFactory = this.viewCompiler.compile(`<template>${template}</template>`, this.viewResources);
    let view = viewFactory.create(this.container);
    this.viewSlot = new ViewSlot(this.templateTarget, true);
    this.viewSlot.add(view);
    // this.log.debug('useTemplate, binding model', model);
    // this.viewSlot.bind(this, model);

    // this.viewSlot.bind(this, {
    //   bindingContext: this,
    //   parentOverrideContext: model
    // });

    this.viewSlot.bind(this, createOverrideContext(this, model));
    this.viewSlot.attached();
  }

  unbindTemplate() {
    // @vegarringdal said, switch detached and unbind
    this.viewSlot.detached();
    this.viewSlot.unbind();
    this.viewSlot.removeAll();
  }

  modelChanged(newValue) {
    // this.log.debug('modelChanged', newValue, this.templateTarget);
    if (newValue) {
      newValue._element = this;
      if (newValue._template && this.templateTarget) {
        this.useTemplate();
      }
    }
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

  focusNode(e, permitBubbles) {
    this.model.focused = true;
    return permitBubbles;
  }

  _toggleCalled = false;
  toggleSelected(e, permitBubbles) {
    if (e.ctrlKey) {
      // make sure this is not called twice for checkboxes with child elements (f.i. MDL, Materialize)
      if (!this._toggleCalled) {
        this._toggleCalled = true;
        let promise;
        let newValue = !this.model.selected;
        if (newValue) {
          promise = this.model.selectChildren(e.shiftKey);
        } else {
          promise = this.model.deselectChildren(e.shiftKey);
        }
        promise.then(() => {
          this._toggleCalled = false;
        })
      }
    }
    return permitBubbles || false;
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

@inject(Element)
export class TreeView {
  @bindable() expandOnFocus: boolean = false;
  @bindable() selectOnFocus: boolean = false;
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
    this.expandOnFocus = (this.expandOnFocus === true || this.expandOnFocus === 'true');
    this.multiSelect = (this.multiSelect === true || this.multiSelect === 'true');
    this.selectOnFocus = (this.selectOnFocus === true || this.selectOnFocus === 'true');
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
        node._templateModel = this.templateElement.au.controller.viewModel.model;
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

  _suspendEvents = false;
  _suspendUpdate = false;
  focusNode(node: NodeModel, modifiers = {}) {
    if (!this._suspendUpdate) {
      if (node !== this.focused) {
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
          this._suspendEvents = true;
          this.selected.forEach(node => node.selected = false);
          this._suspendEvents = false;
          // this.selected.splice(0);
          // this.selectNode(node);
          node.selected = true;
        }
      }
      if (this.selectOnFocus) {
        node.selected = !node.selected;
        if (modifiers['ctrl']) {
          let recurse = !!modifiers['shift'];
          node.selectChildren(recurse);
        }
      }
    }
  }

  selectNode(node: NodeModel) {
    let existing = this.selected.findIndex(n => this.compareEquality({a: node, b: n}));
    if (existing === -1) {
      this.log.debug('selecting node', node);
      if (!this.multiSelect) {
        this._suspendEvents = true;
        this.selected.forEach(n => n.selected = false);
        this._suspendEvents = false;
      }
      this.selected.push(node);
      if (!this._suspendEvents) {
        fireEvent(this.element, 'selection-changed', { nodes: this.selected });
      }
    }
  }

  deselectNode(node: NodeModel) {
    let index = this.selected.findIndex(n => this.compareEquality({a: node, b: n}));
    if (index === -1) {
      this.log.error('node not found in selected', node);
    } else {
      this.log.debug('deselecting node', node);
      this.selected.splice(index, 1);
      if (!this._suspendEvents) {
        fireEvent(this.element, 'selection-changed', { nodes: this.selected });
      }
    }
  }

  expandOnFocusChanged(newValue) {
    this.expandOnFocus = (newValue === true || newValue === 'true');
  }

  clearSelection() {
    this.selected.forEach(node => {
      node.selected = false;
    });
    if (this.focused) {
      this.focused.focused = false;
    }
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

  findParentNode(node: TreeNode): TreeNode {
    let parent = node.element.parentNode;
    let parentModel = null;
    while (parent !== null && parent.tagName.toUpperCase() !== 'TREE-NODE') {
      if (parent.tagName.toUpperCase() === 'TREE-VIEW') {
        parent = null;
      } else {
        parent = parent.parentNode;
      }
    }
    if (parent) {
      parentModel = parent.au['tree-node'].viewModel;
    }
    return parentModel;
  }

  moveNode(node: TreeNode, target: TreeNode | TreeView, sibling: TreeNode) {
    this.log.debug('moveNode', node, target, sibling);

    // if (sibling) { }
    if (target instanceof TreeNode) {
      target.insertChild(node.model, sibling ? sibling.model : null);
      let parent = this.findParentNode(node);
      if (parent === null) {
        parent = this;
        parent.removeNode(node);
      } else {
        parent.removeChild(node.model);
      }
    } else if (target instanceof TreeView) {
      let posNode = this.nodes.indexOf(node.model);
      let posSibling = sibling
        ? this.nodes.indexOf(sibling.model)
        : this.nodes.length - 1;
      if (posNode > -1 && posSibling > -1) {
        this.nodes.splice(posNode, 1);
        this.nodes.splice(posSibling, 0, node.model);
      } else if (posSibling > -1) {
        // move from node to TreeView
        let parent = this.findParentNode(node);
        // parent.removeNode(node);
        parent.removeChild(node.model);
        this.nodes.splice(posSibling, 0, node.model);
      } else {
        this.log.warn('sibling not found');
      }
    }
  }

  removeNode(node: TreeNode) {
    // console.warn('removeNode not implemented');
    let pos = this.nodes.indexOf(node.model);
    this.nodes.splice(pos, 1);
  }
}
