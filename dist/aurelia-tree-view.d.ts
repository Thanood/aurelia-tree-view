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
    bindingMode
  } from 'aurelia-binding';
  import {
    inject,
    Container
  } from 'aurelia-dependency-injection';
  import {
    getLogger
  } from 'aurelia-logging';
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
  export class TreeViewTemplate {
    log: any;
    constructor(targetInstruction?: any);
  }
  export class TreeNode {
    model: NodeModel;
    constructor(element: Element, viewCompiler: ViewCompiler, viewResources: ViewResources, container: Container, taskQueue: TaskQueue);
    attached(): any;
    detached(): any;
    insertChild(child: NodeModel, before: NodeModel): any;
    useTemplate(): any;
    unbindTemplate(): any;
    modelChanged(newValue?: any): any;
    
    // removeNode(node: TreeNode) { }
    removeChild(child: NodeModel): any;
    focusNode(): any;
    toggleSelected(e?: any, permitBubbles?: any): any;
    toggleNode(): any;
  }
  export class TreeView {
    expandOnFocus: boolean;
    nodes: NodeModel[];
    multiSelect: boolean;
    focused: NodeModel;
    selected: NodeModel[];
    subscriptions: any;
    bind(): any;
    constructor(element?: any);
    
    // this.log.warn('ctor - no template element');
    attached(): any;
    detached(): any;
    created(): any;
    
    // this.log.warn('created - no template element');
    nodesChanged(newValue?: any, oldValue?: any): any;
    enhanceNodes(nodes: NodeModel[]): any;
    focusNode(node: NodeModel): any;
    selectNode(node: NodeModel): any;
    deselectNode(node: NodeModel): any;
    expandOnFocusChanged(newValue?: any): any;
    
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
    moveNode(node: TreeNode, target: TreeNode | TreeView, sibling: TreeNode): any;
    removeNode(node: TreeNode): any;
  }
}