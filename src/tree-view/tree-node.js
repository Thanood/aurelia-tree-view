import {bindable, ViewCompiler, ViewResources, ViewSlot} from 'aurelia-templating';
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

  insertChild(child: NodeModel, before: NodeModel) {
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
    this.model.children.push(child);
  }

  useTemplate() {
    let template = this.model._template;
    let viewFactory = this.viewCompiler.compile(`<template>${template}</template>`, this.viewResources);
    let view = viewFactory.create(this.container);
    let viewSlot = new ViewSlot(this.templateTarget, true);
    viewSlot.add(view);
    viewSlot.bind(this);
    viewSlot.attached();
  }

  modelChanged(newValue) {
    // this.log.debug('modelChanged', newValue, this.templateTarget);
    if (newValue && newValue._template && this.templateTarget) {
      this.useTemplate();
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

  focusNode() {
    this.model.focusNode();
    fireEvent(this.element, 'focused', { node: this.model });
  }
  selectNode(e) {
    this.log.debug('multi-select', this.model.selected, e);
    // this.model.multiSelectNode();
    let self = this;
    this.taskQueue.queueTask(() => {
      fireEvent(self.element, 'selected', { node: self.model });
    });
    // fireEvent(this.element, 'selected', { node: this.model });
    // this.selectNode();

    // permit bubbles
    return true;
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
