import {observable} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {getLogger, Logger} from 'aurelia-logging';
import {DOM} from 'aurelia-pal';
import {bindable} from 'aurelia-templating';
import {NodeModel} from './node-model';

@inject(Element)
export class TreeNode {
    log: Logger;

    @observable() isSelected: boolean;
    @bindable() model: NodeModel;

    constructor(private element: Element) {
        this.isSelected = false;
        this.log = getLogger('aurelia-tree-view/tree-node');
    }

    // attached() {
    //     this.log.debug('attached', this.model);
    // }

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
}
