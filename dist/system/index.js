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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsbUJBQTBCLE9BQStCO1FBQ3JELE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDcEIsc0JBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUM7WUFDNUMsc0JBQVEsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUM7WUFDckQsc0JBQVEsQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUM7U0FDL0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFLRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGcmFtZXdvcmtDb25maWd1cmF0aW9ufSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XHJcbmltcG9ydCB7UExBVEZPUk19IGZyb20gJ2F1cmVsaWEtcGFsJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYTogRnJhbWV3b3JrQ29uZmlndXJhdGlvbikge1xyXG4gICAgYXVyZWxpYS5nbG9iYWxSZXNvdXJjZXMoW1xyXG4gICAgICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vdHJlZS12aWV3L3RyZWUtbm9kZScpLFxyXG4gICAgICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vdHJlZS12aWV3L3RyZWUtbm9kZS10ZW1wbGF0ZScpLFxyXG4gICAgICAgIFBMQVRGT1JNLm1vZHVsZU5hbWUoJy4vdHJlZS12aWV3L3RyZWUtdmlldycpXHJcbiAgICBdKTtcclxufVxyXG5cclxuZXhwb3J0ICogZnJvbSAnLi90cmVlLXZpZXcvdHJlZS1ub2RlJztcclxuZXhwb3J0ICogZnJvbSAnLi90cmVlLXZpZXcvdHJlZS1ub2RlLXRlbXBsYXRlJztcclxuZXhwb3J0ICogZnJvbSAnLi90cmVlLXZpZXcvdHJlZS12aWV3JztcclxuIl19