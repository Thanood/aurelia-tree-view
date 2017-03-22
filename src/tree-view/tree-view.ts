import { Disposable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { getLogger, Logger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { DOM } from 'aurelia-pal';
import { bindable, child } from 'aurelia-templating';
import { DataSource } from './data-source';
import { NodeModel } from './node-model';
import { TemplateInfo } from './template-info';
import { TreeNodeTemplate } from './tree-node-template';

@inject(Element, TaskQueue)
export class TreeView {
  dataSource: DataSource;
  private log: Logger;
  private nodes: NodeModel[];
  private subscriptions: Disposable[];
  private templateInfo: TemplateInfo;

  @bindable() compareEquality: ((args: { a: NodeModel, b: NodeModel }) => boolean);
  @bindable() expandOnFocus: boolean = false;
  @bindable() multiSelect: boolean = false;
  @bindable() processChildrenKey = 'ctrl';
  @bindable() processChildrenRecursiveKey = 'alt';
  @child('tree-node-template') templateElement: TreeNodeTemplate;

  constructor(private element: Element, private taskQueue: TaskQueue) {
    this.compareEquality = (args) => { return args.a === args.b; };
    this.log = getLogger('aurelia-tree-view');
    this.nodes = [];
    this.subscriptions = [];
  }

  bind() {
    this.multiSelect = ((this.multiSelect as any) === 'true' || this.multiSelect === true);
    if (!this.dataSource) {
      this.dataSource = new DataSource(this.taskQueue);
    }
    // TODO: use a settings service or something similar
    this.dataSource.settings.compareEquality = this.compareEquality;
    this.dataSource.settings.expandOnFocus = this.expandOnFocus;
    this.dataSource.settings.multiSelect = this.multiSelect;
    this.dataSource.settings.processChildrenKey = this.processChildrenKey;
    this.dataSource.settings.processChildrenRecursiveKey = this.processChildrenRecursiveKey;
    this.subscriptions.push(this.dataSource.subscribe(this.handleDataSource.bind(this)));
  }

  unbind() {
    // this.log.debug('disposing subscriptions:', this.subscriptions.length);
    this.subscriptions.forEach(sub => sub.dispose());
  }

  attached() {
    // if (this.templateElement) {
    //   const template = this.templateElement.template;
    //   const viewModel = this.templateElement.model;
    //   this.templateInfo = {
    //     template,
    //     viewModel
    //   }
    //   this.dataSource.settings.templateInfo = this.templateInfo;
    //   this.log.debug('template element found - template info:', this.templateInfo);
    // } else {
    //   this.log.debug('no template element');
    // }
  }

  handleDataSource(event: string, nodes: NodeModel[]) {
    // this.taskQueue.queueTask(() => {
      this.log.debug('data source', event, nodes);
      switch (event) {
        case 'loaded':
          this.nodes = nodes;
          break;
        case 'selectionChanged':
          const event = DOM.createCustomEvent('selection-changed', { bubbles: true, detail: { nodes } });
          this.element.dispatchEvent(event);
          break;
      }
    // });
  }

  templateElementChanged(newValue: TreeNodeTemplate) {
    this.log.debug('templateElementChanged');
    const template = newValue.template;
    const viewModel = newValue.model;
    this.templateInfo = {
      template,
      viewModel
    }
    this.dataSource.settings.templateInfo = this.templateInfo;
    if (this.nodes.length) {
      const temp = this.nodes;
      this.nodes = [];
      this.taskQueue.queueTask(() => { this.nodes = temp; });
    }
  }
}
