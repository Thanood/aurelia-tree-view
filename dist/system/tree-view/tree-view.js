System.register(["aurelia-dependency-injection", "aurelia-logging", "aurelia-task-queue", "aurelia-pal", "aurelia-templating", "./data-source"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_dependency_injection_1, aurelia_logging_1, aurelia_task_queue_1, aurelia_pal_1, aurelia_templating_1, data_source_1, TreeView;
    return {
        setters: [
            function (aurelia_dependency_injection_1_1) {
                aurelia_dependency_injection_1 = aurelia_dependency_injection_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (aurelia_task_queue_1_1) {
                aurelia_task_queue_1 = aurelia_task_queue_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (data_source_1_1) {
                data_source_1 = data_source_1_1;
            }
        ],
        execute: function () {
            TreeView = (function () {
                function TreeView(element, taskQueue) {
                    this.element = element;
                    this.taskQueue = taskQueue;
                    this.expandOnFocus = false;
                    this.multiSelect = false;
                    this.processChildrenKey = 'ctrl';
                    this.processChildrenRecursiveKey = 'alt';
                    this.compareEquality = function (args) { return args.a === args.b; };
                    this.log = aurelia_logging_1.getLogger('aurelia-tree-view');
                    this.nodes = [];
                    this.subscriptions = [];
                }
                TreeView.prototype.bind = function () {
                    this.multiSelect = (this.multiSelect === 'true' || this.multiSelect === true);
                    if (!this.dataSource) {
                        this.dataSource = new data_source_1.DataSource(this.taskQueue);
                    }
                    // TODO: use a settings service or something similar
                    this.dataSource.settings.compareEquality = this.compareEquality;
                    this.dataSource.settings.expandOnFocus = this.expandOnFocus;
                    this.dataSource.settings.multiSelect = this.multiSelect;
                    this.dataSource.settings.processChildrenKey = this.processChildrenKey;
                    this.dataSource.settings.processChildrenRecursiveKey = this.processChildrenRecursiveKey;
                    this.subscriptions.push(this.dataSource.subscribe(this.handleDataSource.bind(this)));
                };
                TreeView.prototype.unbind = function () {
                    // this.log.debug('disposing subscriptions:', this.subscriptions.length);
                    this.subscriptions.forEach(function (sub) { return sub.dispose(); });
                };
                TreeView.prototype.attached = function () {
                    if (this.templateElement) {
                        var template = this.templateElement.template;
                        var viewModel = this.templateElement.model;
                        this.templateInfo = {
                            template: template,
                            viewModel: viewModel
                        };
                        this.dataSource.settings.templateInfo = this.templateInfo;
                        this.log.debug('template element found template info', this.templateInfo);
                    }
                    else {
                        this.log.debug('no template element');
                    }
                };
                TreeView.prototype.handleDataSource = function (event, nodes) {
                    this.log.debug('data source', event, nodes);
                    switch (event) {
                        case 'loaded':
                            this.nodes = nodes;
                            break;
                        case 'selectionChanged':
                            var event_1 = aurelia_pal_1.DOM.createCustomEvent('selection-changed', { bubbles: true, detail: { nodes: nodes } });
                            this.element.dispatchEvent(event_1);
                            break;
                    }
                };
                return TreeView;
            }());
            __decorate([
                aurelia_templating_1.bindable()
            ], TreeView.prototype, "compareEquality", void 0);
            __decorate([
                aurelia_templating_1.bindable()
            ], TreeView.prototype, "expandOnFocus", void 0);
            __decorate([
                aurelia_templating_1.bindable()
            ], TreeView.prototype, "multiSelect", void 0);
            __decorate([
                aurelia_templating_1.bindable()
            ], TreeView.prototype, "processChildrenKey", void 0);
            __decorate([
                aurelia_templating_1.bindable()
            ], TreeView.prototype, "processChildrenRecursiveKey", void 0);
            __decorate([
                aurelia_templating_1.child('tree-node-template')
            ], TreeView.prototype, "templateElement", void 0);
            TreeView = __decorate([
                aurelia_dependency_injection_1.inject(Element, aurelia_task_queue_1.TaskQueue)
            ], TreeView);
            exports_1("TreeView", TreeView);
        }
    };
});
