import { NodeModel } from 'aurelia-tree-view';

export class PreSelect {
    attached() {
        const nodes = this.getNodes();
        this.tree.dataSource.load(nodes);
        this.tree.dataSource.selectNode(nodes[1]);
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
}
