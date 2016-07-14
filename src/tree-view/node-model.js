export class NodeModel {
  title = '';
  children: NodeModel[];
  childrenGetter: {():Promise<NodeModel[]>};
  visible = true;
  expanded = false;
  selected = false;
  loading = false;

  constructor(title: string, children?: NodeModel[] | {():Promise<NodeModel[]>}) {
    this.title = title;
    // if (typeof children === 'function') {
    //   children().then(ch => this.children = ch);
    //   if (this.hasChildren()) {
    //     this.collapseNode(true);
    //   }
    // } else {
    //   this.children = children || [];
    //   if (this.hasChildren()) {
    //     this.collapseNode(true);
    //   }
    // }
    if (typeof children === 'function') {
      this.childrenGetter = children;
    } else {
      this.children = children || [];
    }
    if (this.hasChildren()) {
      this.collapseNode(true);
    }
  }

  hasChildren() {
    let result = false;
    if (this.children) {
      result = this.children.length > 0;
    } else {
      result = true;
    }
    return result;
  }

  toggleNode() {
    if (this.expanded) {
      this.collapseNode();
    } else {
      this.expandNode();
    }
  }

  expandNode(force = false) {
    if (!this.expanded || force) {
      let promise: Promise<NodeModel[]>;
      if (this.childrenGetter) {
        this.loading = true;
        promise = this.childrenGetter().then(children => this.children = children);
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
