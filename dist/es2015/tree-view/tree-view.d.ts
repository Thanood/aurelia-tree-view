import { TaskQueue } from 'aurelia-task-queue';
import { DataSource } from './data-source';
import { NodeModel } from './node-model';
import { TreeNodeTemplate } from './tree-node-template';
export declare class TreeView {
    private element;
    private taskQueue;
    dataSource: DataSource;
    private log;
    private nodes;
    private subscriptions;
    private templateInfo;
    compareEquality: ((args: {
        a: NodeModel;
        b: NodeModel;
    }) => boolean);
    expandOnFocus: boolean;
    multiSelect: boolean;
    processChildrenKey: string;
    processChildrenRecursiveKey: string;
    templateElement: TreeNodeTemplate;
    constructor(element: Element, taskQueue: TaskQueue);
    bind(): void;
    unbind(): void;
    attached(): void;
    handleDataSource(event: string, nodes: NodeModel[]): void;
}
