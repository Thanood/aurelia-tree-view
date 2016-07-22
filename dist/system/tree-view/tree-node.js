'use strict';

System.register(['aurelia-templating', 'aurelia-dependency-injection', 'aurelia-task-queue', 'aurelia-logging', './node-model', '../common/events'], function (_export, _context) {
  "use strict";

  var bindable, ViewCompiler, ViewResources, ViewSlot, Container, inject, TaskQueue, getLogger, NodeModel, fireEvent, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, TreeNode;

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
    setters: [function (_aureliaTemplating) {
      bindable = _aureliaTemplating.bindable;
      ViewCompiler = _aureliaTemplating.ViewCompiler;
      ViewResources = _aureliaTemplating.ViewResources;
      ViewSlot = _aureliaTemplating.ViewSlot;
    }, function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTaskQueue) {
      TaskQueue = _aureliaTaskQueue.TaskQueue;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_nodeModel) {
      NodeModel = _nodeModel.NodeModel;
    }, function (_commonEvents) {
      fireEvent = _commonEvents.fireEvent;
    }],
    execute: function () {
      _export('TreeNode', TreeNode = (_dec = inject(Element, ViewCompiler, ViewResources, Container, TaskQueue), _dec2 = bindable(), _dec(_class = (_class2 = function () {
        function TreeNode(element, viewCompiler, viewResources, container, taskQueue) {
          _classCallCheck(this, TreeNode);

          _initDefineProp(this, 'model', _descriptor, this);

          this.element = element;
          this.viewCompiler = viewCompiler;
          this.viewResources = viewResources;
          this.container = container;
          this.taskQueue = taskQueue;
          this.log = getLogger('tree-node');
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
          var viewSlot = new ViewSlot(this.templateTarget, true);
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

        TreeNode.prototype.focusNode = function focusNode() {
          this.model.focusNode();
          fireEvent(this.element, 'focused', { node: this.model });
        };

        TreeNode.prototype.selectNode = function selectNode(e, permitBubbles) {
          this.model.toggleSelected();
          var self = this;
          this.taskQueue.queueTask(function () {
            fireEvent(self.element, 'selected', { node: self.model });
          });

          return permitBubbles;
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
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec2], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _export('TreeNode', TreeNode);
    }
  };
});