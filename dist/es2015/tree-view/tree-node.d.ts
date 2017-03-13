import { Container } from 'aurelia-dependency-injection';
import { Logger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { ViewCompiler, ViewResources, ViewSlot } from 'aurelia-templating';
import { NodeModel } from './node-model';
export declare class TreeNode {
    private element;
    private viewCompiler;
    private viewResources;
    private container;
    private taskQueue;
    log: Logger;
    isSelected: boolean;
    templateTarget: Node;
    viewSlot: ViewSlot | null;
    model: NodeModel;
    constructor(element: Element, viewCompiler: ViewCompiler, viewResources: ViewResources, container: Container, taskQueue: TaskQueue);
    attached(): void;
    readonly hasTemplate: boolean;
    modelChanged(newValue: NodeModel): void;
    focus(e: Event, permitBubbles?: boolean): boolean;
    toggleExpanded(e: MouseEvent): Promise<void>;
    toggleSelected(e: MouseEvent, permitBubbles?: boolean): boolean;
    unbindTemplate(): void;
    updateTemplate(): void;
    useTemplate(): void;
}
