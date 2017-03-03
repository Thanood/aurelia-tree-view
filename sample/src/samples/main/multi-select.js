import { computedFrom } from 'aurelia-framework';
import { NodeModel } from 'aurelia-tree-view';

export class MultiSelect {
    selectedNodes = [];
    
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
            }, {
                title: 'Four levels',
                children: [
                    { title: 'level 1', children: [
                        { title: 'level 2', children: [
                            { title: 'level 3', children: [
                                { title: 'level 4' }
                            ]}
                        ]}
                    ]}
                ]
            }, {
                title: 'Five levels',
                children: [
                    { title: 'level 1', children: [
                        { title: 'level 2', children: [
                            { title: 'level 3', children: [
                                { title: 'level 4', children: [
                                    { title: 'level 5' }
                                ] }
                            ]}
                        ]}
                    ]}
                ]
            }
        ];
    }

    onSelect(e) {
        // this.selectedNodes = this.selected.map(node => node.title).join(', ');
        this.selectedNodes = e.detail;
    }
}
