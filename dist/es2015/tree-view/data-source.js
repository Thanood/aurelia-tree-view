var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { observable } from 'aurelia-binding';
import { getLogger } from 'aurelia-logging';
// import {deepEqual} from '../common/deep-equal';
import { NodeModel } from './node-model';
var DataSourceApiImplementation = (function () {
    function DataSourceApiImplementation(dataSource) {
        this.dataSource = dataSource;
        this.settings = this.dataSource.settings;
    }
    DataSourceApiImplementation.prototype.deselectNode = function (node, deselectChildren, recurse) {
        return this.dataSource.deselectNode(node, deselectChildren, recurse);
    };
    ;
    DataSourceApiImplementation.prototype.expandNodeAndChildren = function (node) {
        return this.dataSource.expandNodeAndChildren(node);
    };
    DataSourceApiImplementation.prototype.focusNode = function (node) {
        this.dataSource.focusNode(node);
    };
    DataSourceApiImplementation.prototype.selectNode = function (node, selectChildren, recurse) {
        return this.dataSource.selectNode(node, selectChildren, recurse);
    };
    return DataSourceApiImplementation;
}());
var DataSource = (function () {
    function DataSource(taskQueue) {
        this.taskQueue = taskQueue;
        this.suspendSettingsObservable = false;
        this.suspendSettingsObservable = true;
        this.flatNodes = [];
        this.focusedNode = null;
        this.log = getLogger('aurelia-tree-view/data-source');
        this.selectedNodes = [];
        this.settings = {
            compareEquality: function (args) { return args.a === args.b; },
            expandOnFocus: false,
            processChildrenKey: 'shift',
            processChildrenRecursiveKey: 'alt',
            multiSelect: false,
            templateInfo: null
        };
        this.api = new DataSourceApiImplementation(this);
        this.subscriptions = new Set();
        this.suspendSettingsObservable = false;
    }
    DataSource.prototype.addToFlatNodes = function (node) {
        var _this = this;
        if (!this.flatNodes.find(function (n) { return _this.settings.compareEquality({ a: n.payload, b: node.payload || node }); })) {
            this.log.debug('(after compareEquality) adding to flat nodes', node.payload);
            this.flatNodes.push(node);
        }
    };
    DataSource.prototype.notifySubscribers = function (event, nodes) {
        this.subscriptions.forEach(function (sub) { return sub(event, nodes); });
    };
    DataSource.prototype.setNodeSelection = function (node, isSelected, setChildren, recurse) {
        var _this = this;
        if (setChildren === void 0) { setChildren = false; }
        if (recurse === void 0) { recurse = false; }
        if (typeof node === 'undefined') {
            return Promise.reject(new Error('node is undefined'));
        }
        var expandPath = false;
        var promise;
        if (node instanceof NodeModel) {
            expandPath = true;
            promise = Promise.resolve(node);
        }
        else {
            var found = this.find(node);
            if (found) {
                node = found;
                expandPath = true;
                promise = Promise.resolve(node);
            }
            else {
                promise = this.openPathTo(node);
            }
        }
        return promise.then(function (n) {
            _this.log.debug('setNodeSelection got node', n.payload.title, n.payload);
            if (isSelected) {
                if (_this.settings.multiSelect) {
                    if (_this.selectedNodes.indexOf(n) === -1) {
                        _this.selectedNodes.push(n);
                    }
                }
                else {
                    _this.selectedNodes = [n];
                    _this.flatNodes.forEach(function (node) {
                        if (node !== n) {
                            node.isSelected = false;
                        }
                    });
                }
            }
            else {
                if (_this.settings.multiSelect) {
                    var index = _this.selectedNodes.indexOf(n);
                    if (index > -1) {
                        _this.selectedNodes.splice(index, 1);
                    }
                }
                else {
                    _this.selectedNodes = [];
                }
            }
            if (!_this.settings.multiSelect) {
            }
            _this.taskQueue.queueTask(function () {
                n.isSelected = isSelected;
                if (!_this.settings.multiSelect) {
                    // n.suspendEvents = false;
                    n.isFocused = true;
                }
            });
            // n.isSelected = isSelected;
            // if (!this.settings.multiSelect) {
            //   // n.suspendEvents = false;
            //   n.isFocused = true;
            // }
            if (expandPath && node.parent) {
                var path = _this.getPath(node);
                _this.expandPath(path);
            }
            if (setChildren && node.hasChildren && node.children) {
                return _this.expandNodeAndChildren(node).then(function () {
                    return node.children ? Promise.all(node.children.map(function (child) { return _this.setNodeSelection(child, isSelected, recurse, recurse); })).then(function () { }) : Promise.resolve();
                });
            }
            _this.notifySubscribers('selectionChanged', _this.selectedNodes);
            return Promise.resolve();
        });
    };
    DataSource.prototype.validateNode = function (node) {
        if (!node.title) {
            throw new Error('node must have a "title" property');
        }
        return true;
    };
    DataSource.prototype.visitNode = function (item, parent) {
        var _this = this;
        if (this.validateNode(item)) {
            var node_1;
            var nodeFound = this.find(item);
            if (nodeFound) {
                node_1 = nodeFound;
            }
            else {
                this.log.debug('creating new item', item.title);
                node_1 = new NodeModel(parent);
                node_1.dataSourceApi = this.api;
                node_1.payload = item;
                node_1.taskQueue = this.taskQueue;
                if (typeof item.children === 'function') {
                    var ch_1 = item.children;
                    node_1.childrenGetter = function () {
                        return new Promise(function (resolve) {
                            ch_1().then(function (children) {
                                var nodes = children.map(function (child) { return _this.visitNode(child, node_1); });
                                node_1.children = nodes;
                                resolve(nodes);
                                _this.log.debug('childrenGetter resolved', children, nodes);
                            });
                        });
                    };
                }
                else {
                    if (item.children && item.children.length > 0) {
                        var ch = item.children;
                        node_1.children = ch.map(function (child) { return _this.visitNode(child, node_1); });
                    }
                }
                this.addToFlatNodes(node_1);
            }
            return node_1;
        }
        else {
            throw new Error('invalid node');
        }
    };
    DataSource.prototype.deselectNode = function (node, deselectChildren, recurse) {
        if (deselectChildren === void 0) { deselectChildren = false; }
        if (recurse === void 0) { recurse = false; }
        return this.setNodeSelection(node, false, deselectChildren, recurse);
    };
    DataSource.prototype.expandAllNodes = function () {
        var _this = this;
        return Promise.all(this.nodes.map(function (node) { return _this.expandNodeAndChildren(node); })).then(function () { });
    };
    DataSource.prototype.expandNode = function (node) {
        return node.expand();
    };
    DataSource.prototype.expandNodeAndChildren = function (node) {
        var _this = this;
        return Promise.resolve().then(function () {
            if (node.hasChildren) {
                return node.expand().then(function () {
                    if (node.children) {
                        return Promise.all(node.children.map(function (child) {
                            return _this.expandNodeAndChildren(child);
                        })).then(function () { });
                    }
                    else {
                        throw new Error('node has no children (=== null) after expand');
                    }
                });
            }
            return Promise.resolve();
        });
    };
    DataSource.prototype.expandPath = function (path) {
        return Promise.resolve().then(function () {
            path.forEach(function (p) {
                p.expand();
            });
        });
    };
    DataSource.prototype.filter = function (visitor) {
        var _this = this;
        return this.expandAllNodes()
            .then(function () {
            return Promise.all(_this.flatNodes.filter(function (node, i) { return visitor(node, i); }));
        });
    };
    DataSource.prototype.find = function (item) {
        var _this = this;
        if (this.settings.compareEquality) {
            return this.flatNodes.find(function (node) { return _this.settings.compareEquality({ a: node.payload, b: item }); });
        }
        else {
            throw new Error('no equality comparer set');
        }
    };
    DataSource.prototype.findRoot = function (node) {
        var visit = function (n) {
            if (n.parent) {
                return visit(n.parent);
            }
            return n;
        };
        return visit(node);
    };
    DataSource.prototype.focusNode = function (node) {
        this.flatNodes.forEach(function (node) { return node.isFocused = false; });
        node.isFocused = true;
        this.focusedNode = node;
        if (this.settings.expandOnFocus) {
            node.expand();
        }
        if (!this.settings.multiSelect) {
            this.api.selectNode(node);
        }
    };
    DataSource.prototype.getPath = function (node) {
        var path = [];
        var visit = function (n) {
            if (n.parent) {
                visit(n.parent);
            }
            path.push(n);
        };
        visit(node);
        return path;
    };
    DataSource.prototype.load = function (source) {
        var _this = this;
        this.nodes = source.map(function (item) { return _this.visitNode(item, null); });
        this.notifySubscribers('loaded', this.nodes);
    };
    DataSource.prototype.openPathTo = function (node) {
        var _this = this;
        this.log.debug('opening path to', node.title, node);
        var visit = function (n) {
            var promise;
            if (n.parent) {
                _this.log.debug('before visit recursion', n.parent.title, n.parent);
                promise = visit(n.parent);
            }
            else {
                promise = Promise.resolve();
            }
            return promise.then(function () {
                _this.log.debug('after visit recursion', n.title, n);
                var found = _this.find(n);
                if (found) {
                    _this.log.debug('expanding', found.payload.title, found);
                    return found.expand().then(function () { return found; })
                        .then(function () {
                        _this.log.debug('expanded', found.payload.title);
                        return found;
                    });
                }
                else {
                    return Promise.reject(new Error('node not found: ' + n.title));
                }
            });
        };
        return visit(node);
    };
    DataSource.prototype.selectNode = function (node, selectChildren, recurse) {
        if (selectChildren === void 0) { selectChildren = false; }
        if (recurse === void 0) { recurse = false; }
        return this.setNodeSelection(node, true, selectChildren, recurse);
    };
    DataSource.prototype.selectNodes = function (nodes) {
        var _this = this;
        var mutableNodes = nodes.slice();
        var rest = mutableNodes.splice(0, 1);
        return rest.length > 0
            ? this.selectNode(rest[0]).then(function () { _this.selectNodes(mutableNodes); })
            : Promise.resolve();
    };
    DataSource.prototype.settingsChanged = function (newValue) {
        if (!this.suspendSettingsObservable) {
            this.log.debug('new settings:', newValue);
            this.api.settings = newValue;
        }
    };
    DataSource.prototype.subscribe = function (callback) {
        var _this = this;
        this.subscriptions.add(callback);
        return {
            dispose: function () {
                _this.subscriptions.delete(callback);
            }
        };
    };
    return DataSource;
}());
export { DataSource };
__decorate([
    observable()
], DataSource.prototype, "settings", void 0);
