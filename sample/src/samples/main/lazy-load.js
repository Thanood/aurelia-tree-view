import {NodeModel} from 'aurelia-tree-view';

export class LazyLoad {
  nodes = [];

  attached() {
    let texas = new NodeModel('Texas', [
      new NodeModel('Austin'),
      new NodeModel('Houston')
    ]);

    let newYork = new NodeModel('New York', [
      new NodeModel('New York City', () => {
        return new Promise((resolve, reject) => {
          window.setTimeout(function() {
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

  fillTree() {
    this.nodes = [
      {
        title: 'Texas',
        children: [
          { title: 'Austin' },
          { title: 'Houston' }
        ]
      }, {
        title: 'New York',
        children: () => {
          return new Promise((resolve, reject) => {
            window.setTimeout(function() {
              resolve([
                new NodeModel('Manhattan'),
                new NodeModel('Brooklyn'),
                new NodeModel('Bronx'),
                new NodeModel('Queens'),
                new NodeModel('Staten Island')
              ]);
            }, 500);
          });
        }
      }
    ];
  }
}
