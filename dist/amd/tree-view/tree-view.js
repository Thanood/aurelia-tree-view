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

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

  var TreeView = exports.TreeView = (_dec = (0, _aureliaDependencyInjection.inject)(Element), _dec2 = (0, _aureliaTemplating.bindable)(), _dec3 = (0, _aureliaTemplating.bindable)(), _dec4 = (0, _aureliaTemplating.bindable)(), _dec5 = (0, _aureliaTemplating.bindable)(), _dec6 = (0, _aureliaTemplating.bindable)({
    defaultBindingMode: _aureliaBinding.bindingMode.twoWay
  }), _dec7 = (0, _aureliaTemplating.bindable)({
    defaultBindingMode: _aureliaBinding.bindingMode.twoWay
  }), _dec8 = (0, _aureliaTemplating.bindable)(), _dec(_class = (_class2 = function () {
    TreeView.prototype.bind = function bind() {
      this.expandOnFocus = this.expandOnFocus === true || this.expandOnFocus === 'true';
      this.multiSelect = this.multiSelect === true || this.multiSelect === 'true';
      this.selectOnFocus = this.selectOnFocus === true || this.selectOnFocus === 'true';
    };

    function TreeView(element) {
      _classCallCheck(this, TreeView);

      _initDefineProp(this, 'expandOnFocus', _descriptor, this);

      _initDefineProp(this, 'selectOnFocus', _descriptor2, this);

      _initDefineProp(this, 'nodes', _descriptor3, this);

      _initDefineProp(this, 'multiSelect', _descriptor4, this);

      _initDefineProp(this, 'focused', _descriptor5, this);

      _initDefineProp(this, 'selected', _descriptor6, this);

      this.subscriptions = [];

      _initDefineProp(this, 'compareEquality', _descriptor7, this);

      this._suspendEvents = false;
      this._suspendUpdate = false;

      this.element = element;
      this.log = (0, _aureliaLogging.getLogger)('tree-view');
      this.compareEquality = function (args) {
        return args.a === args.b;
      };

      var templateElement = this.element.querySelector('tree-node-template');
      if (templateElement) {
        this.templateElement = templateElement;
      } else {}
    }

    TreeView.prototype.attached = function attached() {};

    TreeView.prototype.detached = function detached() {};

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
      if (newValue) {
        this.enhanceNodes(newValue);
        this.preselectNodes(newValue);
      }
    };

    TreeView.prototype.enhanceNodes = function enhanceNodes(nodes) {
      var _this = this;

      nodes.forEach(function (node) {
        if (node.children && typeof node.children !== 'function') {
          _this.enhanceNodes(node.children);
        }
        if (_this.templateElement) {
          node._template = _this.templateElement.au.controller.viewModel.template;
          node._templateModel = _this.templateElement.au.controller.viewModel.model;
        }

        node._tree = {
          focusNode: _this.focusNode.bind(_this),
          selectNode: _this.selectNode.bind(_this),
          deselectNode: _this.deselectNode.bind(_this),
          multiSelect: _this.multiSelect
        };
      });
    };

    TreeView.prototype.preselectNodes = function preselectNodes(nodes) {
      var _this2 = this;

      nodes.forEach(function (node) {
        if (_this2.selected.find(function (n) {
          return _this2.compareEquality({ a: node, b: n });
        })) {
          node.selected = true;
          if (!_this2.multiSelect) {
            node.focused = true;
          }
          node.expandNode().then(function () {
            _this2.preselectNodes(node.children);
          });
        }
      });
    };

    TreeView.prototype.focusNode = function focusNode(node) {
      var modifiers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!this._suspendUpdate) {
        if (node !== this.focused) {
          if (this.focused) {
            this._suspendUpdate = true;
            this.focused.focused = false;
            this._suspendUpdate = false;
          }
          this.focused = node;
          (0, _events.fireEvent)(this.element, 'focused', { node: node });
          if (this.expandOnFocus) {
            node.expandNode();
          }
        }
        if (this.selectOnFocus) {
          node.selected = true;

          if (modifiers['ctrl']) {
            var recurse = !!modifiers['shift'];
            node.selectChildren(recurse);
          }
        }
      }
    };

    TreeView.prototype.selectNode = function selectNode(node) {
      var _this3 = this;

      var existing = this.selected.findIndex(function (n) {
        return _this3.compareEquality({ a: node, b: n });
      });
      if (existing === -1) {
        this.log.debug('selecting node', node);
        if (!this.multiSelect) {
          this._suspendEvents = true;
          this.selected.forEach(function (n) {
            return n.selected = false;
          });
          this._suspendEvents = false;
        }
        this.selected.push(node);
        if (!this._suspendEvents) {
          (0, _events.fireEvent)(this.element, 'selection-changed', { nodes: this.selected });
        }
      }
    };

    TreeView.prototype.deselectNode = function deselectNode(node) {
      var _this4 = this;

      var index = this.selected.findIndex(function (n) {
        return _this4.compareEquality({ a: node, b: n });
      });
      if (index === -1) {
        this.log.error('node not found in selected', node);
      } else {
        this.log.debug('deselecting node', node);
        this.selected.splice(index, 1);
        if (!this._suspendEvents) {
          (0, _events.fireEvent)(this.element, 'selection-changed', { nodes: this.selected });
        }
      }
    };

    TreeView.prototype.expandOnFocusChanged = function expandOnFocusChanged(newValue) {
      this.expandOnFocus = newValue === true || newValue === 'true';
    };

    TreeView.prototype.clearSelection = function clearSelection() {
      this.selected.forEach(function (node) {
        node.selected = false;
      });
      if (this.focused) {
        this.focused.focused = false;
      }
    };

    TreeView.prototype.findParentNode = function findParentNode(node) {
      var parent = node.element.parentNode;
      var parentModel = null;
      while (parent !== null && parent.tagName.toUpperCase() !== 'TREE-NODE') {
        if (parent.tagName.toUpperCase() === 'TREE-VIEW') {
          parent = null;
        } else {
          parent = parent.parentNode;
        }
      }
      if (parent) {
        parentModel = parent.au['tree-node'].viewModel;
      }
      return parentModel;
    };

    TreeView.prototype.findRootNode = function findRootNode(node) {
      var root = null;
      var parent = this.findParentNode(node);
      while (parent !== null) {
        root = parent;
        parent = this.findParentNode(parent);
      }
      return root;
    };

    TreeView.prototype.expandAll = function expandAll(visitor) {
      var _this5 = this;

      return Promise.all(this.nodes.map(function (node) {
        return _this5.expandNodeAndChildren(node, null, visitor);
      })).then(function (results) {
        var joined = [];
        results.forEach(function (j) {
          if (j !== null) {
            joined = joined.concat(j);
          }
        });
        return joined;
      });
    };

    TreeView.prototype.expandNodeAndChildren = function expandNodeAndChildren(node, parent, visitor) {
      var _this6 = this;

      return Promise.resolve(visitor(node, parent)).then(function (result) {
        if (node.hasChildren) {
          return node.expandNode(true).then(function () {
            return Promise.all(node.children.map(function (child) {
              return _this6.expandNodeAndChildren(child, node, visitor);
            }).concat(result ? node : null));
          }).then(function (potentials) {
            var joined = [];
            potentials.filter(function (p) {
              return p !== null;
            }).forEach(function (p) {
              return joined = joined.concat(p);
            });
            return joined;
          });
        }
        return result ? node : null;
      });
    };

    TreeView.prototype.search = function search(visitor) {
      var _this7 = this;

      return this.expandAll(visitor).then(function (results) {
        var searchResults = [];
        results.forEach(function (res) {
          var treeNode = res._element;
          if (treeNode) {
            var root = _this7.findRootNode(treeNode);
            if (root) {
              if (searchResults.indexOf(root.model) === -1) {
                searchResults.push(root.model);
              }
            } else {
              if (searchResults.indexOf(res) === -1) {
                searchResults.push(res);
              }
            }
          } else {
            _this7.log.warn('tree-node not found for', res);
          }
        });
        return searchResults;
      });
    };

    TreeView.prototype.moveNode = function moveNode(node, target, sibling) {
      this.log.debug('moveNode', node, target, sibling);

      if (target instanceof _treeNode.TreeNode) {
        target.insertChild(node.model, sibling ? sibling.model : null);
        var _parent = this.findParentNode(node);
        if (_parent === null) {
          _parent = this;
          _parent.removeNode(node);
        } else {
          _parent.removeChild(node.model);
        }
      } else if (target instanceof TreeView) {
        var posNode = this.nodes.indexOf(node.model);
        var posSibling = sibling ? this.nodes.indexOf(sibling.model) : this.nodes.length - 1;
        if (posNode > -1 && posSibling > -1) {
          this.nodes.splice(posNode, 1);
          this.nodes.splice(posSibling, 0, node.model);
        } else if (posSibling > -1) {
          var _parent2 = this.findParentNode(node);

          _parent2.removeChild(node.model);
          this.nodes.splice(posSibling, 0, node.model);
        } else {
          this.log.warn('sibling not found');
        }
      }
    };

    TreeView.prototype.removeNode = function removeNode(node) {
      var pos = this.nodes.indexOf(node.model);
      this.nodes.splice(pos, 1);
    };

    return TreeView;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'expandOnFocus', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'selectOnFocus', [_dec3], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'nodes', [_dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'multiSelect', [_dec5], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'focused', [_dec6], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'selected', [_dec7], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'compareEquality', [_dec8], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class2)) || _class);
});