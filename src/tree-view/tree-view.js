import {bindable, bindingMode, inject} from 'aurelia-framework';
import {NodeModel} from './node-model';
import {fireEvent} from '../common/events';

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
}
