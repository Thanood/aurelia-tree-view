import {
  NodeModel
} from 'aurelia-tree-view';

export class InitFromJson {
  nodes = [];

  attached() {
    this.nodes = NodeModel.createFromJSON(this.getNodes());
  }

  getNodes() {
    return [{
      title: 'Texas',
      children: [{
        title: 'Austin',
        rnd: Math.floor(Math.random() * 1000)
      }, {
        title: 'Houston',
        rnd: Math.floor(Math.random() * 1000)
      }],
      rnd: Math.floor(Math.random() * 1000)
    }, {
      title: 'New York',
      children: [{
        title: 'New York City',
        children: [{
          title: 'Manhattan'
        }, {
          title: 'Brooklyn'
        }, {
          title: 'Bronx'
        }, {
          title: 'Queens'
        }, {
          title: 'Staten Island'
        }]
      }, {
        title: 'Buffalo'
      }],
      rnd: Math.floor(Math.random() * 1000)
    }, {
      title: 'Oregon',
      children: [{
        title: 'Portland'
      }],
      rnd: Math.floor(Math.random() * 1000)
    }, {
      title: 'California',
      children: [{
        title: 'Los Angeles'
      }, {
        title: 'San Francisco'
      }],
      rnd: Math.floor(Math.random() * 1000)
    }];
  }
}
