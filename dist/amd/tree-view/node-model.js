define(['exports', 'aurelia-binding', 'aurelia-logging'], function (exports, _aureliaBinding, _aureliaLogging) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NodeModel = undefined;

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

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

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

  var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2;

  var log = (0, _aureliaLogging.getLogger)('node-model');

  var NodeModel = exports.NodeModel = (_dec = (0, _aureliaBinding.observable)(), _dec2 = (0, _aureliaBinding.observable)(), _dec3 = (0, _aureliaBinding.computedFrom)('children'), (_class = function () {
    NodeModel.createFromJSON = function createFromJSON(nodes) {
      var models = [];
      nodes.forEach(function (node) {
        var children = node.children;
        if (typeof children === 'function') {
          children = function children() {
            return new Promise(function (resolve, reject) {
              node.children().then(function (ch) {
                resolve(NodeModel.createFromJSON(ch));
              });
            });
          };
        } else {
          children = node.children ? NodeModel.createFromJSON(node.children) : null;
        }
        var payload = node.payload;
        if (!payload) {
          payload = {};
          var keys = Object.keys(node);
          keys.forEach(function (key) {
            switch (key) {
              case 'children':
              case 'title':
                break;
              default:
                payload[key] = node[key];
                break;
            }
          });
        }
        models.push(new NodeModel(node.title, children, payload));
      });
      return models;
    };

    function NodeModel(title, children, payload) {
      _classCallCheck(this, NodeModel);

      this.title = '';
      this.payload = null;
      this.visible = true;
      this.expanded = false;

      _initDefineProp(this, 'focused', _descriptor, this);

      _initDefineProp(this, 'selected', _descriptor2, this);

      this.loading = false;
      this._template = null;
      this._templateModel = null;
      this._tree = null;

      this.title = title;
      this.payload = payload;
      if (typeof children === 'function') {
        this.childrenGetter = children;
      } else {
        this.children = children || [];
      }
      if (this.hasChildren) {
        this.collapseNode(true);
      }
    }

    NodeModel.prototype.expandNode = function expandNode() {
      var _this = this;

      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (!this.expanded || force) {
        var promise = void 0;
        if (this.childrenGetter) {
          this.loading = true;
          promise = this.childrenGetter().then(function (children) {
            children.forEach(function (child) {
              if (_this._template) {
                child._template = _this._template;
              }
              child._tree = _this._tree;
            });
            _this.children = children;
          });
        } else {
          promise = Promise.resolve();
        }
        return promise.then(function () {
          _this.loading = false;
          _this.children.forEach(function (child) {
            child.visible = true;
          });
          _this.expanded = true;
        });
      }
    };

    NodeModel.prototype.collapseNode = function collapseNode() {
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (this.children && (this.expanded || force)) {
        this.children.forEach(function (child) {
          child.visible = false;
        });
        this.expanded = false;
      }
      return Promise.resolve();
    };

    NodeModel.prototype.focusedChanged = function focusedChanged(newValue) {
      if (newValue) {
        this._tree.focusNode(this);
      }
    };

    NodeModel.prototype.toggleFocus = function toggleFocus() {
      this.focused = !this.focused;
    };

    NodeModel.prototype.selectedChanged = function selectedChanged(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue) {
          this._tree.selectNode(this);
        } else if (newValue === false) {
          this._tree.deselectNode(this);
        }
      }
    };

    NodeModel.prototype.selectChildren = function selectChildren() {
      var _this2 = this;

      var recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var promise = void 0;
      if (this.expanded) {
        promise = Promise.resolve();
      } else {
        promise = this.expandNode();
      }
      return promise.then(function () {
        var childPromises = [];
        _this2.children.forEach(function (child) {
          child.selected = true;
          if (recursive) {
            log.debug('selecting children recursively', _this2);
            childPromises.push(child.selectChildren(recursive));
          }
        });
        return Promise.all(childPromises);
      });
    };

    NodeModel.prototype.deselectChildren = function deselectChildren() {
      var _this3 = this;

      var recursive = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var promise = void 0;
      if (this.expanded) {
        promise = Promise.resolve();
      } else {
        promise = this.expandNode();
      }
      return promise.then(function () {
        var childPromises = [];
        _this3.children.forEach(function (child) {
          child.selected = false;
          if (recursive) {
            childPromises.push(child.deselectChildren(recursive));
          }
        });
        return Promise.all(childPromises);
      });
    };

    NodeModel.prototype.toggleSelected = function toggleSelected() {
      this.selected = !this.selected;
    };

    _createClass(NodeModel, [{
      key: 'hasChildren',
      get: function get() {
        var result = false;
        if (this.children) {
          result = this.children.length > 0;
        } else {
          result = true;
        }
        return result;
      }
    }]);

    return NodeModel;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'focused', [_dec], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'selected', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, 'hasChildren', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'hasChildren'), _class.prototype)), _class));
});