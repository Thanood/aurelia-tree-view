var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computedFrom, createOverrideContext } from 'aurelia-binding';
import { inject, Container } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { TaskQueue } from 'aurelia-task-queue';
import { bindable, ViewCompiler, ViewResources, ViewSlot } from 'aurelia-templating';
var TreeNode = (function () {
    function TreeNode(element, viewCompiler, viewResources, container, taskQueue) {
        this.element = element;
        this.viewCompiler = viewCompiler;
        this.viewResources = viewResources;
        this.container = container;
        this.taskQueue = taskQueue;
        this.isSelected = false;
        this.log = getLogger('aurelia-tree-view/tree-node');
        this.viewSlot = null;
    }
    TreeNode.prototype.attached = function () {
        this.updateTemplate();
    };
    Object.defineProperty(TreeNode.prototype, "hasTemplate", {
        get: function () {
            return !!(this.model.dataSourceApi.settings && this.model.dataSourceApi.settings.templateInfo);
        },
        enumerable: true,
        configurable: true
    });
    TreeNode.prototype.modelChanged = function (newValue) {
        if (newValue) {
            newValue.element = this;
            if (newValue.children) {
                newValue.children.forEach(function (child) {
                    child.isVisible = false;
                });
            }
        }
    };
    TreeNode.prototype.focus = function (e, permitBubbles) {
        if (permitBubbles === void 0) { permitBubbles = false; }
        this.model.dataSourceApi.focusNode(this.model);
        return permitBubbles;
    };
    TreeNode.prototype.toggleExpanded = function (e) {
        var _this = this;
        var promise;
        if (this.model) {
            promise = new Promise(function (resolve) {
                _this.taskQueue.queueTask(function () {
                    var promises = [];
                    if (_this.model.isExpanded) {
                        promises.push(_this.model.dataSourceApi.collapseNode(_this.model));
                    }
                    else {
                        promises.push(_this.model.dataSourceApi.expandNode(_this.model));
                    }
                    Promise.all(promises).then(function () {
                        resolve();
                    });
                });
            });
        }
        else {
            promise = Promise.reject(new Error('no tree-node model'));
        }
        return promise;
    };
    TreeNode.prototype.toggleSelected = function (e, permitBubbles) {
        var _this = this;
        if (permitBubbles === void 0) { permitBubbles = false; }
        if (this.model) {
            this.taskQueue.queueTask(function () {
                var processChildren = e[_this.model.dataSourceApi.settings.processChildrenKey + "Key"];
                var processChildrenRecursive = e[_this.model.dataSourceApi.settings.processChildrenRecursiveKey + "Key"];
                if (_this.isSelected) {
                    _this.model.dataSourceApi.selectNode(_this.model, processChildren, processChildrenRecursive);
                }
                else {
                    _this.model.dataSourceApi.deselectNode(_this.model, processChildren, processChildrenRecursive);
                }
            });
        }
        return permitBubbles;
    };
    TreeNode.prototype.unbindTemplate = function () {
        if (this.viewSlot) {
            // @vegarringdal said, switch detached and unbind
            this.viewSlot.detached();
            this.viewSlot.unbind();
            this.viewSlot.removeAll();
        }
    };
    TreeNode.prototype.updateTemplate = function () {
        this.unbindTemplate();
        this.useTemplate();
    };
    TreeNode.prototype.useTemplate = function () {
        if (this.hasTemplate) {
            if (this.model && this.model.dataSourceApi.settings && this.model.dataSourceApi.settings.templateInfo) {
                var templateInfo = this.model.dataSourceApi.settings.templateInfo;
                var viewFactory = this.viewCompiler.compile("<template>" + templateInfo.template + "</template>", this.viewResources);
                var view = viewFactory.create(this.container);
                this.viewSlot = new ViewSlot(this.templateTarget, true);
                this.viewSlot.add(view);
                this.viewSlot.bind(this, createOverrideContext(this, createOverrideContext(templateInfo.viewModel)));
                this.viewSlot.attached();
            }
            else {
                this.log.warn('hasTemplate is true but something was not set');
                this.log.warn('templateTarget', this.templateTarget);
                this.log.warn('settings', this.model.dataSourceApi.settings);
                this.log.warn('templateInfo', this.model.dataSourceApi.settings ? this.model.dataSourceApi.settings.templateInfo : 'null');
                this.log.warn('model', this.model);
            }
        }
    };
    __decorate([
        bindable()
    ], TreeNode.prototype, "model", void 0);
    __decorate([
        computedFrom('model.dataSourceApi.settings')
    ], TreeNode.prototype, "hasTemplate", null);
    TreeNode = __decorate([
        inject(Element, ViewCompiler, ViewResources, Container, TaskQueue)
    ], TreeNode);
    return TreeNode;
}());
export { TreeNode };
