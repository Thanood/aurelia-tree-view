import {Disposable} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {getLogger, Logger} from 'aurelia-logging';
import {DOM} from 'aurelia-pal';
import {bindable} from 'aurelia-templating';
import {DataSource} from './data-source';
import {NodeModel} from './node-model';
// import {TreeViewSettings} from './settings';

interface TemplateInfo {
    template: string,
    viewModel: NodeModel
}

@inject(Element)
export class TreeView {
    dataSource: DataSource;
    private log: Logger;
    private nodes: NodeModel[];
    private subscriptions: Disposable[];
    private templateInfo: TemplateInfo;

    @bindable() compareEquality: ((args: { a: NodeModel, b: NodeModel }) => boolean);
    @bindable() multiSelect: boolean = false;

    constructor(private element: Element) {
        this.compareEquality = (args) => { return args.a === args.b; };
        this.log = getLogger('aurelia-tree-view');
        this.nodes = [];
        this.subscriptions = [];
        // this.templateElement = this.element.querySelector('tree-node-template');
    }

    bind() {
        this.multiSelect = ((this.multiSelect as any) === 'true' || this.multiSelect === true);
        if (!this.dataSource) {
            this.dataSource = new DataSource();
        }
        this.dataSource.settings.compareEquality = this.compareEquality;
        this.dataSource.settings.multiSelect = this.multiSelect;
        this.subscriptions.push(this.dataSource.subscribe(this.handleDataSource.bind(this)));
    }

    unbind() {
        this.subscriptions.forEach(sub => sub.dispose());
    }

    created() {
        const templateElement = this.element.querySelector('tree-node-template');
        if (templateElement) {
            const te = (templateElement as any);
            if (te.au) {
                const template = te.au.controller.viewModel.template;
                const viewModel = te.au.controller.viewModel.model;
                this.templateInfo = {
                    template,
                    viewModel
                }
                this.log.debug('template info', this.templateInfo);
            } else {
                this.log.warn('no viewModel found for template', templateElement);
            }
        }
    }

    handleDataSource(event: string, nodes: NodeModel[]) {
        this.log.debug('data source', event, nodes);
        switch (event) {
            case 'loaded':
                this.nodes = nodes;
                break;
            case 'selectionChanged':
                const event = DOM.createCustomEvent('selection-changed', { bubbles: true, detail: nodes });
                this.element.dispatchEvent(event);
                break;
        }
    }
}
