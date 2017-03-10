import {observable, Disposable} from 'aurelia-binding';
import {getLogger, Logger} from 'aurelia-logging';
import {TaskQueue} from 'aurelia-task-queue';
// import {deepEqual} from '../common/deep-equal';
import {NodeModel} from './node-model';
import {TreeViewSettings} from './settings';

export interface DataSourceApi {
    deselectNode(node: NodeModel, deselectChildren?: boolean, recurse?: boolean): Promise<void>;
    expandNodeAndChildren(node: NodeModel): Promise<void>;
    focusNode(node: NodeModel): void;
    selectNode(node: NodeModel, selectChildren?: boolean, recurse?: boolean): Promise<void>;
    settings: TreeViewSettings;
}

class DataSourceApiImplementation implements DataSourceApi {
    settings: TreeViewSettings;

    constructor(private dataSource: DataSource) {
        this.settings = this.dataSource.settings;
    }

    deselectNode(node: NodeModel, deselectChildren?: boolean, recurse?: boolean): Promise<void> {
        return this.dataSource.deselectNode(node, deselectChildren, recurse);
    };

    expandNodeAndChildren(node: NodeModel): Promise<void> {
        return this.dataSource.expandNodeAndChildren(node);
    }

    focusNode(node: NodeModel): void {
        this.dataSource.focusNode(node);
    }

    selectNode(node: NodeModel, selectChildren?: boolean, recurse?: boolean): Promise<void> {
        return this.dataSource.selectNode(node, selectChildren, recurse);
    }
}

export class DataSource {
    api: DataSourceApi;
    flatNodes: NodeModel[];
    focusedNode: NodeModel | null;
    log: Logger;
    nodes: NodeModel[];
    selectedNodes: NodeModel[];
    subscriptions: Set<(event: string, nodes: NodeModel[]) => void>;

    @observable() settings: TreeViewSettings;

    private suspendSettingsObservable = false;

    constructor(private taskQueue: TaskQueue) {
        this.suspendSettingsObservable = true;
        this.flatNodes = [];
        this.focusedNode = null;
        this.log = getLogger('aurelia-tree-view/data-source');
        this.selectedNodes = [];
        this.settings = {
            compareEquality: (args) => { return args.a === args.b; },
            expandOnFocus: false,
            processChildrenKey: 'shift',
            processChildrenRecursiveKey: 'alt',
            multiSelect: false,
            templateInfo: null
        };
        this.api = new DataSourceApiImplementation(this);
        this.subscriptions = new Set<(event: string, nodes: NodeModel[]) => void>();
        this.suspendSettingsObservable = false;
    }

    private addToFlatNodes(node: NodeModel) {
        if (!this.flatNodes.find(n => this.settings.compareEquality({ a: n.payload, b: node.payload || node}))) {
            this.log.debug('(after compareEquality) adding to flat nodes', node.payload);
            this.flatNodes.push(node);
        }
    }

    private notifySubscribers(event: string, nodes: NodeModel[]) {
        this.subscriptions.forEach(sub => sub(event, nodes));
    }

