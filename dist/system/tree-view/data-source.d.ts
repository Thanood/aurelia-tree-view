import { Disposable } from 'aurelia-binding';
import { Logger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { NodeModel } from './node-model';
import { TreeViewSettings } from './settings';
export interface DataSourceApi {
    collapseNode(node: NodeModel): Promise<void>;
    deselectNode(node: NodeModel, deselectChildren?: boolean, recurse?: boolean): Promise<void>;
    expandNode(node: NodeModel): Promise<void>;
    expandNodeAndChildren(node: NodeModel): Promise<void>;
    focusNode(node: NodeModel): void;
    selectNode(node: NodeModel, selectChildren?: boolean, recurse?: boolean): Promise<void>;
    settings: TreeViewSettings;
}
export declare class DataSource {
    private taskQueue;
    api: DataSourceApi;
    flatNodes: NodeModel[];
    focusedNode: NodeModel | null;
    log: Logger;
    nodes: NodeModel[];
    selectedNodes: NodeModel[];
    subscriptions: Set<(event: string, nodes: NodeModel[]) => void>;
    settings: TreeViewSettings;
    private suspendSettingsObservable;
    constructor(taskQueue: TaskQueue);
    private addToFlatNodes(node);
    private notifySubscribers(event, nodes);
    private setNodeSelection(node, isSelected, setChildren?, recurse?);
    private validateNode(node);
    private visitNode(item, parent);
    collapseNode(node: NodeModel): Promise<void>;
    deselectNode(node: NodeModel, deselectChildren?: boolean, recurse?: boolean): Promise<void>;
    expandAllNodes(): Promise<void>;
    expandNode(node: NodeModel): Promise<void>;
    expandNodeAndChildren(node: NodeModel): Promise<void>;
    expandPath(path: NodeModel[]): Promise<void>;
    filter(visitor: (node: NodeModel, i?: number) => boolean): Promise<NodeModel[]>;
    find(item: any): NodeModel | undefined;
    findRoot(node: NodeModel): NodeModel;
    focusNode(node: NodeModel): void;
    getPath(node: NodeModel): NodeModel[];
    load(source: any[]): void;
    openPathTo(node: any): Promise<NodeModel>;
    selectNode(node: NodeModel, selectChildren?: boolean, recurse?: boolean): Promise<void>;
    selectNodes(nodes: NodeModel[]): Promise<void>;
    settingsChanged(newValue: TreeViewSettings): void;
    subscribe(callback: (event: string, nodes: NodeModel[]) => void): Disposable;
}
