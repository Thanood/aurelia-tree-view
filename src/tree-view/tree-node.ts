import { computedFrom, createOverrideContext } from 'aurelia-binding';
import { inject, Container } from 'aurelia-dependency-injection';
import { getLogger, Logger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { bindable, ViewCompiler, ViewResources, ViewSlot } from 'aurelia-templating';
import { NodeModel } from './node-model';
import { TemplateInfo } from './template-info';

@inject(Element, ViewCompiler, ViewResources, Container, TaskQueue)
export class TreeNode {
  log: Logger;
  isSelected: boolean;
  templateTarget: Node;
  viewSlot: ViewSlot | null;

  @bindable() model: NodeModel;

  constructor(public element: Element, private viewCompiler: ViewCompiler, private viewResources: ViewResources, private container: Container, private taskQueue: TaskQueue) {
    this.isSelected = false;
    this.log = getLogger('aurelia-tree-view/tree-node');
    this.viewSlot = null;
  }

  attached() {
    this.updateTemplate();
  }

  @computedFrom('model.dataSourceApi.settings')
  get hasTemplate() {
    return !!(this.model.dataSourceApi.settings && this.model.dataSourceApi.settings.templateInfo);
  }

  modelChanged(newValue: NodeModel) {
    if (newValue) {
      newValue.element = this;
      if (newValue.children) {
        newValue.children.forEach(child => {
          child.isVisible = false;
        });
      }
    }
  }

  focus(e: Event, permitBubbles: boolean = false) {
    this.model.dataSourceApi.focusNode(this.model);
    return permitBubbles;
  }

  toggleExpanded(e: MouseEvent): Promise<void> {
    let promise: Promise<void>;
    if (this.model) {
      promise = new Promise(resolve => {
        this.taskQueue.queueTask(() => {
          let promises: Promise<void>[] = [];
          if (this.model.isExpanded) {
            promises.push(this.model.dataSourceApi.collapseNode(this.model));
          } else {
            promises.push(this.model.dataSourceApi.expandNode(this.model));
          }
          Promise.all(promises).then(() => {
            resolve();
          });
        });
      });
    } else {
      promise = Promise.reject(new Error('no tree-node model'));
    }
    return promise;
  }

  toggleSelected(e: MouseEvent, permitBubbles: boolean = false) {
    if (this.model) {
      this.taskQueue.queueTask(() => {
        const processChildren = (<any>e)[`${this.model.dataSourceApi.settings.processChildrenKey}Key`];
        const processChildrenRecursive = (<any>e)[`${this.model.dataSourceApi.settings.processChildrenRecursiveKey}Key`];
        if (this.isSelected) {
          this.model.dataSourceApi.selectNode(this.model, processChildren, processChildrenRecursive);
        } else {
          this.model.dataSourceApi.deselectNode(this.model, processChildren, processChildrenRecursive);
        }
      });
    }
    return permitBubbles;
  }

  unbindTemplate() {
    if (this.viewSlot) {
      // @vegarringdal said, switch detached and unbind
      this.viewSlot.detached();
      this.viewSlot.unbind();
      this.viewSlot.removeAll();
    }
  }

  updateTemplate() {
    this.unbindTemplate();
    this.useTemplate();
  }

  useTemplate() {
    if (this.hasTemplate) {
      if (this.model && this.model.dataSourceApi.settings && this.model.dataSourceApi.settings.templateInfo) {
        const templateInfo: TemplateInfo = this.model.dataSourceApi.settings.templateInfo;
        const viewFactory = this.viewCompiler.compile(`<template>${templateInfo.template}</template>`, this.viewResources);
        const view = viewFactory.create(this.container);
        this.viewSlot = new ViewSlot(this.templateTarget, true);
        this.viewSlot.add(view);
        this.viewSlot.bind(this, createOverrideContext(this, createOverrideContext(templateInfo.viewModel)));
        this.viewSlot.attached();
      } else {
        this.log.warn('hasTemplate is true but something was not set');
        this.log.warn('templateTarget', this.templateTarget);
        this.log.warn('settings', this.model.dataSourceApi.settings);
        this.log.warn('templateInfo', this.model.dataSourceApi.settings ? this.model.dataSourceApi.settings.templateInfo : 'null');
        this.log.warn('model', this.model);
      }
    }
  }
}