    private setNodeSelection(node: NodeModel, isSelected: boolean, setChildren: boolean = false, recurse: boolean = false): Promise<void> {
        if (typeof node === 'undefined') {
            return Promise.reject('node is undefined');
        }

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
            this.log.debug('setNodeSelection got node', n.payload.title, n.payload);

            if (isSelected) {
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
            } else {
                if (this.settings.multiSelect) {
                    const index = this.selectedNodes.indexOf(node);
                    this.selectedNodes.splice(index, 1);
                } else {
                    this.selectedNodes = [];
                }
            }

            if (!this.settings.multiSelect) {
                // FIXME: correctly, this would be "if this select came from a mouse event"
                // n.suspendEvents = true;
            }
            n.isSelected = isSelected;
            if (!this.settings.multiSelect) {
                // n.suspendEvents = false;
                n.isFocused = true;
            }

            if (expandPath && node.parent) {
                const path = this.getPath(node);
                this.expandPath(path);
            }
            if (setChildren && node.hasChildren && node.children) {
                return this.expandNodeAndChildren(node).then(() => {
                    return node.children ? Promise.all(node.children.map(child => this.setNodeSelection(child, isSelected, recurse, recurse))).then(() => { }) : Promise.resolve();
                });
            }
            this.notifySubscribers('selectionChanged', this.selectedNodes);
            return Promise.resolve();
        });
    }

    private validateNode(node: any): boolean {
        if (!node.title) {
            throw new Error('node must have a "title" property');
        }
        return true;
    }

    private visitNode(item: any, parent: NodeModel | null): NodeModel {
        if (this.validateNode(item)) {
            let node: NodeModel;
            const nodeFound: NodeModel | undefined = this.find(item);
            if (nodeFound) {
                node = nodeFound;
            } else {
                this.log.debug('creating new item', item.title);
                node = new NodeModel(parent);
                node.dataSourceApi = this.api;
                node.payload = item;
                node.taskQueue = this.taskQueue;

                if (typeof item.children === 'function') {
                    const ch: () => Promise<any[]> = item.children;
                    node.childrenGetter = () => {
                        return new Promise(resolve => {
                            ch().then(children => {
                                const nodes = children.map(child => this.visitNode(child, node));
                                node.children = nodes;
                                resolve(nodes);
                                this.log.debug('childrenGetter resolved', children, nodes);
                            });
                        });
                    }
                } else {
                    if (item.children && item.children.length > 0) {
                        const ch: any[] = item.children;
                        node.children = ch.map(child => this.visitNode(child, node));
                    }
                }
                this.addToFlatNodes(node);
            }
            return node;
        } else {
            throw new Error('invalid node');
        }
    }

    deselectNode(node: NodeModel, deselectChildren: boolean = false, recurse: boolean = false): Promise<void> {
        return this.setNodeSelection(node, false, deselectChildren, recurse);
    }

    expandAllNodes(): Promise<void> {
        return Promise.all(this.nodes.map(node => this.expandNodeAndChildren(node))).then(() => {});
    }

    expandNode(node: NodeModel): Promise<void> {
        return node.expand();
    }

    expandNodeAndChildren(node: NodeModel): Promise<void> {
        return Promise.resolve().then(() => {
            if (node.hasChildren) {
                return node.expand().then(() => {
                    if (node.children) {
                        return Promise.all(node.children.map(child => {
                            return this.expandNodeAndChildren(child);
                        })).then(() => {});
                    } else {
                        throw new Error('node has no children (=== null) after expand');
                    }
                });
            }
            return Promise.resolve();
        });
    }

    expandPath(path: NodeModel[]) {
        return Promise.resolve().then(() => {
            path.forEach(p => {
                p.expand();
            });
        });
    }

    filter(visitor: (node: NodeModel, i?: number) => boolean): Promise<NodeModel[]> {
        return this.expandAllNodes()
        .then(() => {
            return Promise.all(this.flatNodes.filter((node, i) => visitor(node, i)));
        });
    }

    find(item: any) {
        if (this.settings.compareEquality) {
            return this.flatNodes.find(node => this.settings.compareEquality({ a: node.payload, b: item }));
        } else {
            throw new Error('no equality comparer set');
        }
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

        if (this.settings.expandOnFocus) {
            node.expand();
        }
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
                    return (found as NodeModel).expand().then(() => found)
                    .then(() => {
                        this.log.debug('expanded', found.payload.title);
                        return found;
                    });
                } else {
                    return Promise.reject('node not found: ' + n.title);
                }
            });
        };
        return visit(node);
    }

    selectNode(node: NodeModel, selectChildren: boolean = false, recurse: boolean = false): Promise<void> {
        return this.setNodeSelection(node, true, selectChildren, recurse);
    }

    selectNodes(nodes: NodeModel[]): Promise<void> {
        const mutableNodes = [...nodes];
        const rest = mutableNodes.splice(0, 1);
        return rest.length > 0
            ? this.selectNode(rest[0]).then(() => { this.selectNodes(mutableNodes); })
            : Promise.resolve();

    }

    settingsChanged(newValue: TreeViewSettings) {
        if (!this.suspendSettingsObservable) {
            this.log.debug('new settings:', newValue);
            this.api.settings = newValue;
        }
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
