// import {TreeView} from 'aurelia-tree-view';
import dragula from 'dragula';

export class DragAndDrop {
  nodes = [];
  dragApi = null;
  tree;

  attached() {
    this.nodes = this.getNodes();
    this.tree.dataSource.load(this.nodes);
    this.activateDnd(this.tree);
  }

  detached() {
    this.deactivateDnd();
  }

  activateDnd(viewModel) {
    this.dragApi = dragula({
      isContainer: el => {
        if (!el) {
          return false;
        }
        // if (dragApi.dragging) {
        //   return el.tagName === 'TREE-NODE';
        // }
        return el.tagName === 'TREE-NODE' || el === viewModel.element;
        // return el.tagName === 'TREE-VIEW';
      },
      revertOnSpill: true
    });
    this.dragApi._viewModel = viewModel;
    this.trackDrop(this.dragApi);
    this.trackOver(this.dragApi);
  }

  deactivateDnd() {
    this.dragApi.destroy();
    this.dragApi = null;
  }

  trackDrop(dragApi) {
    dragApi.on('drop', (el, container, source, sibling) => {
      console.log('dragula drop from', source);
      console.log('dragula drop on', container);
      console.log('dragula drop sibling', sibling);
      console.log('dragApi viewModel', dragApi._viewModel);
      dragApi.cancel();
      // container.au['tree-node'].viewModel.model.children.push(source.au['tree-node'].viewModel.model);
      let sourceViewModel = source.au['tree-node'].viewModel;
      let targetViewModel = (container.au['tree-node'] || container.au['tree-view']).viewModel;
      // find sibling's tree-node parent
      if (sibling !== null) {
        while (sibling.tagName !== 'TREE-NODE') {
          sibling = sibling.parentNode;
        }
      }
      console.log('dragula drop sibling (resolved)', sibling);
      let siblingViewModel = (sibling) ? sibling.au['tree-node'].viewModel : null;
      // dragApi._viewModel.moveNode(sourceViewModel, targetViewModel, siblingViewModel);
      // let flatNodes = dragApi._viewModel.dataSource.flatNodes;
      // sourceViewModel.model.parent = (siblingViewModel || targetViewModel).model.parent;
    });
  }

  trackOver(dragApi) {
    dragApi.on('over', (el, container, source) => {
      container.classList.add('drag-over');
    });
    dragApi.on('out', (el, container, source) => {
      container.classList.remove('drag-over');
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
}
