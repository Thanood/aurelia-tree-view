import {inject, TaskQueue} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

@inject(TaskQueue)
export class PreSelect {
  nodes = [];
  selected = [];

  constructor(tq) {
    this.taskQueue = tq;
  }

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
    this.selected = [oregon, oregon.children[0], newYork.children[1], newYork.children[0].children[2]];

    this.taskQueue.queueTask(() => {
      const visit = (node) => {
        if (node.parent) {
          visit(node.parent);
        }
        node.expandNode();
      };
      this.selected.forEach(sel => {
        visit(sel);
        sel.selected = true;
      });
    });
  }
}
