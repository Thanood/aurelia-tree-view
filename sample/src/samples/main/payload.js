import { NodeModel } from 'aurelia-tree-view';

export class Payload {

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
                        children: () => {
                            return new Promise((resolve, reject) => {
                                window.setTimeout(function () {
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

    onCollapsed(e) {
        this.logger.log(`node collapsed: ${e.detail.node.payload.title}`);
    }

    onExpanded(e) {
        this.logger.log(`node expanded: ${e.detail.node.payload.title}`);
    }

    onSelect(e) {
        this.logger.log(`node selected: ${e.detail.nodes[0].payload.title}, ${JSON.stringify(e.detail.nodes[0].payload)}`);
    }
}
