import {NodeModel} from 'aurelia-tree-view';

export class CustomCompare {
  nodes = [];
  selected = [];

  attached() {
    let texas = new NodeModel('Texas', [
      new NodeModel('Austin'),
      new NodeModel('Houston')
    ]);

    let manhattan = new NodeModel('Manhattan');
    let brooklyn = new NodeModel('Brooklyn');
    let bronx = new NodeModel('Bronx');
    let queens = new NodeModel('Queens');
    let statenIsland = new NodeModel('Staten Island');

    let newYork = new NodeModel('New York', [
      new NodeModel('New York City', () => {
        return new Promise(resolve => {
          window.setTimeout(() => {
            resolve([manhattan, brooklyn, bronx, queens, statenIsland]);
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
    this.selected = [oregon, oregon.children[0], newYork, newYork.children[0], manhattan, brooklyn, bronx, queens, statenIsland];
  }

  compareNode(a, b) {
    return a.title === b.title;
  }
}
