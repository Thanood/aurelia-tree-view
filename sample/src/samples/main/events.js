import {NodeModel} from 'aurelia-tree-view';

export class Events {
  attached() {
    const nodes = this.getNodes();
    this.tree.dataSource.load(nodes);
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
                        children: [
                            { title: 'Manhattan' },
                            { title: 'Brooklyn' },
                            { title: 'Bronx' },
                            { title: 'Queens' },
                            { title: 'Staten Island' }
                        ]
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
                children: [
                    { title: 'Los Angeles' },
                    { title: 'San Francisco' }
                ]
            }
        ];
    }

  onCollapsed(e) {
    this.logger.log(`node collapsed: ${e.detail.node.payload.title}`);
  }

  onExpanded(e) {
      console.log('[sample] events - ', e);
    this.logger.log(`node expanded: ${e.detail.node.payload.title}`);
  }

  onFocus(e) {
    this.logger.log(`node focused: ${e.detail.node.title}`);
  }

  onSelect(e) {
    let titles = e.detail.nodes.map(node => node.payload.title).join(', ');
    this.logger.log(`node selected: ${titles}`);
  }
}
