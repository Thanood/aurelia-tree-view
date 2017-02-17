define(["require", "exports"], function (require, exports) {
    "use strict";
    function configure(aurelia) {
        aurelia.globalResources([
            './tree-view/click-counter'
        ]);
    }
    exports.configure = configure;
});
