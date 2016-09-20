import {NodeModel} from 'aurelia-tree-view';

export class NodeTemplate {
  clickedNode = null;
  nodes = [];
  nodeInterface = {
    nodeClicked: (node) => {
      console.log("I'm here", node);
      this.clickedNode = node;
    }
  };

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
}
