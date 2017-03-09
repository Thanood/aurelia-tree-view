export class NodeTemplate {
    clickedNode = null;
    nodeInterface = {
        nodeClicked: (node) => {
            console.log("I'm here", node);
            this.clickedNode = node;
        }
    };

    attached() {
        this.tree.dataSource.load(this.getNodes());
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
}
