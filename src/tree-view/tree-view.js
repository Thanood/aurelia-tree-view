import {bindable, bindingMode} from 'aurelia-framework';
import {NodeModel} from './node-model';

export class TreeView {
  @bindable() expandOnSelect: boolean = false;
  @bindable() nodes: NodeModel[];
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  }) selected: NodeModel = null;

  constructor() { }

  onSelected(e) {
    if (this.selected && this.selected !== e.detail.node) {
      this.selected.deselectNode();
    }
    this.selected = e.detail.node;
    if (this.expandOnSelect) {
      this.selected.expandNode();
    }
  }

  expandOnSelectChanged(newValue) {
    this.expandOnSelect = (newValue === true || newValue === 'true');
  }
}
