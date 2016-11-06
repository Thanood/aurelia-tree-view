import {NodeModel} from 'aurelia-tree-view';

export class Events {
  nodes = [];

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

  onCollapsed(e) {
    this.logger.log(`node collapsed: ${e.detail.node.title}`);
  }

  onExpanded(e) {
    this.logger.log(`node expanded: ${e.detail.node.title}`);
  }

  onFocus(e) {
    this.logger.log(`node focused: ${e.detail.node.title}`);
  }

  onSelect(e) {
    console.log('[sample] events - ]', e);
    let titles = e.detail.nodes.map(node => node.title).join(', ');
    this.logger.log(`node selected: ${titles}`);
  }
}
