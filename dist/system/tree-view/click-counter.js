System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ClickCounter;
    return {
        setters: [],
        execute: function () {
            ClickCounter = (function () {
                function ClickCounter() {
                    this.clickCount = 0;
                }
                ClickCounter.prototype.increase = function () {
                    this.clickCount++;
                };
                return ClickCounter;
            }());
            exports_1("ClickCounter", ClickCounter);
        }
    };
});
