import dragula from 'dragula';
import {customElement} from 'aurelia-templating';
import {Aurelia,bindable,inject,LogManager,bindingMode} from 'aurelia-framework';
import {computedFrom} from 'aurelia-binding';

@customElement(`${constants.elementPrefix}click-counter`)
export class ClickCounter {
  count = 0;

  increment() {
    this.count++;
  }
}

/**
* Plugin configuration builder
*/
export class ConfigBuilder {

  globalResources = [];

  useAll() : ConfigBuilder {
    return this.useClickCounter();
  }

  useClickCounter(): ConfigBuilder {
    this.globalResources.push('./tree-view/tree-view');
    return this;
  }
}

export function configure(aurelia: Aurelia, configCallback?: (builder: ConfigBuilder) => void) {
  let builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof(configCallback) === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}



export const constants = {
  bindablePrefix: 'au-',
  attributePrefix: 'au-',
  elementPrefix: 'au-',
  eventPrefix: 'tree-view-'
};

/**
* Fire DOM event on an element
* @param element The Element which the DOM event will be fired on
* @param name The Event's name
* @param data Addition data to attach to an event
*/
export function fireEvent(element: Element, name: string, data? = {}) {
  let event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

/**
* Fire DOM event on an element with the md-on prefix
* @param element The Element which the DOM event will be fired on
* @param name The Event's name, without md-on prefix
* @param data Addition data to attach to an event
*/
export function fireTreeViewEvent(element: Element, name: string, data? = {}) {
  return fireEvent(element, `${constants.eventPrefix}${name}`, data);
}

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
  title = '';
  children: NodeModel[];
  childrenGetter: {():Promise<NodeModel[]>};
  visible = true;
  expanded = false;
  selected = false;
  loading = false;

  static createFromJSON(nodes: any[]) {
    let models = [];
    nodes.forEach(node => {
      let children = node.children;
      if (typeof children === 'function') {
        // create promise wrapper so children are of type NodeModel
        children = () => {
          return new Promise((resolve, reject) => {
            node.children().then(ch => {
              resolve(NodeModel.createFromJSON(ch));
            });
          });
        };
      } else {
        children = node.children ? NodeModel.createFromJSON(node.children) : null;
      }
      models.push(new NodeModel(node.title, children));
    });
    return models;
  }

  constructor(title: string, children?: NodeModel[] | {():Promise<NodeModel[]>}) {
    this.title = title;
    if (typeof children === 'function') {
      this.childrenGetter = children;
    } else {
      this.children = children || [];
    }
    if (this.hasChildren) {
      this.collapseNode(true);
    }
  }

  @computedFrom('children')
  get hasChildren() {
    let result = false;
    if (this.children) {
      result = this.children.length > 0;
    } else {
      result = true;
    }
    return result;
  }

  expandNode(force = false) {
    if (!this.expanded || force) {
      let promise: Promise<NodeModel[]>;
      if (this.childrenGetter) {
        this.loading = true;
        promise = this.childrenGetter().then(children => {
          this.children = children;

        });
      } else {
        promise = Promise.resolve();
      }
      promise.then(() => {
        this.loading = false;
        this.children.forEach(child => {
          child.visible = true;
        });
        this.expanded = true;
      });
    }
  }

  collapseNode(force = false) {
    if (this.children && (this.expanded || force)) {
      this.children.forEach(child => {
        child.visible = false;
      });
      this.expanded = false;
    }
  }

  selectNode() {
    this.selected = true;
  }

  deselectNode() {
    this.selected = false;
  }

  isSelected() {
    return this.selected;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}

@inject(Element, LogManager)
export class TreeNode {
  @bindable() model: NodeModel = null;

  constructor(element: Element, logManager) {
    this.element = element;
    this.log = logManager.getLogger('tree-node');
  }

  insertChild(child: NodeModel, before: NodeModel) {
    // TODO: insert at position
    // let pos = this.model.children.indexOf(before);
    this.model.children.push(child);
  }

  // removeNode(node: TreeNode) { }
  removeChild(child: NodeModel) {
    let pos = this.model.children.indexOf(child);
    if (pos > -1) {
      this.model.children.splice(pos, 1);
    } else {
      this.log.warn('child not found in model', child, this.model.children);
    }
  }

  selectNode() {
    this.model.selectNode();
    fireEvent(this.element, 'selected', { node: this.model });
  }

  toggleNode() {
    if (this.model.expanded) {
      this.model.collapseNode();
      fireEvent(this.element, 'collapsed', { node: this.model });
    } else {
      this.model.expandNode();
      fireEvent(this.element, 'expanded', { node: this.model });
    }
  }
}

@inject(Element)
export class TreeView {
  @bindable() expandOnSelect: boolean = false;
  @bindable() nodes: NodeModel[];
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected: NodeModel = null;

  constructor(element) {
    this.element = element;
  }

  onSelected(e) {
    if (this.selected && this.selected !== e.detail.node) {
      this.selected.deselectNode();
    }
    this.selected = e.detail.node;
    if (this.expandOnSelect) {
      this.selected.expandNode();
    }
    fireEvent(this.element, 'selected', e.detail);
  }

  expandOnSelectChanged(newValue) {
    this.expandOnSelect = (newValue === true || newValue === 'true');
  }

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

  moveNode(node: TreeNode, target: TreeNode | TreeView, sibling: TreeNode) {
    console.log('moveNode', node, target, sibling);

    if (target instanceof TreeNode) {
      // target.model.children.push(node.model);
      target.insertChild(node, sibling);
      let parent = node.element.parentNode;
      while (parent !== null && parent.tagName !== 'TREE-NODE') {
        parent = parent.parentNode;
      }
      if (parent === null) {
        parent = this;
        parent.removeNode(node);
      } else {
        parent.au['tree-node'].viewModel.removeChild(node.model);
      }
    }
  }

  removeNode(node: TreeNode) {
    console.warn('removeNode not implemented');
  }
}
