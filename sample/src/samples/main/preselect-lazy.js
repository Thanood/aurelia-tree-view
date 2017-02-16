import {NodeModel} from 'aurelia-tree-view';

export class LazyLoad {
  nodes = [];
  forceLazyLoad = false;

  attached() {
    this.nodes = NodeModel.createFromJSON(this.getNodes());
    this.selected = [this.nodes[2]];
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
              { title: 'Los Angeles' },
              { title: 'San Francisco' }
            ]);
          });
        }
      }
    ];
  }
}
