define(["require", "exports"], function (require, exports) {
    "use strict";
    var ClickCounter = (function () {
        function ClickCounter() {
            this.clickCount = 0;
        }
        ClickCounter.prototype.increase = function () {
            this.clickCount++;
            // console.log('cc');
        };
        return ClickCounter;
    }());
    exports.ClickCounter = ClickCounter;
});
