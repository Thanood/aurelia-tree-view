import {Disposable} from 'aurelia-binding';
import {getLogger, Logger} from 'aurelia-logging';
import {deepEqual} from '../common/deep-equal';
import {NodeModel} from './node-model';
import {TreeViewSettings} from './settings';

export interface DataSourceApi {
    focusNode(node: NodeModel): void;
    selectNode(node: NodeModel): void;
}

export class DataSource {
    api: DataSourceApi = {
        focusNode: (node: NodeModel) => {
            this.flatNodes.forEach(node => node.isFocused = false);
            node.isFocused = true;
            this.focusedNode = node;

            if (!this.settings.multiSelect) {
                this.api.selectNode(node);
            }
        },
        selectNode: (node: NodeModel) => {
            this.flatNodes.forEach(node => node.isSelected = false);
            node.isSelected = true;
            if (this.settings.multiSelect) {
                this.selectedNodes.push(node);
            } else {
                this.selectedNodes = [node];
            }
        }
    };
    flatNodes: NodeModel[];
    focusedNode: NodeModel | null;
    log: Logger;
    nodes: NodeModel[];
    selectedNodes: NodeModel[];
    settings: TreeViewSettings;
    subscriptions: Set<(nodes: NodeModel[]) => void>;

    constructor() {
        this.flatNodes = [];
        this.focusedNode = null;
        this.log = getLogger('aurelia-tree-view/data-source');
        this.selectedNodes = [];
        this.settings = {};
        this.subscriptions = new Set<(nodes: NodeModel[]) => void>();
    }

    private addToFlatNodes(node: NodeModel) {
        // TODO: replace deepEqual with something faster, possibly from treeView.compareEquality
        if (!this.flatNodes.find(n => deepEqual(n.payload, node.payload))) {
            this.flatNodes.push(node);
        }
    }

    private notifySubscribers(nodes: NodeModel[]) {
        this.subscriptions.forEach(sub => sub(nodes));
    }

    private validateNode(node: any): boolean {
        if (!node.title) {
            throw new Error('node must have a "title" property');
        }
        return true;
    }

    private visitNode(item: any, parent: NodeModel | null): NodeModel {
        if (this.validateNode(item)) {
            let node: NodeModel = new NodeModel(parent);
            node.dataSourceApi = this.api;
            node.payload = item;

            if (typeof item.children === 'function') {
                const ch: () => Promise<any[]> = item.children;
                node.childrenGetter = () => {
                    return new Promise(resolve => {
                        ch().then(children => {
                            const nodes = children.map(child => this.visitNode(child, node));
                            node.children = nodes;
                            resolve(nodes);
                        });
                    });
                }
            } else {
                if (item.children && item.children.length > 0) {
                    const ch: any[] = item.children;
                    node.children = ch.map(child => this.visitNode(child, node));
                }
            }
            // this.flatNodes.push(node);
            this.addToFlatNodes(node);
            return node;
        } else {
            throw new Error('invalid node');
        }
    }

    load(source: any[]) {
        this.nodes = source.map(item => this.visitNode(item, null));
        this.notifySubscribers(this.nodes);
    }

    subscribe(callback: (nodes: NodeModel[]) => void): Disposable {
        this.subscriptions.add(callback);

        return {
            dispose: () => {
                this.subscriptions.delete(callback);
            }
        }
    }
}
