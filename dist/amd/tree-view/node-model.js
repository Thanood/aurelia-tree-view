define(['exports', 'aurelia-binding'], function (exports, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NodeModel = undefined;

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

  var _dec, _desc, _value, _class;

  var NodeModel = exports.NodeModel = (_dec = (0, _aureliaBinding.computedFrom)('children'), (_class = function () {
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
        models.push(new NodeModel(node.title, children));
      });
      return models;
    };

    function NodeModel(title, children) {
      _classCallCheck(this, NodeModel);

      this.title = '';
      this.visible = true;
      this.expanded = false;
      this.selected = false;
      this.loading = false;

      this.title = title;
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
            _this.children = children;
          });
        } else {
          promise = Promise.resolve();
        }
        promise.then(function () {
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
    };

    NodeModel.prototype.selectNode = function selectNode() {
      this.selected = true;
    };

    NodeModel.prototype.deselectNode = function deselectNode() {
      this.selected = false;
    };

    NodeModel.prototype.isSelected = function isSelected() {
      return this.selected;
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
  }(), (_applyDecoratedDescriptor(_class.prototype, 'hasChildren', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'hasChildren'), _class.prototype)), _class));
});