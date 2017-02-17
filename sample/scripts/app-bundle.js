define('app',["require", "exports"], function (require, exports) {
    "use strict";
    var App = (function () {
        function App() {
            this.message = 'Hello World!';
        }
        return App;
    }());
    exports.App = App;
});

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-tree-view');
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(config) {
    }
    exports.configure = configure;
});

define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <h1>${message}</h1>\n  <click-counter></click-counter>\n</template>\n"; });
define('aurelia-tree-view/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(aurelia) {
        aurelia.globalResources([
            './tree-view/click-counter'
        ]);
    }
    exports.configure = configure;
});
;define('aurelia-tree-view', ['aurelia-tree-view/index'], function (main) { return main; });

define('aurelia-tree-view/index',["require", "exports"], function (require, exports) {
    "use strict";
    function configure(aurelia) {
        aurelia.globalResources([
            './tree-view/click-counter'
        ]);
    }
    exports.configure = configure;
});
;define('aurelia-tree-view', ['aurelia-tree-view/index'], function (main) { return main; });

define('text!aurelia-tree-view/tree-view/click-counter.html', ['module'], function(module) { module.exports = "<template>\r\n    Clicked: ${clickCount}\r\n    <div>\r\n        <button click.delegate=\"increase()\">increase count</button>\r\n    </div>\r\n</template>\r\n"; });
define('aurelia-tree-view/tree-view/click-counter',["require", "exports"], function (require, exports) {
    "use strict";
    var ClickCounter = (function () {
        function ClickCounter() {
            this.clickCount = 0;
        }
        ClickCounter.prototype.increase = function () {
            this.clickCount++;
        };
        return ClickCounter;
    }());
    exports.ClickCounter = ClickCounter;
});

//# sourceMappingURL=app-bundle.js.map