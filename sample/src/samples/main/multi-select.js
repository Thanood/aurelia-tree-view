import {computedFrom} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

export class MultiSelect {
  nodes = [];
  selected = [];

  attached() {
    let texas = new NodeModel('Texas', [
      new NodeModel('Austin'),
      new NodeModel('Houston')
    ]);

    let newYork = new NodeModel('New York', [
      new NodeModel('New York City', [
        new NodeModel('Manhattan'),
        new NodeModel('Brooklyn'),
        new NodeModel('Bronx'),
        new NodeModel('Queens'),
        new NodeModel('Staten Island')
      ]),
      new NodeModel('Buffalo')]);

    let oregon = new NodeModel('Oregon', [new NodeModel('Portland')]);

    let california = new NodeModel('California', [
      new NodeModel('Los Angeles'),
      new NodeModel('San Francisco')
    ]);
    this.nodes = [texas, newYork, oregon, california];
  }

  // @computedFrom('selected')
  // get selectedNodes() {
  //   return this.selected.map(node => node.title).join(', ');
  // }
  selectedNodes = '';
  onSelect(e) {
    // this.selected = this.tree.selected;
    console.log(this.selected);
    this.selectedNodes = this.selected.map(node => node.title).join(', ');
  }
}
