import {NodeModel} from 'aurelia-tree-view';

export class LazyLoad {
  nodes = [];
  forceLazyLoad = false;

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

    let california = new NodeModel('California', () => {
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          resolve([
            new NodeModel('Los Angeles'),
            new NodeModel('San Francisco')
          ]);
        }, 40);
      });
    });
    // this.nodes = [texas, newYork, oregon, california];
    this.nodes = NodeModel.createFromJSON(this.getNodes());
  }

  getNodes() {
    return [
      {
        title: 'Texas',
        children: [
          { title: 'Austin' },
          { title: 'Houston' }
        ]
      }, {
        title: 'New York',
        children: [
          {
            title: 'New York City',
            children: () => {
              return new Promise((resolve, reject) => {
                window.setTimeout(function() {
                  resolve([
                    { title: 'Manhattan' },
                    { title: 'Brooklyn' },
                    { title: 'Bronx' },
                    { title: 'Queens' },
                    { title: 'Staten Island' }
                  ]);
                }, 500);
              });
            }
          }, {
            title: 'Buffalo'
          }
        ]
      }, {
        title: 'Oregon',
        children: [
          { title: 'Portland' }
        ]
      }, {
        title: 'California',
        children: () => {
          return new Promise((resolve, reject) => {
            resolve([
              // { title: 'Los Angeles' },
              // { title: 'San Francisco' }
            ]);
          });
        }
      }
    ];
  }
}
