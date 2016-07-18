import {NodeModel} from 'aurelia-tree-view';
import dragula from 'dragula';
import 'dragula/dist/dragula.css!';

export class DragAndDrop {
  nodes = [];
  dragApi = null;

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
      let siblingViewModel = (sibling) ? sibling.au['tree-node'].viewModel : null;
      // dragApi._viewModel.moveNode(source.au['tree-node'].viewModel, (container.au['tree-node'] || container.au['tree-view']).viewModel);
      // console.log(sourceViewModel, targetViewModel, siblingViewModel);
      dragApi._viewModel.moveNode(sourceViewModel, targetViewModel, siblingViewModel);
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
}
