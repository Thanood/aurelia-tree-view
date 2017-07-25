define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // source: http://stackoverflow.com/questions/25456013/javascript-deepequal-comparison
    function deepEqual(x, y) {
        if ((typeof x == 'object' && x != null) && (typeof y == 'object' && y != null)) {
            if (Object.keys(x).length != Object.keys(y).length)
                return false;
            for (var prop in x) {
                if (y.hasOwnProperty(prop)) {
                    if (!deepEqual(x[prop], y[prop]))
                        return false;
                }
                else
                    return false;
            }
            return true;
        }
        else if (x !== y) {
            return false;
        }
        else {
            return true;
        }
    }
    exports.deepEqual = deepEqual;
});
