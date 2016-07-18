declare module 'aurelia-tree-view' {
  import dragula from 'dragula';
  import {
    customElement
  } from 'aurelia-templating';
  import {
    Aurelia,
    bindable,
    inject,
    LogManager,
    bindingMode
  } from 'aurelia-framework';
  import {
    computedFrom
  } from 'aurelia-binding';
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
  
  // // import 'dragula/dist/dragula.css!';
  //
  // export class DragAndDrop {
  //   constructor() { }
  //
  //   activate(viewModel) {
  //     let dragApi = dragula({
  //       isContainer: el => {
  //         if (!el) {
  //           return false;
  //         }
  //         // if (dragApi.dragging) {
  //         //   return el.tagName === 'TREE-NODE';
  //         // }
  //         return el.tagName === 'TREE-NODE' || el === viewModel.element;
  //         // return el.tagName === 'TREE-VIEW';
  //       },
  //       revertOnSpill: true
  //     });
  //     dragApi._viewModel = viewModel;
  //     this.trackDrop(dragApi);
  //     this.trackOver(dragApi);
  //   }
  //
  //   trackDrop(dragApi) {
  //     dragApi.on('drop', (el, container, source) => {
  //       console.log(container);
  //       dragApi.cancel();
  //       // container.au['tree-node'].viewModel.model.children.push(source.au['tree-node'].viewModel.model);
  //       dragApi._viewModel.moveNode(source.au['tree-node'].viewModel, (container.au['tree-node'] || container.au['tree-view']).viewModel);
  //     });
  //   }
  //
  //   trackOver(dragApi) {
  //     dragApi.on('over', (el, container, source) => {
  //       container.classList.add('drag-over');
  //     });
  //     dragApi.on('out', (el, container, source) => {
  //       container.classList.remove('drag-over');
  //     });
  //   }
  // }
  export class NodeModel {
    title: any;
    children: NodeModel[];
    childrenGetter: {};
    visible: any;
    expanded: any;
    selected: any;
    loading: any;
    static createFromJSON(nodes: any[]): any;
    constructor(title: string, children?: NodeModel[] | {});
    hasChildren: any;
    expandNode(force?: any): any;
    collapseNode(force?: any): any;
    selectNode(): any;
    deselectNode(): any;
    isSelected(): any;
    toggleSelected(): any;
  }
  export class TreeNode {
    model: NodeModel;
    constructor(element: Element, logManager?: any);
    insertChild(child: NodeModel, before: NodeModel): any;
    
    // removeNode(node: TreeNode) { }
    removeChild(child: NodeModel): any;
    selectNode(): any;
    toggleNode(): any;
  }
  export class TreeView {
    expandOnSelect: boolean;
    nodes: NodeModel[];
    selected: NodeModel;
    constructor(element?: any);
    onSelected(e?: any): any;
    expandOnSelectChanged(newValue?: any): any;
    
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