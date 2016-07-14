export class NodeModel {
  title = '';
  children: NodeModel[];
  visible: boolean;
  expanded: boolean = false;
  selected = false;

  constructor(name: string, children?: NodeModel[]) {
    this.title = name;
    this.children = children || [];
    this.visible = true;
    if (this.hasChildren()) {
      this.collapseNode(true);
    }
  }

  hasChildren() {
    return this.children && this.children.length > 0;
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
      this.children.forEach(child => {
        child.visible = true;
      });
      this.expanded = true;
    }
  }

  collapseNode(force = false) {
    if (this.expanded || force) {
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
