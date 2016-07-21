'use strict';

exports.__esModule = true;
exports.TreeView = exports.TreeNode = exports.TreeViewTemplate = exports.NodeModel = exports.constants = exports.ConfigBuilder = exports.ClickCounter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _dec2, _desc, _value, _class4, _dec3, _dec4, _dec5, _dec6, _class6, _dec7, _dec8, _class8, _desc2, _value2, _class9, _descriptor, _dec9, _dec10, _dec11, _dec12, _class11, _desc3, _value3, _class12, _descriptor2, _descriptor3, _descriptor4;

exports.configure = configure;
exports.fireEvent = fireEvent;
exports.fireTreeViewEvent = fireTreeViewEvent;

var _aureliaTemplating = require('aurelia-templating');

var _aureliaFramework = require('aurelia-framework');

var _aureliaBinding = require('aurelia-binding');

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaLogging = require('aurelia-logging');

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
    this.globalResources.push('./tree-view/tree-node-template');
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
    this.selected = false;
    this.loading = false;
    this._template = null;

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
          if (_this._template) {
            children.forEach(function (child) {
              child._template = _this._template;
            });
          }
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
var TreeViewTemplate = exports.TreeViewTemplate = (_dec3 = (0, _aureliaTemplating.customElement)('tree-node-template'), _dec4 = (0, _aureliaTemplating.noView)(), _dec5 = (0, _aureliaTemplating.processContent)(function (compiler, resources, element, instruction) {
  var html = element.innerHTML;
  if (html !== '') {
    instruction.template = html;
  }
  element.innerHTML = '';
}), _dec6 = (0, _aureliaDependencyInjection.inject)(_aureliaTemplating.TargetInstruction), _dec3(_class6 = _dec4(_class6 = _dec5(_class6 = _dec6(_class6 = function TreeViewTemplate(targetInstruction) {
  _classCallCheck(this, TreeViewTemplate);

  this.log = (0, _aureliaLogging.getLogger)('tree-node-template');

  this.template = targetInstruction.elementInstruction.template;
  this.log.debug(targetInstruction);
}) || _class6) || _class6) || _class6) || _class6);
var TreeNode = exports.TreeNode = (_dec7 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ViewCompiler, _aureliaTemplating.ViewResources, _aureliaDependencyInjection.Container), _dec8 = (0, _aureliaTemplating.bindable)(), _dec7(_class8 = (_class9 = function () {
  function TreeNode(element, viewCompiler, viewResources, container) {
    _classCallCheck(this, TreeNode);

    _initDefineProp(this, 'model', _descriptor, this);

    this.element = element;
    this.viewCompiler = viewCompiler;
    this.viewResources = viewResources;
    this.container = container;
    this.log = (0, _aureliaLogging.getLogger)('tree-node');
  }

  TreeNode.prototype.attached = function attached() {
    if (this.model && this.model._template && this.templateTarget) {
      this.useTemplate();
    }
  };

  TreeNode.prototype.insertChild = function insertChild(child, before) {
    this.model.children.push(child);
  };

  TreeNode.prototype.useTemplate = function useTemplate() {
    var template = this.model._template;
    var viewFactory = this.viewCompiler.compile('<template>' + template + '</template>', this.viewResources);
    var view = viewFactory.create(this.container);
    var viewSlot = new _aureliaTemplating.ViewSlot(this.templateTarget, true);
    viewSlot.add(view);
    viewSlot.bind(this);
    viewSlot.attached();
  };

  TreeNode.prototype.modelChanged = function modelChanged(newValue) {
    if (newValue && newValue._template && this.templateTarget) {
      this.useTemplate();
    }
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
}(), (_descriptor = _applyDecoratedDescriptor(_class9.prototype, 'model', [_dec8], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class9)) || _class8);
var TreeView = exports.TreeView = (_dec9 = (0, _aureliaDependencyInjection.inject)(Element), _dec10 = (0, _aureliaTemplating.bindable)(), _dec11 = (0, _aureliaTemplating.bindable)(), _dec12 = (0, _aureliaTemplating.bindable)({
  defaultBindingMode: _aureliaBinding.bindingMode.twoWay
}), _dec9(_class11 = (_class12 = function () {
  function TreeView(element) {
    _classCallCheck(this, TreeView);

    _initDefineProp(this, 'expandOnSelect', _descriptor2, this);

    _initDefineProp(this, 'nodes', _descriptor3, this);

    _initDefineProp(this, 'selected', _descriptor4, this);

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
    var _this2 = this;

    nodes.forEach(function (node) {
      if (node.children && typeof node.children !== 'function') {
        _this2.enhanceNodes(node.children);
      }
      node._template = _this2.templateElement.au.controller.viewModel.template;
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
}(), (_descriptor2 = _applyDecoratedDescriptor(_class12.prototype, 'expandOnSelect', [_dec10], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class12.prototype, 'nodes', [_dec11], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class12.prototype, 'selected', [_dec12], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class12)) || _class11);