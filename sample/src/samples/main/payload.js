import {NodeModel} from 'aurelia-tree-view';

export class Payload {
  nodes = [];

  attached() {
    let texas = new NodeModel('Texas', [
      new NodeModel('Austin', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
      new NodeModel('Houston', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })
    ], { test: 'the payload', num: Math.floor(Math.random() * 1000) });

    let newYork = new NodeModel('New York', [
      new NodeModel('New York City', [
        new NodeModel('Manhattan', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
        new NodeModel('Brooklyn', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
        new NodeModel('Bronx', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
        new NodeModel('Queens', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
        new NodeModel('Staten Island', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })
      ], { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
      new NodeModel('Buffalo', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })]);

    let oregon = new NodeModel('Oregon', [new NodeModel('Portland')], { test: 'the payload', num: Math.floor(Math.random() * 1000) });

    let california = new NodeModel('California', [
      new NodeModel('Los Angeles', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }),
      new NodeModel('San Francisco', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })
    ], { test: 'the payload', num: Math.floor(Math.random() * 1000) });
    this.nodes = [texas, newYork, oregon, california];
  }

  onCollapsed(e) {
    this.logger.log(`node collapsed: ${e.detail.node.title}`);
  }

  onExpanded(e) {
    this.logger.log(`node expanded: ${e.detail.node.title}`);
  }

  onSelect(e) {
    this.logger.log(`node selected: ${e.detail.nodes[0].title}, ${JSON.stringify(e.detail.nodes[0].payload)}`);
  }
}
