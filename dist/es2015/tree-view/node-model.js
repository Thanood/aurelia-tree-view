var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { computedFrom, observable } from 'aurelia-binding';
import { getLogger } from 'aurelia-logging';
var NodeModel = (function () {
    function NodeModel(parent, children, childrenGetter, payload) {
        this.suspendEvents = false;
        this.log = getLogger('aurelia-tree-view/node-model');
        this.suspendEvents = true;
        this.children = children || null;
        this.childrenGetter = childrenGetter || null;
        this.parent = parent || null;
        this.payload = payload || null;
        this.isExpanded = false;
        this.isFocused = false;
        this.isLoading = false;
        this.isSelected = false;
        this.isVisible = true;
        this.suspendEvents = false;
    }
    Object.defineProperty(NodeModel.prototype, "hasChildren", {
        get: function () {
            var result = false;
            if (this.children) {
                result = this.children.length > 0;
            }
            else if (this.childrenGetter) {
                // has a childrenGetter, so children state is undefined
                result = true;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    NodeModel.prototype.collapse = function (force) {
        if (force === void 0) { force = false; }
        if (this.children && (this.isExpanded || force)) {
            this.children.forEach(function (child) {
                child.isVisible = false;
            });
            this.isExpanded = false;
        }
        return Promise.resolve();
    };
    NodeModel.prototype.expand = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!this.isExpanded || force) {
            this.log.debug('expand called', this.payload);
            var promise = void 0;
            if (this.childrenGetter) {
                this.isLoading = true;
                promise = this.childrenGetter();
            }
            else {
                promise = Promise.resolve();
            }
            return promise.then(function () {
                _this.isLoading = false;
                if (_this.children) {
                    _this.children.forEach(function (child) {
                        child.isVisible = true;
                    });
                }
                _this.isExpanded = true;
            });
        }
        return Promise.resolve();
    };
    NodeModel.prototype.isSelectedChanged = function (newValue) {
        var _this = this;
        if (!this.suspendEvents) {
            this.taskQueue.queueTask(function () {
                if (_this.element) {
                    _this.element.isSelected = newValue;
                }
                else {
                    _this.log.warn('element is not defined yet - use TaskQueue - ', (_this.payload ? _this.payload.title : 'no payload!'));
                    _this.log.warn('local taskQueue', _this.taskQueue);
                }
            });
        }
    };
    __decorate([
        observable()
    ], NodeModel.prototype, "isSelected", void 0);
    __decorate([
        computedFrom('children')
    ], NodeModel.prototype, "hasChildren", null);
    return NodeModel;
}());
export { NodeModel };
