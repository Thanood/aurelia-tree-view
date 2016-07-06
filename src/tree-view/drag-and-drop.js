import dragula from 'dragula';
import 'dragula/dist/dragula.css!';

export class DragAndDrop {
  constructor() { }

  activate(viewModel) {
    let dragApi = dragula({
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
    dragApi._viewModel = viewModel;
    this.trackDrop(dragApi);
    this.trackOver(dragApi);
  }

  trackDrop(dragApi) {
    dragApi.on('drop', (el, container, source) => {
      console.log(container);
      dragApi.cancel();
      // container.au['tree-node'].viewModel.model.children.push(source.au['tree-node'].viewModel.model);
      dragApi._viewModel.moveNode(source.au['tree-node'].viewModel, (container.au['tree-node'] || container.au['tree-view']).viewModel);
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
