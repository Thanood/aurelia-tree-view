import {inject} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

const stockCommands = [
  { title: 'edit' },
  { title: 'delete' },
  { title: 'export' },
  { title: 'lock' }
];

export class NodeTemplateCommands {
  commands = [];
  nodes = [];

  nodeInterface = {
    commands: [],
    executeCommand: this.executeCommand.bind(this)
  }

  executeCommand(cmd, model) {
    this.logger.log(`command execute: ${cmd.title} ${model.title}`);
  }

  constructor() {
    // this.commands = stockCommands;
    this.nodeInterface.commands = this.commands;
  }

  attached() {
    // simulate fetching commands from a service
    window.setTimeout(() => {
      this.nodeInterface.commands = stockCommands;
    }, 500);

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

  clearSelection() {
    this.tree.clearSelection();
  }
}
