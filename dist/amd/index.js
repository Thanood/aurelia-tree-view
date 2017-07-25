define(["require", "exports", "aurelia-pal", "./tree-view/tree-node", "./tree-view/tree-node-template", "./tree-view/tree-view"], function (require, exports, aurelia_pal_1, tree_node_1, tree_node_template_1, tree_view_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node'),
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node-template'),
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-view')
        ]);
    }
    exports.configure = configure;
    __export(tree_node_1);
    __export(tree_node_template_1);
    __export(tree_view_1);
});
