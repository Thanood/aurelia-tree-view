var ClickCounter = (function () {
    function ClickCounter() {
        this.clickCount = 0;
    }
    ClickCounter.prototype.increase = function () {
        this.clickCount++;
    };
    return ClickCounter;
}());
export { ClickCounter };
