import {inject, observable, TaskQueue} from 'aurelia-framework';
import {NodeModel} from 'aurelia-tree-view';

@inject(TaskQueue)
export class Search {
  nodes = [];
  @observable() term;

  constructor(taskQueue) {
    this.taskQueue = taskQueue;
  }

  attached() {
    let texas = new NodeModel('Texas', [
      new NodeModel('Austin'),
      new NodeModel('Houston')
    ]);

    let newYork = new NodeModel('New York', [
      new NodeModel('New York City', [
        new NodeModel('Manhattan'),
        new NodeModel('Brooklyn'),
        new NodeModel('Bronx'),
        new NodeModel('Queens'),
        new NodeModel('Staten Island')
      ]),
      new NodeModel('Buffalo')]);

    let oregon = new NodeModel('Oregon', [new NodeModel('Portland')]);

    let california = new NodeModel('California', [
      new NodeModel('Los Angeles'),
      new NodeModel('San Francisco')
    ]);
    this.nodes = [texas, newYork, oregon, california];
    this.filteredNodes = this.nodes;
  }

  clearSelection() {
    this.tree.clearSelection();
  }

  termChanged(newValue) {
    this.filteredNodes = this.nodes;
    this.unHighlightNodes();
    this.taskQueue.queueTask(() => {
      if (newValue) {
        let results = [];
        this.tree.search(node => {
          const rx = new RegExp(newValue, 'i');
          const result = rx.test(node.title);
          if (result) {
            results.push(node);
            this.highlightNode(node);
          }
          return result;
        })
        .then((searchResults) => {
          this.filteredNodes = searchResults;
        });
      }
    });
  }

  highlightNode(node) {
    const element = node._element.element;
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
