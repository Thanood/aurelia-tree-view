import {observable, Disposable} from 'aurelia-binding';
import {getLogger, Logger} from 'aurelia-logging';
// import {deepEqual} from '../common/deep-equal';
import {NodeModel} from './node-model';
import {TreeViewSettings} from './settings';

export interface DataSourceApi {
    deselectNode(node: NodeModel): void;
    focusNode(node: NodeModel): void;
    selectNode(node: NodeModel): void;
    settings: TreeViewSettings | null;
}

export class DataSource {
    api: DataSourceApi = {
        deselectNode: this.deselectNode.bind(this),
        focusNode: this.focusNode.bind(this),
        selectNode: this.selectNode.bind(this),
        settings: null
    };
    flatNodes: NodeModel[];
    focusedNode: NodeModel | null;
    log: Logger;
    nodes: NodeModel[];
    selectedNodes: NodeModel[];
    subscriptions: Set<(event: string, nodes: NodeModel[]) => void>;

    @observable() settings: TreeViewSettings;

    constructor() {
        this.flatNodes = [];
        this.focusedNode = null;
        this.log = getLogger('aurelia-tree-view/data-source');
        this.selectedNodes = [];
        this.settings = {
            compareEquality: (args) => { return args.a === args.b; },
            multiSelect: false
        };
        this.subscriptions = new Set<(event: string, nodes: NodeModel[]) => void>();
    }

    private addToFlatNodes(node: NodeModel) {
        // TODO: replace deepEqual with something faster, possibly from treeView.compareEquality
        // if (!this.flatNodes.find(n => deepEqual(n.payload, node.payload))) {
        //     this.flatNodes.push(node);
        // }
        if (!this.flatNodes.find(n => this.settings.compareEquality({ a: n, b: node.payload}))) 7
        this.flatNodes.push(node);
    }

    private notifySubscribers(event: string, nodes: NodeModel[]) {
        this.subscriptions.forEach(sub => sub(event, nodes));
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

    deselectNode(node: NodeModel) {
        node.isSelected = false;
        if (this.settings.multiSelect) {
            const index = this.selectedNodes.indexOf(node);
            this.selectedNodes.splice(index, 1);
        } else {
            this.selectedNodes = [];
        }
        this.notifySubscribers('selectionChanged', this.selectedNodes);
    }

    expandPath(path: NodeModel[]) {
        return Promise.resolve().then(() => {
            path.forEach(p => {
                p.expand();
            });
        });
    }

    find(item: any) {
        if (this.settings.compareEquality) {
            return this.flatNodes.find(node => this.settings.compareEquality({ a: node.payload, b: item }));
        } else {
            throw new Error('no equality comparer set');
        }
        // return this.flatNodes.find(node => deepEqual(node.payload, item));
    }

    findRoot(node: NodeModel): NodeModel {
        const visit = (n: NodeModel): NodeModel => {
            if (n.parent) {
                return visit(n.parent);
            }
            return n;
        };

        return visit(node);
    }

    focusNode(node: NodeModel) {
        this.flatNodes.forEach(node => node.isFocused = false);
        node.isFocused = true;
        this.focusedNode = node;

        if (!this.settings.multiSelect) {
            this.api.selectNode(node);
        }
    }

    getPath(node: NodeModel): NodeModel[] {
        let path: NodeModel[] = [];
        const visit = (n: NodeModel) => {
            if (n.parent) {
                visit(n.parent);
            }
            path.push(n);
        };
        visit(node);
        return path;
    }

    load(source: any[]) {
        this.nodes = source.map(item => this.visitNode(item, null));
        this.notifySubscribers('loaded', this.nodes);
    }

    openPathTo(node: any): Promise<NodeModel> {
        this.log.debug('opening path to', node.title, node);
        const visit = (n: any): Promise<NodeModel> => {
            let promise: Promise<any>;
            if (n.parent) {
                this.log.debug('before visit recursion', n.parent.title, n.parent);
                promise = visit(n.parent);
            } else {
                promise = Promise.resolve();
            }
            return promise.then(() => {
                this.log.debug('after visit recursion', n.title, n);
                const found = this.find(n);
                if (found) {
                    this.log.debug('expanding', found.payload.title, found);
                    return (found as NodeModel).expand().then(() => found);
                } else {
                    return Promise.reject('node not found: ' + n.title);
                }
            });
        };
        return visit(node);
    }

    selectNode(node: NodeModel) {
        // this.flatNodes.forEach(node => node.isSelected = false);
        let expandPath = false;
        let promise: Promise<NodeModel>;
        if (node instanceof NodeModel) {
            expandPath = true;
            promise = Promise.resolve(node);
        } else {
            const found = this.find(node);
            if (found) {
                node = found;
                expandPath = true;
                promise = Promise.resolve(node);
            } else {
                promise = this.openPathTo(node);
            }
        }
        return promise.then(n => {
            this.log.debug('selectNode got node', n.payload.title, n.payload);
            if (this.settings.multiSelect) {
                this.selectedNodes.push(n);
            } else {
                this.selectedNodes = [n];
                this.flatNodes.forEach(node => {
                    if (node !== n) {
                        node.isSelected = false;
                    }
                });
            }
            n.suspendEvents = true;
            n.isSelected = true;
            n.suspendEvents = false;
            if (expandPath && node.parent) {
                const path = this.getPath(node);
                this.expandPath(path);
            }
            this.notifySubscribers('selectionChanged', this.selectedNodes);
        });
    }

    selectNodes(nodes: NodeModel[]): Promise<void> {
        const rest = nodes.splice(0, 1);
        if (rest.length > 0) {
            return this.selectNodes(nodes).then(() => this.selectNode(rest[0]));
        } else {
            // return this.selectNode(rest[0]);
            return Promise.resolve();
        }
    }

    settingsChanged(newValue: TreeViewSettings) {
        this.log.debug('new settings:', newValue);
        this.api.settings = newValue;
    }

    subscribe(callback: (event: string, nodes: NodeModel[]) => void): Disposable {
        this.subscriptions.add(callback);

        return {
            dispose: () => {
                this.subscriptions.delete(callback);
            }
        }
    }
}
