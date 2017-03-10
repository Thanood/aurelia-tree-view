System.register(["aurelia-pal", "./tree-view/tree-node", "./tree-view/tree-node-template", "./tree-view/tree-view"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(aurelia) {
        aurelia.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node'),
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-node-template'),
            aurelia_pal_1.PLATFORM.moduleName('./tree-view/tree-view')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_pal_1;
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (tree_node_1_1) {
                exportStar_1(tree_node_1_1);
            },
            function (tree_node_template_1_1) {
                exportStar_1(tree_node_template_1_1);
            },
            function (tree_view_1_1) {
                exportStar_1(tree_view_1_1);
            }
        ],
        execute: function () {
        }
    };
});
