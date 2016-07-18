import {computedFrom} from 'aurelia-binding';

export class NodeModel {
  title = '';
  payload = null;
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
      let payload = node.payload;
      if (!payload) {
        payload = {};
        let keys = Object.keys(node);
        keys.forEach(key => {
          switch (key) {
            case 'children':
            case 'title':
              break;
            default:
              payload[key] = node[key];
              break;
          }
        });
      }
      models.push(new NodeModel(node.title, children, payload));
    });
    return models;
  }

  constructor(title: string, children?: NodeModel[] | {():Promise<NodeModel[]>}, payload?: any) {
    this.title = title;
    this.payload = payload;
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
