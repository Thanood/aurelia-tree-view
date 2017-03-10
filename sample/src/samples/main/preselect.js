import {inject, TaskQueue} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

@inject(TaskQueue)
export class PreSelect {
  constructor(tq) {
    this.taskQueue = tq;
  }

  attached() {
    const nodes = this.getNodes();
    this.tree.dataSource.load(nodes);
    this.taskQueue.queueTask(() => {
        const selected = [nodes[2], nodes[2].children[0], nodes[1].children[1], nodes[1].children[0].children[2]];
        selected.forEach(node => {
            this.tree.dataSource.selectNode(node);
        });
    });
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

    onSelect(e) {
        // this.selectedNodes = this.selected.map(node => node.title).join(', ');
        this.selectedNodes = e.detail;
    }
}
