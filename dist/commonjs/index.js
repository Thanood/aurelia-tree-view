"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(aurelia) {
    aurelia.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node'),
        aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node-template'),
        aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-view')
    ]);
}
exports.configure = configure;
__export(require("./tree-view/tree-node"));
__export(require("./tree-view/tree-node-template"));
__export(require("./tree-view/tree-view"));
