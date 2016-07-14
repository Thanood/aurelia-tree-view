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
    this.nodes = this.createNodeModels(this.getNodes());
  }

  createNodeModels(nodes) {
    console.log(nodes);
    let models = [];
    nodes.forEach(node => {
      let children = node.children;
      if (typeof children !== 'function') {
        children = node.children ? this.createNodeModels(node.children) : null;
      } else {
        // create promise wrapper so children are of type NodeModel
        children = () => {
          return new Promise((resolve, reject) => {
            node.children().then(ch => {
              resolve(this.createNodeModels(ch));
            });
          });
        };
      }
      models.push(new NodeModel(node.title, children));
    });
    return models;
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
