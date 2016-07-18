'use strict';

exports.__esModule = true;
exports.TreeView = exports.TreeNode = exports.NodeModel = exports.constants = exports.ConfigBuilder = exports.ClickCounter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _desc, _value, _class4, _dec3, _dec4, _class6, _desc2, _value2, _class7, _descriptor, _dec5, _dec6, _dec7, _dec8, _class9, _desc3, _value3, _class10, _descriptor2, _descriptor3, _descriptor4;

exports.configure = configure;
exports.fireEvent = fireEvent;
exports.fireTreeViewEvent = fireTreeViewEvent;

var _aureliaTemplating = require('aurelia-templating');

var _aureliaFramework = require('aurelia-framework');

var _aureliaBinding = require('aurelia-binding');

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClickCounter = exports.ClickCounter = (_dec = (0, _aureliaTemplating.customElement)(constants.elementPrefix + 'click-counter'), _dec(_class = function () {
  function ClickCounter() {
    _classCallCheck(this, ClickCounter);

    this.count = 0;
  }

  ClickCounter.prototype.increment = function increment() {
    this.count++;
  };

  return ClickCounter;
}()) || _class);

var ConfigBuilder = exports.ConfigBuilder = function () {
  function ConfigBuilder() {
    _classCallCheck(this, ConfigBuilder);

    this.globalResources = [];
  }

  ConfigBuilder.prototype.useAll = function useAll() {
    return this.useClickCounter();
  };

  ConfigBuilder.prototype.useClickCounter = function useClickCounter() {
    this.globalResources.push('./tree-view/tree-view');
    return this;
  };

  return ConfigBuilder;
}();

function configure(aurelia, configCallback) {
  var builder = new ConfigBuilder();

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(builder);
  }

  aurelia.globalResources(builder.globalResources);
}

var constants = exports.constants = {
  bindablePrefix: 'au-',
  attributePrefix: 'au-',
  elementPrefix: 'au-',
  eventPrefix: 'tree-view-'
};

function fireEvent(element, name) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var event = new CustomEvent(name, {
    detail: data,
    bubbles: true
  });
  element.dispatchEvent(event);

  return event;
}

function fireTreeViewEvent(element, name) {
  var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return fireEvent(element, '' + constants.eventPrefix + name, data);
}

var NodeModel = exports.NodeModel = (_dec2 = (0, _aureliaBinding.computedFrom)('children'), (_class4 = function () {
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
}(), (_applyDecoratedDescriptor(_class4.prototype, 'hasChildren', [_dec2], Object.getOwnPropertyDescriptor(_class4.prototype, 'hasChildren'), _class4.prototype)), _class4));
var TreeNode = exports.TreeNode = (_dec3 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.LogManager), _dec4 = (0, _aureliaFramework.bindable)(), _dec3(_class6 = (_class7 = function () {
  function TreeNode(element, logManager) {
    _classCallCheck(this, TreeNode);

    _initDefineProp(this, 'model', _descriptor, this);

    this.element = element;
    this.log = logManager.getLogger('tree-node');
  }

  TreeNode.prototype.insertChild = function insertChild(child, before) {
    this.model.children.push(child);
  };

  TreeNode.prototype.removeChild = function removeChild(child) {
    var pos = this.model.children.indexOf(child);
    if (pos > -1) {
      this.model.children.splice(pos, 1);
    } else {
      this.log.warn('child not found in model', child, this.model.children);
    }
  };

  TreeNode.prototype.selectNode = function selectNode() {
    this.model.selectNode();
    fireEvent(this.element, 'selected', { node: this.model });
  };

  TreeNode.prototype.toggleNode = function toggleNode() {
    if (this.model.expanded) {
      this.model.collapseNode();
      fireEvent(this.element, 'collapsed', { node: this.model });
    } else {
      this.model.expandNode();
      fireEvent(this.element, 'expanded', { node: this.model });
    }
  };

  return TreeNode;
}(), (_descriptor = _applyDecoratedDescriptor(_class7.prototype, 'model', [_dec4], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class7)) || _class6);
var TreeView = exports.TreeView = (_dec5 = (0, _aureliaFramework.inject)(Element), _dec6 = (0, _aureliaFramework.bindable)(), _dec7 = (0, _aureliaFramework.bindable)(), _dec8 = (0, _aureliaFramework.bindable)({
  defaultBindingMode: _aureliaFramework.bindingMode.twoWay
}), _dec5(_class9 = (_class10 = function () {
  function TreeView(element) {
    _classCallCheck(this, TreeView);

    _initDefineProp(this, 'expandOnSelect', _descriptor2, this);

    _initDefineProp(this, 'nodes', _descriptor3, this);

    _initDefineProp(this, 'selected', _descriptor4, this);

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
}(), (_descriptor2 = _applyDecoratedDescriptor(_class10.prototype, 'expandOnSelect', [_dec6], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class10.prototype, 'nodes', [_dec7], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class10.prototype, 'selected', [_dec8], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class10)) || _class9);