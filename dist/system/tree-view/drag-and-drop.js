'use strict';

System.register(['dragula', 'dragula/dist/dragula.css!'], function (_export, _context) {
  "use strict";

  var dragula, DragAndDrop;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_dragula) {
      dragula = _dragula.default;
    }, function (_dragulaDistDragulaCss) {}],
    execute: function () {
      _export('DragAndDrop', DragAndDrop = function () {
        function DragAndDrop() {
          _classCallCheck(this, DragAndDrop);
        }

        DragAndDrop.prototype.activate = function activate(viewModel) {
          var dragApi = dragula({
            isContainer: function isContainer(el) {
              if (!el) {
                return false;
              }

              return el.tagName === 'TREE-NODE' || el === viewModel.element;
            },
            revertOnSpill: true
          });
          dragApi._viewModel = viewModel;
          this.trackDrop(dragApi);
          this.trackOver(dragApi);
        };

        DragAndDrop.prototype.trackDrop = function trackDrop(dragApi) {
          dragApi.on('drop', function (el, container, source) {
            console.log(container);
            dragApi.cancel();

            dragApi._viewModel.moveNode(source.au['tree-node'].viewModel, (container.au['tree-node'] || container.au['tree-view']).viewModel);
          });
        };

        DragAndDrop.prototype.trackOver = function trackOver(dragApi) {
          dragApi.on('over', function (el, container, source) {
            container.classList.add('drag-over');
          });
          dragApi.on('out', function (el, container, source) {
            container.classList.remove('drag-over');
          });
        };

        return DragAndDrop;
      }());

      _export('DragAndDrop', DragAndDrop);
    }
  };
});