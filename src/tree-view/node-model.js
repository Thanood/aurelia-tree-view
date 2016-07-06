export class NodeModel {
  title = '';
  children: NodeModel[];
  visible: boolean;
  expanded: boolean = false;
  icon: string = '';
  selected = false;

  constructor(name: string, children?: NodeModel[]) {
    this.title = name;
    this.children = children || [];
    this.visible = true;
    if (this.hasChildren()) {
      this.expanded = true;
      this.collapseNode();
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

  expandNode() {
    if (!this.expanded) {
      this.children.forEach(child => {
        child.visible = true;
      });
      this.expanded = true;
      this.icon = 'keyboard_arrow_down';
    }
  }

  collapseNode() {
    if (this.expanded) {
      this.children.forEach(child => {
        child.visible = false;
      });
      this.expanded = false;
      this.icon = 'keyboard_arrow_right';
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
