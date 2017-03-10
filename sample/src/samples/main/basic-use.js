export class BasicUse {
    attached() {
        const nodes = this.getNodes();
        this.tree.dataSource.load(nodes);
    }

    clearSelection() {
        // this.tree.clearSelection();
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
