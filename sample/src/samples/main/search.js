import { inject, observable, TaskQueue } from 'aurelia-framework';

@inject(TaskQueue)
export class Search {
  @observable() hideNonHighlightedNodes = true;
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
                window.setTimeout(function() {
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
          if (this.hideNonHighlightedNodes) {
            // const roots = this.filteredNodes.map(res => this.tree.dataSource.findRoot(res));
            // this.tree.dataSource.nodes.forEach(node => node.isVisible = false);
            // roots.forEach(node => node.isVisible = true);
            this.doHideNonHighlightedNodes();
          }
        });
    } else {
      this.tree.dataSource.nodes.forEach(node => node.isVisible = true);
    }
  }

  hideNonHighlightedNodesChanged(newValue) {
    if (newValue) {
      this.doHideNonHighlightedNodes();
    } else {
      this.showAllNodes();
    }
  }

  doHideNonHighlightedNodes() {
    const roots = this.filteredNodes.map(res => this.tree.dataSource.findRoot(res));
    this.tree.dataSource.nodes.forEach(node => node.isVisible = false);
    roots.forEach(node => node.isVisible = true);
  }

  showAllNodes() {
    this.tree.dataSource.nodes.forEach(node => node.isVisible = true);
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
