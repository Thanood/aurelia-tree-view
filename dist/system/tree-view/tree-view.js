'use strict';

System.register(['aurelia-framework', './node-model', './tree-node', '../common/events'], function (_export, _context) {
  "use strict";

  var bindable, bindingMode, inject, NodeModel, TreeNode, fireEvent, _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, TreeView;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaFramework) {
      bindable = _aureliaFramework.bindable;
      bindingMode = _aureliaFramework.bindingMode;
      inject = _aureliaFramework.inject;
    }, function (_nodeModel) {
      NodeModel = _nodeModel.NodeModel;
    }, function (_treeNode) {
      TreeNode = _treeNode.TreeNode;
    }, function (_commonEvents) {
      fireEvent = _commonEvents.fireEvent;
    }],
    execute: function () {
      _export('TreeView', TreeView = (_dec = inject(Element), _dec2 = bindable(), _dec3 = bindable(), _dec4 = bindable({
        defaultBindingMode: bindingMode.twoWay
      }), _dec(_class = (_class2 = function () {
        function TreeView(element) {
          _classCallCheck(this, TreeView);

          _initDefineProp(this, 'expandOnSelect', _descriptor, this);

          _initDefineProp(this, 'nodes', _descriptor2, this);

          _initDefineProp(this, 'selected', _descriptor3, this);

          this.element = element;
        }

        TreeView.prototype.onSelected = function onSelected(e) {
          if (this.selected && this.selected !== e.detail.node) {
            this.selected.deselectNode();
          }
          this.selected = e.detail.node;
          if (this.expandOnSelect) {
            this.selected.expandNode();
          }
          fireEvent(this.element, 'selected', e.detail);
        };

        TreeView.prototype.expandOnSelectChanged = function expandOnSelectChanged(newValue) {
          this.expandOnSelect = newValue === true || newValue === 'true';
        };

        TreeView.prototype.moveNode = function moveNode(node, target, sibling) {
          console.log('moveNode', node, target, sibling);

          if (target instanceof TreeNode) {
            target.insertChild(node, sibling);
            var parent = node.element.parentNode;
            while (parent !== null && parent.tagName !== 'TREE-NODE') {
              parent = parent.parentNode;
            }
            if (parent === null) {
              parent = this;
              parent.removeNode(node);
            } else {
              parent.au['tree-node'].viewModel.removeChild(node.model);
            }
          }
        };

        TreeView.prototype.removeNode = function removeNode(node) {
          console.warn('removeNode not implemented');
        };

        return TreeView;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'expandOnSelect', [_dec2], {
        enumerable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'nodes', [_dec3], {
        enumerable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_dec4], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export('TreeView', TreeView);
    }
  };
});