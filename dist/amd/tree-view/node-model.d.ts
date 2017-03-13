import { Logger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { DataSourceApi } from './data-source';
import { TreeNode } from './tree-node';
export declare class NodeModel {
    children: NodeModel[] | null;
    childrenGetter: (() => Promise<any[]>) | null;
    dataSourceApi: DataSourceApi;
    element: TreeNode;
    isExpanded: boolean;
    isFocused: boolean;
    isLoading: boolean;
    isSelected: boolean;
    isVisible: boolean;
    log: Logger;
    parent: NodeModel | null;
    payload: any;
    taskQueue: TaskQueue;
    private suspendEvents;
    constructor(parent?: NodeModel | null, children?: NodeModel[] | null, childrenGetter?: (() => Promise<any[]>), payload?: any);
    readonly hasChildren: boolean;
    collapse(force?: boolean): Promise<void>;
    expand(force?: boolean): Promise<void>;
    isSelectedChanged(newValue: boolean): void;
}
