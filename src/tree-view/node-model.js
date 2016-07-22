import {computedFrom, observable} from 'aurelia-binding';

export class NodeModel {
  title = '';
  payload = null;
  children: NodeModel[];
  childrenGetter: {():Promise<NodeModel[]>};
  visible = true;
  expanded = false;
  @observable() focused = false;
  @observable() selected = false;
  loading = false;
  _template = null;
  _tree = null;

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
          if (this._template) {
            children.forEach(child => {
              child._template = this._template;
            });
          }
          this.children = children;
        });
      } else {
        promise = Promise.resolve();
      }
      return promise.then(() => {
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
    return Promise.resolve();
  }

  focusedChanged(newValue) {
    this._tree.focusNode(this);
  }

  toggleFocus() {
    this.focused = !this.focused;
  }

  selectedChanged(newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue) {
        this._tree.selectNode(this);
      } else if (newValue === false) {
        this._tree.deselectNode(this);
      }
    }
  }

  selectChildren(recursive = false) {
    let promise;
    if (this.expanded) {
      promise = Promise.resolve();
    } else {
      promise = this.expandNode();
    }
    return promise.then(() => {
      let childPromises = [];
      this.children.forEach(child => {
        child.selected = true;
        if (recursive) {
          childPromises.push(child.selectChildren());
        }
      });
      return Promise.all(childPromises);
    });
  }

  deselectChildren(recursive = false) {
    let promise;
    if (this.expanded) {
      promise = Promise.resolve();
    } else {
      promise = this.expandNode();
    }
    return promise.then(() => {
      let childPromises = [];
      this.children.forEach(child => {
        child.selected = false;
        if (recursive) {
          childPromises.push(child.deselectChildren());
        }
      });
      return Promise.all(childPromises);
    });
  }

  toggleSelected() {
    this.selected = !this.selected;
  }
}
