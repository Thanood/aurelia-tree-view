import {computedFrom, createOverrideContext, observable} from 'aurelia-binding';
import {inject, Container} from 'aurelia-dependency-injection';
import {getLogger, Logger} from 'aurelia-logging';
import {DOM} from 'aurelia-pal';
import {bindable, ViewCompiler, ViewResources, ViewSlot} from 'aurelia-templating';
import {NodeModel} from './node-model';
import {TemplateInfo} from './data-source';

@inject(Element, ViewCompiler, ViewResources, Container)
export class TreeNode {
    log: Logger;
    templateTarget: Node;
    viewSlot: ViewSlot | null;

    @observable() isSelected: boolean;
    @bindable() model: NodeModel;

    constructor(private element: Element, private viewCompiler: ViewCompiler, private viewResources: ViewResources, private container: Container) {
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
            // this.updateTemplate();
            this.log.debug('model changed', newValue.payload.title);
        }
    }

    focus(e: Event, permitBubbles: boolean = false) {
        this.model.dataSourceApi.focusNode(this.model);
        return permitBubbles;
    }

    isSelectedChanged(newValue: boolean) {
        if (this.model) {
            if (newValue) {
                this.model.dataSourceApi.selectNode(this.model);
            } else {
                this.model.dataSourceApi.deselectNode(this.model);
            }
        }
    }

    toggleExpanded() {
        // TODO: only change this using a store
        let promise: Promise<void>;
        if (this.model.isExpanded) {
            promise = this.model.collapse().then(() => {
                const event = DOM.createCustomEvent('collapsed', { bubbles: true, detail: { node: this.model }});
                this.element.dispatchEvent(event);
            });
        } else {
            promise = this.model.expand().then(() => {
                const event = DOM.createCustomEvent('expanded', { bubbles: true, detail: { node: this.model }});
                this.element.dispatchEvent(event);
            });
        }
        return promise;
    }

    toggleSelected(e: MouseEvent, permitBubbles: boolean = false) {
        // TODO: only change this using a store
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
        this.log.debug('updating template', this.model.payload.title);
        this.unbindTemplate();
        this.useTemplate();
    }

    useTemplate() {
        this.log.debug('useTemplate called', this.model.payload.title);
        if (this.model && this.model.dataSourceApi.settings && this.model.dataSourceApi.settings.templateInfo) {
            const templateInfo: TemplateInfo = this.model.dataSourceApi.settings.templateInfo;
            const viewFactory = this.viewCompiler.compile(`<template>${templateInfo.template}</template>`, this.viewResources);
            const view = viewFactory.create(this.container);
            this.viewSlot = new ViewSlot(this.templateTarget, true);
            this.viewSlot.add(view);
            this.viewSlot.bind(this, createOverrideContext(this, createOverrideContext(templateInfo.viewModel)));
            this.viewSlot.attached();
        } else {
            this.log.warn('something was not set');
            this.log.warn('templateTarget', this.templateTarget);
            this.log.warn('settings', this.model.dataSourceApi.settings);
            this.log.warn('templateInfo', this.model.dataSourceApi.settings ? this.model.dataSourceApi.settings.templateInfo : 'null');
            this.log.warn('model', this.model);
        }
    }
}
