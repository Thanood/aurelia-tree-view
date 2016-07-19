define(['exports', 'aurelia-templating', 'aurelia-dependency-injection', 'aurelia-logging', './node-model', '../common/events'], function (exports, _aureliaTemplating, _aureliaDependencyInjection, _aureliaLogging, _nodeModel, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TreeNode = undefined;

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

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var TreeNode = exports.TreeNode = (_dec = (0, _aureliaDependencyInjection.inject)(Element, _aureliaTemplating.ViewCompiler, _aureliaTemplating.ViewResources, _aureliaDependencyInjection.Container), _dec2 = (0, _aureliaTemplating.bindable)(), _dec(_class = (_class2 = function () {
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
      (0, _events.fireEvent)(this.element, 'selected', { node: this.model });
    };

    TreeNode.prototype.toggleNode = function toggleNode() {
      if (this.model.expanded) {
        this.model.collapseNode();
        (0, _events.fireEvent)(this.element, 'collapsed', { node: this.model });
      } else {
        this.model.expandNode();
        (0, _events.fireEvent)(this.element, 'expanded', { node: this.model });
      }
    };

    return TreeNode;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec2], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class2)) || _class);
});