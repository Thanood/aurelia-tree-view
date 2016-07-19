define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-logging', 'aurelia-binding', './node-model', './tree-node', '../common/events'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaLogging, _aureliaBinding, _nodeModel, _treeNode, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TreeView = undefined;

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

  var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var TreeView = exports.TreeView = (_dec = (0, _aureliaDependencyInjection.inject)(Element), _dec2 = (0, _aureliaTemplating.bindable)(), _dec3 = (0, _aureliaTemplating.bindable)(), _dec4 = (0, _aureliaTemplating.bindable)({
    defaultBindingMode: _aureliaBinding.bindingMode.twoWay
  }), _dec(_class = (_class2 = function () {
    function TreeView(element) {
      _classCallCheck(this, TreeView);

      _initDefineProp(this, 'expandOnSelect', _descriptor, this);

      _initDefineProp(this, 'nodes', _descriptor2, this);

      _initDefineProp(this, 'selected', _descriptor3, this);

      this.element = element;
      this.log = (0, _aureliaLogging.getLogger)('tree-view');

      var templateElement = this.element.querySelector('tree-node-template');
      if (templateElement) {
        this.templateElement = templateElement;
      } else {}
    }

    TreeView.prototype.created = function created() {
      if (this.templateElement) {
        if (this.templateElement.au) {
          var viewModel = this.templateElement.au.controller.viewModel;
          this.log.debug('viewModel', viewModel);
        } else {
          this.log.warn('no viewmodel found for template', this.templateElement);
        }
      } else {}
    };

    TreeView.prototype.nodesChanged = function nodesChanged(newValue, oldValue) {
      if (newValue && this.templateElement) {
        this.enhanceNodes(newValue);
      }
    };

    TreeView.prototype.enhanceNodes = function enhanceNodes(nodes) {
      var _this = this;

      nodes.forEach(function (node) {
        if (node.children && typeof node.children !== 'function') {
          _this.enhanceNodes(node.children);
        }
        node._template = _this.templateElement.au.controller.viewModel.template;
      });
    };

    TreeView.prototype.onSelected = function onSelected(e) {
      if (this.selected && this.selected !== e.detail.node) {
        this.selected.deselectNode();
      }
      this.selected = e.detail.node;
      if (this.expandOnSelect) {
        this.selected.expandNode();
      }
      (0, _events.fireEvent)(this.element, 'selected', e.detail);
    };

    TreeView.prototype.expandOnSelectChanged = function expandOnSelectChanged(newValue) {
      this.expandOnSelect = newValue === true || newValue === 'true';
    };

    TreeView.prototype.moveNode = function moveNode(node, target, sibling) {
      console.log('moveNode', node, target, sibling);

      if (target instanceof _treeNode.TreeNode) {
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
  })), _class2)) || _class);
});