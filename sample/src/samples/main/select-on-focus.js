import {computedFrom} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

export class SelectOnFocus {
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

    let fourLevels = new NodeModel('Four Levels (level 1)', [
      new NodeModel('Level 2', [
        new NodeModel('Level 3', [
          new NodeModel('Level 4')
        ])
      ])
    ]);

    let fiveLevels = new NodeModel('Five Levels (level 1)', [
      new NodeModel('Level 2', [
        new NodeModel('Level 3', [
          new NodeModel('Level 4', [
            new NodeModel('Level 5')
          ])
        ])
      ])
    ]);

    this.nodes = [texas, newYork, oregon, california, fourLevels, fiveLevels];
  }

  selectedNodes = '';
  onSelect(e) {
    this.selectedNodes = this.selected.map(node => node.title).join(', ');
  }
}
