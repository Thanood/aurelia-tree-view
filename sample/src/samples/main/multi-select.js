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
      new NodeModel('New York City', () => {
        return new Promise((resolve, reject) => {
          window.setTimeout(() => {
            resolve([
              new NodeModel('Manhattan'),
              new NodeModel('Brooklyn'),
              new NodeModel('Bronx'),
              new NodeModel('Queens'),
              new NodeModel('Staten Island')
            ]);
          }, 500);
        });
      }),
      new NodeModel('Buffalo')]);

    let oregon = new NodeModel('Oregon', [new NodeModel('Portland')]);

    let california = new NodeModel('California', [
      new NodeModel('Los Angeles'),
      new NodeModel('San Francisco')
    ]);
    this.nodes = [texas, newYork, oregon, california];
  }

  selectedNodes = '';
  onSelect(e) {
    this.selectedNodes = this.selected.map(node => node.title).join(', ');
  }
}
