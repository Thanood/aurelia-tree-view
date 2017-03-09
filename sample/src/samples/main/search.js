import { inject, observable, TaskQueue } from 'aurelia-framework';
import { NodeModel } from 'aurelia-tree-view';

@inject(TaskQueue)
export class Search {
    nodes = [];
    @observable() term;

    constructor(taskQueue) {
        this.taskQueue = taskQueue;
    }

    attached() {
        const nodes = this.getNodes();
        this.filteredNodes = nodes;
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

    // clearSelection() {
    //     this.tree.clearSelection();
    // }

    termChanged(newValue) {
        this.filteredNodes = this.nodes;
        this.unHighlightNodes();
        // this.taskQueue.queueTask(() => {
            if (newValue) {
                let results = [];
                this.tree.dataSource.filter(node => {
                    const rx = new RegExp(newValue, 'i');
                    const result = rx.test(node.payload.title);
                    if (result) {
                        results.push(node);
                        this.highlightNode(node);
                    }
                    return result;
                })
                .then((searchResults) => {
                    this.filteredNodes = searchResults;
                    // searchResults.forEach(node => {
                    //     const element = node.element.element;
                    //     if (!element.classList.contains('highlight') && !element.classList.contains('highlight-parent')) {
                    //         element.style.display = 'none';
                    //     }
                    // });
                });
            }
        // });
    }

    hideUnHighlightedNodes() {
        const nodes = this.treeView.querySelectorAll('tree-node');
        Array.from(nodes).forEach(node => {
            const title = node.querySelector('.tree-node-title');
            if (title.classList.contains('highlight') || title.classList.contains('highlight-parent')) {
                node.style.display = '';
            } else {
                node.style.display = 'none';
            }
        });
    }

    showAllNodes() {
        const nodes = this.treeView.querySelectorAll('tree-node');
        Array.from(nodes).forEach(node => {
            node.style.display = '';
        });
    }

    highlightNode(node) {
        const element = node.element.element;
        element.querySelector('.tree-node-title').classList.add('highlight');
        // highlight parents
        let parentNode = element.parentNode;
        while (parentNode && parentNode.tagName !== 'TREE-VIEW' && parentNode.classList) {
            if (parentNode.tagName === 'TREE-NODE') {
                parentNode.querySelector('.tree-node-title').classList.add('highlight-parent');
            }
            parentNode = parentNode.parentNode;
        }
    }

    unHighlightNodes() {
        const titles = this.tree.element.querySelectorAll('.tree-node-title');
        Array.from(titles).forEach(title => {
            title.classList.remove('highlight');
            title.classList.remove('highlight-parent');
        });
    }
}
