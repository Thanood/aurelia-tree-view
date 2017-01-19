declare module 'aurelia-tree-view' {
  import {
    customElement,
    bindable,
    noView,
    processContent,
    TargetInstruction,
    ViewCompiler,
    ViewResources,
    ViewSlot
  } from 'aurelia-templating';
  import {
    Aurelia
  } from 'aurelia-framework';
  import {
    computedFrom,
    observable,
    createOverrideContext,
    bindingMode
  } from 'aurelia-binding';
  import {
    getLogger
  } from 'aurelia-logging';
  import {
    inject,
    Container
  } from 'aurelia-dependency-injection';
  import {
    TaskQueue
  } from 'aurelia-task-queue';
  export class ClickCounter {
    count: any;
    increment(): any;
  }
  
  /**
  * Plugin configuration builder
  */
  export class ConfigBuilder {
    globalResources: any;
    useAll(): ConfigBuilder;
    useClickCounter(): ConfigBuilder;
  }
  export function configure(aurelia: Aurelia, configCallback?: ((builder: ConfigBuilder) => void)): any;
  export const constants: any;
  
  /**
  * Fire DOM event on an element
  * @param element The Element which the DOM event will be fired on
  * @param name The Event's name
  * @param data Addition data to attach to an event
  */
  export function fireEvent(element: Element, name: string, data?: any): any;
  
  /**
  * Fire DOM event on an element with the md-on prefix
  * @param element The Element which the DOM event will be fired on
  * @param name The Event's name, without md-on prefix
  * @param data Addition data to attach to an event
  */
  export function fireTreeViewEvent(element: Element, name: string, data?: any): any;
  export class NodeModel {
    title: any;
    payload: any;
    children: NodeModel[];
    childrenGetter: {};
    visible: any;
    expanded: any;
    focused: any;
    selected: any;
    loading: any;
    static createFromJSON(nodes: any[]): any;
    constructor(title: string, children?: NodeModel[] | {}, payload?: any);
    hasChildren: any;
    expandNode(force?: any): any;
    collapseNode(force?: any): any;
    focusedChanged(newValue?: any): any;
    toggleFocus(): any;
    selectedChanged(newValue?: any, oldValue?: any): any;
    selectChildren(recursive?: any): any;
    deselectChildren(recursive?: any): any;
    toggleSelected(): any;
  }
  export class TreeNodeTemplate {
    model: any;
    log: any;
    constructor(targetInstruction?: any);
  }
  
  // this.log.debug(targetInstruction);
  export class TreeNode {
    model: NodeModel;
    constructor(element: Element, viewCompiler: ViewCompiler, viewResources: ViewResources, container: Container, taskQueue: TaskQueue);
    attached(): any;
    detached(): any;
    insertChild(child: NodeModel, before: NodeModel): any;
    
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
    // if (before) {
    //   let posBefore = this.model.children.indexOf(before);
    //   let posChild = this.model.children.indexOf(child);
    // } else {
    //   this.model.children.push(child);
    // }
    useTemplate(): any;
    unbindTemplate(): any;
    modelChanged(newValue?: any): any;
    
    // removeNode(node: TreeNode) { }
    removeChild(child: NodeModel): any;
    focusNode(e?: any, permitBubbles?: any): any;
    toggleSelected(e?: any, permitBubbles?: any): any;
    toggleNode(): any;
  }
  export class TreeView {
    expandOnFocus: boolean;
    selectOnFocus: boolean;
    nodes: NodeModel[];
    multiSelect: boolean;
    focused: NodeModel;
    selected: NodeModel[];
    subscriptions: any;
    compareEquality: any;
    bind(): any;
    constructor(element?: any);
    
    // this.log.warn('ctor - no template element');
    attached(): any;
    detached(): any;
    created(): any;
    
    // this.log.warn('created - no template element');
    nodesChanged(newValue?: any, oldValue?: any): any;
    enhanceNodes(nodes: NodeModel[]): any;
    preselectNodes(nodes: NodeModel[]): any;
    focusNode(node: NodeModel, modifiers?: any): any;
    selectNode(node: NodeModel): any;
    deselectNode(node: NodeModel): any;
    expandOnFocusChanged(newValue?: any): any;
    clearSelection(): any;
    
    // moveNode(node: TreeNode, target: TreeNode | TreeView) {
    //   console.log('moveNode', node, target);
    //   if (target instanceof TreeNode) {
    //     target.model.children.push(node.model);
    //   }
    //   // target.model.children.push(node.model);
    //   let parent = node.element.parentNode;
    //   let children;
    //   while (parent !== null && parent.tagName !== 'TREE-NODE') {
    //     parent = parent.parentNode;
    //   }
    //   if (parent === null) {
    //     children = this.nodes;
    //   } else {
    //     children = parent.au['tree-node'].viewModel.model.children;
    //   }
    //   let pos = children.indexOf(node.model);
    //   children.splice(pos, 1);
    // }
    findParentNode(node: TreeNode): TreeNode;
    findRootNode(node: TreeNode): TreeNode;
    expandAll(visitor: ((node: NodeModel, parent: NodeModel) => boolean)): any;
    expandNodeAndChildren(node: NodeModel, parent: NodeModel, visitor: ((node: NodeModel, parent: NodeModel) => boolean)): any;
    search(visitor: ((node: NodeModel, parent: NodeModel) => boolean)): any;
    moveNode(node: TreeNode, target: TreeNode | TreeView, sibling: TreeNode): any;
    removeNode(node: TreeNode): any;
  }
}