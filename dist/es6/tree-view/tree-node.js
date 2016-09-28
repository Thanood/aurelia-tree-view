import {bindable, ViewCompiler, ViewResources, ViewSlot} from 'aurelia-templating';
import {createOverrideContext} from 'aurelia-binding';
import {Container, inject} from 'aurelia-dependency-injection';
import {TaskQueue} from 'aurelia-task-queue';
import {getLogger} from 'aurelia-logging';
import {NodeModel} from './node-model';
import {fireEvent} from '../common/events';

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
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
    this.model.children.push(child);
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
