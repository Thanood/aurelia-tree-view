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
        title: 'Austin'
      }, {
        title: 'Houston'
      }]
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
      }]
    }, {
      title: 'Oregon',
      children: [{
        title: 'Portland'
      }]
    }, {
      title: 'California',
      children: [{
        title: 'Los Angeles'
      }, {
        title: 'San Francisco'
      }]
    }];
  }
}
