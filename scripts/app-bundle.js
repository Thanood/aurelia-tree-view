define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Aurelia Skeleton Bridge App';

      config.map([{ name: 'about', route: ['about'], moduleId: 'about/about', title: 'About' }, { name: 'catalog-index', route: 'catalog-index', moduleId: 'catalog-index/controls', title: 'Catalog-index' }, { name: 'documentation', route: 'documentation', moduleId: 'documentation/documentation', title: 'Documentation' }, { name: 'help', route: 'help', moduleId: 'help/help', title: 'Help' }, { name: 'home', route: '', redirect: 'samples' }, { name: 'installation', route: 'installation', moduleId: 'installation/installation', title: 'Installation' }, { name: 'samples', route: 'samples', moduleId: 'samples/index', title: 'Samples' }]);

      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', 'bootstrap'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;


  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-tree-view', function (plugin) {
      return plugin.useAll();
    });

    aurelia.use.globalResources('shared/collapse-panel');
    aurelia.use.globalResources('shared/markdown');
    aurelia.use.globalResources('shared/logger');
    aurelia.use.globalResources('shared/au-code');
    aurelia.use.globalResources('shared/jsonValueConverter');

    aurelia.start().then(function (au) {
      return au.setRoot('app');
    });
  }
});
define('nav-bar',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NavBar = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var NavBar = exports.NavBar = (_class = function NavBar() {
    _classCallCheck(this, NavBar);

    _initDefineProp(this, 'router', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'router', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return null;
    }
  })), _class);
});
define('route-highlight',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RouteHighlight = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var RouteHighlight = exports.RouteHighlight = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.customAttribute)('route-highlight'), _dec(_class = _dec2(_class = (_class2 = function () {
    function RouteHighlight(element, router, eventAggregator) {
      var _this = this;

      _classCallCheck(this, RouteHighlight);

      _initDefineProp(this, 'routes', _descriptor, this);

      this.element = element;
      this.router = router;
      this.ea = eventAggregator;

      this.subscription = this.ea.subscribe('router:navigation:complete', function () {
        return _this.refresh();
      });
    }

    RouteHighlight.prototype.routesChanged = function routesChanged() {
      this.refresh();
    };

    RouteHighlight.prototype.refresh = function refresh() {
      var instruction = this.router.currentInstruction;
      var isActive = false;

      if (instruction) {
        var activeRoute = instruction.config.name;

        if (Array.isArray(this.routes)) {
          isActive = this.routes.includes(activeRoute);
        } else {
          isActive = this.routes === activeRoute;
        }
      }

      if (isActive) {
        this.highlight();
      } else {
        this.unhighlight();
      }
    };

    RouteHighlight.prototype.highlight = function highlight() {
      this.element.classList.add('active');
    };

    RouteHighlight.prototype.unhighlight = function unhighlight() {
      this.element.classList.remove('active');
    };

    RouteHighlight.prototype.detached = function detached() {
      if (this.subscription) {
        this.subscription();
      }
    };

    return RouteHighlight;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'routes', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('sample-runner',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SampleRunner = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var SampleRunner = exports.SampleRunner = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaFramework.TaskQueue), _dec(_class = function () {
    function SampleRunner(ea, taskQueue) {
      _classCallCheck(this, SampleRunner);

      this.taskQueue = taskQueue;
      this.ea = ea;
    }

    SampleRunner.prototype.activate = function activate(params, route) {
      var sample = route.navModel.config.sample;

      if (!sample) throw new Error('Route does not contain a \'sample\' property');

      this.sample = sample;
    };

    SampleRunner.prototype.restart = function restart() {
      var _this = this;

      var old = this.sample;
      this.sample = undefined;
      this.taskQueue.queueTask(function () {
        _this.sample = old;
      });
    };

    SampleRunner.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.replace;
    };

    return SampleRunner;
  }()) || _class);
});
define('about/about',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var About = exports.About = function About() {
    _classCallCheck(this, About);
  };
});
define('documentation/documentation',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Documentation = exports.Documentation = function Documentation() {
    _classCallCheck(this, Documentation);
  };
});
define('installation/installation',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Installation = exports.Installation = function Installation() {
    _classCallCheck(this, Installation);
  };
});
define('help/help',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Help = exports.Help = function Help() {
    _classCallCheck(this, Help);
  };
});
define('help/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function () {
    function Index() {
      _classCallCheck(this, Index);
    }

    Index.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ name: 'default', route: ['help', ''], moduleId: './help' }, { name: 'free-support', route: ['free-support', ''], moduleId: './help', title: 'Support' }, { name: 'support-exchange', route: 'support-exchange', moduleId: './help', title: 'Support Exchange' }]);
    };

    return Index;
  }();
});
define('shared/au-code',['exports', 'aurelia-framework', 'prism', 'text!prism/themes/prism.css', 'aurelia-loader'], function (exports, _aureliaFramework, _prism, _prism3, _aureliaLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuCode = undefined;

  var _prism2 = _interopRequireDefault(_prism);

  var _prism4 = _interopRequireDefault(_prism3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  _aureliaFramework.DOM.injectStyles(_prism4.default);

  var AuCode = exports.AuCode = (_dec = (0, _aureliaFramework.processContent)(function (compiler, resources, element, instruction) {
    parseCode(element, resources, instruction);
    return true;
  }), _dec2 = (0, _aureliaFramework.customElement)('au-code'), _dec3 = (0, _aureliaFramework.inject)(Element, _aureliaFramework.TargetInstruction, _aureliaLoader.Loader), _dec(_class = _dec2(_class = (0, _aureliaFramework.noView)(_class = _dec3(_class = (_class2 = function () {
    function AuCode(element, targetInstruction, loader) {
      _classCallCheck(this, AuCode);

      _initDefineProp(this, 'language', _descriptor, this);

      _initDefineProp(this, 'url', _descriptor2, this);

      this.element = element;
      this.loader = loader;
      this.html = targetInstruction.behaviorInstructions[0].html;
    }

    AuCode.prototype.urlChanged = function urlChanged() {
      var _this = this;

      if (this.url) {
        this.loader.loadText(this.url).then(function (text) {
          _this.html = text;
          _this.render();
        });
      } else {
        this.html = '';
        this.render();
      }
    };

    AuCode.prototype.attached = function attached() {
      this.render();
    };

    AuCode.prototype.render = function render() {
      jQuery('pre', this.element).remove();
      var pre = document.createElement('pre');
      this.element.appendChild(pre);
      pre.innerHTML = _prism2.default.highlight(this.html, Prism.languages[this.language]);
    };

    return AuCode;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'language', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'url', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class) || _class);


  function parseCode(element, resources, instruction) {
    instruction.html = dedent(decodeHtml(element.innerHTML));
  }

  function decodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  function dedent(str) {
    var match = str.match(/^[ \t]*(?=\S)/gm);
    if (!match) return str;

    var indent = Math.min.apply(Math, match.map(function (el) {
      return el.length;
    }));

    var re = new RegExp('^[ \\t]{' + indent + '}', 'gm');
    return indent > 0 ? str.replace(re, '') : str;
  }
});
define('shared/collapse-panel',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CollapsePanel = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

  var CollapsePanel = exports.CollapsePanel = (_class = function () {
    function CollapsePanel() {
      _classCallCheck(this, CollapsePanel);

      _initDefineProp(this, 'panelTitle', _descriptor, this);

      _initDefineProp(this, 'footer', _descriptor2, this);

      _initDefineProp(this, 'allowCollapse', _descriptor3, this);

      _initDefineProp(this, 'collapsed', _descriptor4, this);

      _initDefineProp(this, 'panelClass', _descriptor5, this);
    }

    CollapsePanel.prototype.toggle = function toggle() {
      if (this.allowCollapse) {
        this.collapsed = !this.collapsed;
      }
    };

    return CollapsePanel;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'panelTitle', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'footer', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'allowCollapse', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'collapsed', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'panelClass', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return 'default';
    }
  })), _class);
});
define('shared/jsonValueConverter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var JsonValueConverter = exports.JsonValueConverter = function () {
    function JsonValueConverter() {
      _classCallCheck(this, JsonValueConverter);
    }

    JsonValueConverter.prototype.toView = function toView(value) {
      return JSON.stringify(value);
    };

    return JsonValueConverter;
  }();
});
define('shared/logger',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Logger = exports.Logger = function () {
    function Logger() {
      _classCallCheck(this, Logger);
    }

    Logger.prototype.attached = function attached() {
      this.overrideStyles();
    };

    Logger.prototype.log = function log(message, isError, container) {
      var lastContainer = $('.console div:first', container);
      var counter = lastContainer.find('.count').detach();
      var lastMessage = lastContainer.text();
      var count = 1 * (counter.text() || 1);

      lastContainer.append(counter);

      if (!lastContainer.length || message !== lastMessage) {
        $('<div' + (isError ? ' class=\'error\'' : '') + '/>').css({
          marginTop: -24,
          backgroundColor: isError ? '#ffbbbb' : '#b2ebf2'
        }).html(message).prependTo($('.console', container)).animate({ marginTop: 0 }, 300).animate({ backgroundColor: isError ? '#ffdddd' : '#ffffff' }, 800);
      } else {
        count++;

        if (counter.length) {
          counter.html(count);
        } else {
          lastContainer.html(lastMessage).append('<span class=\'count\'>' + count + '</span>');
        }
      }
    };

    Logger.prototype.error = function error(message) {
      this.log(message, true);
    };

    Logger.prototype.overrideStyles = function overrideStyles() {
      jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function (i, attr) {
        jQuery.fx.step[attr] = function (fx) {
          if (!fx.state || _typeof(fx.end) === _typeof('')) {
            fx.start = getColor(fx.elem, attr);
            fx.end = getRGB(fx.end);
          }

          fx.elem.style[attr] = ['rgb(', [Math.max(Math.min(parseInt(fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0], 10), 255), 0), Math.max(Math.min(parseInt(fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1], 10), 255), 0), Math.max(Math.min(parseInt(fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2], 10), 255), 0)].join(','), ')'].join('');
        };
      });
    };

    return Logger;
  }();

  function getRGB(color) {
    var result = void 0;

    if (color && color.constructor === Array && color.length === 3) {
      return color;
    }

    result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color);
    if (result) {
      return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
    }

    result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color);
    if (result) {
      return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
    }

    return jQuery.trim(color).toLowerCase();
  }

  function getColor(elem, attr) {
    var color = void 0;

    do {
      color = jQuery.css(elem, attr);

      if (color && color !== 'transparent' || jQuery.nodeName(elem, 'body')) {
        break;
      }

      attr = 'backgroundColor';

      elem = elem.parentNode;
    } while (elem);

    return getRGB(color);
  }
});
define('shared/markdown',['exports', 'aurelia-framework', 'showdown', 'aurelia-loader'], function (exports, _aureliaFramework, _showdown, _aureliaLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AuMarkdown = undefined;

  var showdown = _interopRequireWildcard(_showdown);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

  var AuMarkdown = exports.AuMarkdown = (_dec = (0, _aureliaFramework.customElement)('au-markdown'), _dec2 = (0, _aureliaFramework.inject)(Element, _aureliaLoader.Loader), _dec(_class = (0, _aureliaFramework.noView)(_class = _dec2(_class = (_class2 = function () {
    function AuMarkdown(element, loader) {
      _classCallCheck(this, AuMarkdown);

      _initDefineProp(this, 'url', _descriptor, this);

      this.element = element;
      this.loader = loader;

      this.converter = new showdown.Converter();
    }

    AuMarkdown.prototype.urlChanged = function urlChanged() {
      var _this = this;

      if (this.url) {
        this.loader.loadText('' + this.url).then(function (text) {
          _this.element.innerHTML = _this.converter.makeHtml(text);
          PR.prettyPrint();
        }).then(function () {
          var event = new CustomEvent('loaded', {
            bubbles: true
          });
          _this.element.dispatchEvent(event);
        });
      } else {
        this.element.innerHTML = '';
      }
    };

    return AuMarkdown;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'url', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class) || _class);
});
define('shared/registry',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Registry = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Registry = exports.Registry = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Loader), _dec(_class = function () {
    function Registry(loader) {
      _classCallCheck(this, Registry);

      this.loader = loader;
    }

    Registry.prototype.load = function load(config, control) {
      var _this = this;

      return this.loader.loadText('samples/' + control + '/registry.json').then(function (registryString) {
        var registry = JSON.parse(registryString);
        config.title = registry.title;

        var map = [];

        var _loop = function _loop() {
          if (_isArray) {
            if (_i >= _iterator.length) return 'break';
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) return 'break';
            _ref = _i.value;
          }

          var _sample = _ref;

          var sample = registry.samples[_sample];

          sample.path = 'samples/' + control + '/' + _sample;
          sample.route = sample.route || _sample;
          sample.title = sample.title || _this.getTitleFromRoute(_sample);
          sample.moduleId = sample.moduleId || 'sample-runner';
          sample.nav = sample.nav || true;
          sample.files = sample.files || ['html', 'js'];
          sample.files.forEach(function (extension) {
            sample[extension] = sample.path + '.' + extension;
          });

          if (sample.default === true) {
            map.push({
              title: sample.title,
              redirect: sample.route,
              route: '',
              sample: sample
            });
          }

          map.push({
            title: sample.title,
            nav: sample.nav,
            moduleId: sample.moduleId,
            route: sample.route,
            sample: sample
          });
        };

        for (var _iterator = Object.keys(registry.samples), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          var _ret = _loop();

          if (_ret === 'break') break;
        }

        config.map(map);
      });
    };

    Registry.prototype.getTitleFromRoute = function getTitleFromRoute(route) {
      route = route.replace(/-/g, ' ');
      route = route.charAt(0).toUpperCase() + route.slice(1);
      return route;
    };

    return Registry;
  }()) || _class);
});
define('samples/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function () {
    function Index() {
      _classCallCheck(this, Index);
    }

    Index.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Samples';

      config.map([{ name: 'main', route: 'main', moduleId: './main/index', title: 'main' }, { name: 'default', route: '', redirect: 'main' }]);
      this.router = router;
    };

    return Index;
  }();
});
define('samples/main/basic-use',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BasicUse = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BasicUse = exports.BasicUse = function () {
    function BasicUse() {
      _classCallCheck(this, BasicUse);

      this.nodes = [];
    }

    BasicUse.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
    };

    BasicUse.prototype.clearSelection = function clearSelection() {
      this.tree.clearSelection();
    };

    return BasicUse;
  }();
});
define('samples/main/custom-compare',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CustomCompare = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CustomCompare = exports.CustomCompare = function () {
    function CustomCompare() {
      _classCallCheck(this, CustomCompare);

      this.nodes = [];
      this.selected = [];
    }

    CustomCompare.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var manhattan = new _aureliaTreeView.NodeModel('Manhattan');
      var brooklyn = new _aureliaTreeView.NodeModel('Brooklyn');
      var bronx = new _aureliaTreeView.NodeModel('Bronx');
      var queens = new _aureliaTreeView.NodeModel('Queens');
      var statenIsland = new _aureliaTreeView.NodeModel('Staten Island');

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', function () {
        return new Promise(function (resolve) {
          window.setTimeout(function () {
            resolve([manhattan, brooklyn, bronx, queens, statenIsland]);
          }, 500);
        });
      }), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
      this.selected = [oregon, oregon.children[0], newYork, newYork.children[0], manhattan, brooklyn, bronx, queens, statenIsland];
    };

    CustomCompare.prototype.compareNode = function compareNode(a, b) {
      return a.title === b.title;
    };

    return CustomCompare;
  }();
});
define('samples/main/drag-and-drop',['exports', 'aurelia-tree-view', 'dragula'], function (exports, _aureliaTreeView, _dragula) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DragAndDrop = undefined;

  var _dragula2 = _interopRequireDefault(_dragula);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DragAndDrop = exports.DragAndDrop = function () {
    function DragAndDrop() {
      _classCallCheck(this, DragAndDrop);

      this.nodes = [];
      this.dragApi = null;
    }

    DragAndDrop.prototype.attached = function attached() {
      this.nodes = this.getNodes();
      this.activateDnd(this.tree);
    };

    DragAndDrop.prototype.detached = function detached() {
      this.deactivateDnd();
    };

    DragAndDrop.prototype.activateDnd = function activateDnd(viewModel) {
      this.dragApi = (0, _dragula2.default)({
        isContainer: function isContainer(el) {
          if (!el) {
            return false;
          }

          return el.tagName === 'TREE-NODE' || el === viewModel.element;
        },
        revertOnSpill: true
      });
      this.dragApi._viewModel = viewModel;
      this.trackDrop(this.dragApi);
      this.trackOver(this.dragApi);
    };

    DragAndDrop.prototype.deactivateDnd = function deactivateDnd() {
      this.dragApi.destroy();
      this.dragApi = null;
    };

    DragAndDrop.prototype.trackDrop = function trackDrop(dragApi) {
      dragApi.on('drop', function (el, container, source, sibling) {
        console.log('dragula drop from', source);
        console.log('dragula drop on', container);
        console.log('dragula drop sibling', sibling);
        console.log('dragApi viewModel', dragApi._viewModel);
        dragApi.cancel();

        var sourceViewModel = source.au['tree-node'].viewModel;
        var targetViewModel = (container.au['tree-node'] || container.au['tree-view']).viewModel;

        if (sibling !== null) {
          while (sibling.tagName !== 'TREE-NODE') {
            sibling = sibling.parentNode;
          }
        }
        var siblingViewModel = sibling ? sibling.au['tree-node'].viewModel : null;

        dragApi._viewModel.moveNode(sourceViewModel, targetViewModel, siblingViewModel);
      });
    };

    DragAndDrop.prototype.trackOver = function trackOver(dragApi) {
      dragApi.on('over', function (el, container, source) {
        container.classList.add('drag-over');
      });
      dragApi.on('out', function (el, container, source) {
        container.classList.remove('drag-over');
      });
    };

    DragAndDrop.prototype.getNodes = function getNodes() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      return [texas, newYork, oregon, california];
    };

    return DragAndDrop;
  }();
});
define('samples/main/events',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Events = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Events = exports.Events = function () {
    function Events() {
      _classCallCheck(this, Events);

      this.nodes = [];
    }

    Events.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
    };

    Events.prototype.onCollapsed = function onCollapsed(e) {
      this.logger.log('node collapsed: ' + e.detail.node.title);
    };

    Events.prototype.onExpanded = function onExpanded(e) {
      this.logger.log('node expanded: ' + e.detail.node.title);
    };

    Events.prototype.onFocus = function onFocus(e) {
      this.logger.log('node focused: ' + e.detail.node.title);
    };

    Events.prototype.onSelect = function onSelect(e) {
      console.log('[sample] events - ]', e);
      var titles = e.detail.nodes.map(function (node) {
        return node.title;
      }).join(', ');
      this.logger.log('node selected: ' + titles);
    };

    return Events;
  }();
});
define('samples/main/expand-on-focus',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExpandOnFocus = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ExpandOnFocus = exports.ExpandOnFocus = function () {
    function ExpandOnFocus() {
      _classCallCheck(this, ExpandOnFocus);

      this.nodes = [];
    }

    ExpandOnFocus.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
    };

    return ExpandOnFocus;
  }();
});
define('samples/main/index',['exports', 'aurelia-framework', 'shared/registry'], function (exports, _aureliaFramework, _registry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Index = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var Index = exports.Index = (_dec = (0, _aureliaFramework.useView)('shared/showcase.html'), _dec2 = (0, _aureliaFramework.inject)(_registry.Registry), _dec(_class = _dec2(_class = function () {
    function Index(registry) {
      _classCallCheck(this, Index);

      this.registry = registry;
    }

    Index.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;

      return this.registry.load(config, 'main');
    };

    return Index;
  }()) || _class) || _class);
});
define('samples/main/init-from-json',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InitFromJson = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var InitFromJson = exports.InitFromJson = function () {
    function InitFromJson() {
      _classCallCheck(this, InitFromJson);

      this.nodes = [];
    }

    InitFromJson.prototype.attached = function attached() {
      this.nodes = _aureliaTreeView.NodeModel.createFromJSON(this.getNodes());
    };

    InitFromJson.prototype.getNodes = function getNodes() {
      return [{
        title: 'Texas',
        children: [{
          title: 'Austin',
          rnd: Math.floor(Math.random() * 1000)
        }, {
          title: 'Houston',
          rnd: Math.floor(Math.random() * 1000)
        }],
        rnd: Math.floor(Math.random() * 1000)
      }, {
        title: 'New York',
        children: [{
          title: 'New York City',
          children: [{
            title: 'Manhattan'
          }, {
            title: 'Brooklyn'
          }, {
            title: 'Bronx'
          }, {
            title: 'Queens'
          }, {
            title: 'Staten Island'
          }]
        }, {
          title: 'Buffalo'
        }],
        rnd: Math.floor(Math.random() * 1000)
      }, {
        title: 'Oregon',
        children: [{
          title: 'Portland'
        }],
        rnd: Math.floor(Math.random() * 1000)
      }, {
        title: 'California',
        children: [{
          title: 'Los Angeles'
        }, {
          title: 'San Francisco'
        }],
        rnd: Math.floor(Math.random() * 1000)
      }];
    };

    return InitFromJson;
  }();
});
define('samples/main/lazy-load',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LazyLoad = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LazyLoad = exports.LazyLoad = function () {
    function LazyLoad() {
      _classCallCheck(this, LazyLoad);

      this.nodes = [];
      this.forceLazyLoad = false;
    }

    LazyLoad.prototype.attached = function attached() {
      this.nodes = _aureliaTreeView.NodeModel.createFromJSON(this.getNodes());
    };

    LazyLoad.prototype.getNodes = function getNodes() {
      return [{
        title: 'Texas',
        children: [{ title: 'Austin' }, { title: 'Houston' }]
      }, {
        title: 'New York',
        children: [{
          title: 'New York City',
          children: function children() {
            return new Promise(function (resolve, reject) {
              window.setTimeout(function () {
                resolve([{ title: 'Manhattan' }, { title: 'Brooklyn' }, { title: 'Bronx' }, { title: 'Queens' }, { title: 'Staten Island' }]);
              }, 500);
            });
          }
        }, {
          title: 'Buffalo'
        }]
      }, {
        title: 'Oregon',
        children: [{ title: 'Portland' }]
      }, {
        title: 'California',
        children: function children() {
          return new Promise(function (resolve, reject) {
            resolve([]);
          });
        }
      }];
    };

    return LazyLoad;
  }();
});
define('samples/main/multi-select',['exports', 'aurelia-framework', 'aurelia-tree-view'], function (exports, _aureliaFramework, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MultiSelect = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MultiSelect = exports.MultiSelect = function () {
    function MultiSelect() {
      _classCallCheck(this, MultiSelect);

      this.nodes = [];
      this.selected = [];
      this.selectedNodes = '';
    }

    MultiSelect.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', function () {
        return new Promise(function (resolve, reject) {
          window.setTimeout(function () {
            resolve([new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]);
          }, 500);
        });
      }), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);

      var fourLevels = new _aureliaTreeView.NodeModel('Four Levels (level 1)', [new _aureliaTreeView.NodeModel('Level 2', [new _aureliaTreeView.NodeModel('Level 3', [new _aureliaTreeView.NodeModel('Level 4')])])]);

      var fiveLevels = new _aureliaTreeView.NodeModel('Five Levels (level 1)', [new _aureliaTreeView.NodeModel('Level 2', [new _aureliaTreeView.NodeModel('Level 3', [new _aureliaTreeView.NodeModel('Level 4', [new _aureliaTreeView.NodeModel('Level 5')])])])]);

      this.nodes = [texas, newYork, oregon, california, fourLevels, fiveLevels];
    };

    MultiSelect.prototype.onSelect = function onSelect(e) {
      this.selectedNodes = this.selected.map(function (node) {
        return node.title;
      }).join(', ');
    };

    return MultiSelect;
  }();
});
define('samples/main/node-template-commands',['exports', 'aurelia-framework', 'aurelia-tree-view'], function (exports, _aureliaFramework, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NodeTemplateCommands = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var stockCommands = [{ title: 'edit' }, { title: 'delete' }, { title: 'export' }, { title: 'lock' }];

  var NodeTemplateCommands = exports.NodeTemplateCommands = function () {
    NodeTemplateCommands.prototype.executeCommand = function executeCommand(cmd, model) {
      this.logger.log('command execute: ' + cmd.title + ' ' + model.title);
    };

    function NodeTemplateCommands() {
      _classCallCheck(this, NodeTemplateCommands);

      this.commands = [];
      this.nodes = [];
      this.nodeInterface = {
        commands: [],
        executeCommand: this.executeCommand.bind(this)
      };

      this.nodeInterface.commands = this.commands;
    }

    NodeTemplateCommands.prototype.attached = function attached() {
      var _this = this;

      window.setTimeout(function () {
        _this.nodeInterface.commands = stockCommands;
      }, 500);

      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
    };

    NodeTemplateCommands.prototype.clearSelection = function clearSelection() {
      this.tree.clearSelection();
    };

    return NodeTemplateCommands;
  }();
});
define('samples/main/node-template',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NodeTemplate = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NodeTemplate = exports.NodeTemplate = function () {
    function NodeTemplate() {
      var _this = this;

      _classCallCheck(this, NodeTemplate);

      this.clickedNode = null;
      this.nodes = [];
      this.nodeInterface = {
        nodeClicked: function nodeClicked(node) {
          console.log("I'm here", node);
          _this.clickedNode = node;
        }
      };
    }

    NodeTemplate.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
    };

    return NodeTemplate;
  }();
});
define('samples/main/payload',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Payload = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Payload = exports.Payload = function () {
    function Payload() {
      _classCallCheck(this, Payload);

      this.nodes = [];
    }

    Payload.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Houston', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })], { test: 'the payload', num: Math.floor(Math.random() * 1000) });

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Brooklyn', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Bronx', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Queens', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Staten Island', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })], { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('Buffalo', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')], { test: 'the payload', num: Math.floor(Math.random() * 1000) });

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) }), new _aureliaTreeView.NodeModel('San Francisco', null, { test: 'the payload', num: Math.floor(Math.random() * 1000) })], { test: 'the payload', num: Math.floor(Math.random() * 1000) });
      this.nodes = [texas, newYork, oregon, california];
    };

    Payload.prototype.onCollapsed = function onCollapsed(e) {
      this.logger.log('node collapsed: ' + e.detail.node.title);
    };

    Payload.prototype.onExpanded = function onExpanded(e) {
      this.logger.log('node expanded: ' + e.detail.node.title);
    };

    Payload.prototype.onSelect = function onSelect(e) {
      this.logger.log('node selected: ' + e.detail.nodes[0].title + ', ' + JSON.stringify(e.detail.nodes[0].payload));
    };

    return Payload;
  }();
});
define('samples/main/preselect',['exports', 'aurelia-tree-view'], function (exports, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PreSelect = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PreSelect = exports.PreSelect = function () {
    function PreSelect() {
      _classCallCheck(this, PreSelect);

      this.nodes = [];
      this.selected = [];
    }

    PreSelect.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', [new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);
      this.nodes = [texas, newYork, oregon, california];
      this.selected = [oregon, oregon.children[0]];
    };

    return PreSelect;
  }();
});
define('samples/main/select-on-focus',['exports', 'aurelia-framework', 'aurelia-tree-view'], function (exports, _aureliaFramework, _aureliaTreeView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SelectOnFocus = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SelectOnFocus = exports.SelectOnFocus = function () {
    function SelectOnFocus() {
      _classCallCheck(this, SelectOnFocus);

      this.nodes = [];
      this.selected = [];
      this.selectedNodes = '';
    }

    SelectOnFocus.prototype.attached = function attached() {
      var texas = new _aureliaTreeView.NodeModel('Texas', [new _aureliaTreeView.NodeModel('Austin'), new _aureliaTreeView.NodeModel('Houston')]);

      var newYork = new _aureliaTreeView.NodeModel('New York', [new _aureliaTreeView.NodeModel('New York City', function () {
        return new Promise(function (resolve, reject) {
          window.setTimeout(function () {
            resolve([new _aureliaTreeView.NodeModel('Manhattan'), new _aureliaTreeView.NodeModel('Brooklyn'), new _aureliaTreeView.NodeModel('Bronx'), new _aureliaTreeView.NodeModel('Queens'), new _aureliaTreeView.NodeModel('Staten Island')]);
          }, 500);
        });
      }), new _aureliaTreeView.NodeModel('Buffalo')]);

      var oregon = new _aureliaTreeView.NodeModel('Oregon', [new _aureliaTreeView.NodeModel('Portland')]);

      var california = new _aureliaTreeView.NodeModel('California', [new _aureliaTreeView.NodeModel('Los Angeles'), new _aureliaTreeView.NodeModel('San Francisco')]);

      var fourLevels = new _aureliaTreeView.NodeModel('Four Levels (level 1)', [new _aureliaTreeView.NodeModel('Level 2', [new _aureliaTreeView.NodeModel('Level 3', [new _aureliaTreeView.NodeModel('Level 4')])])]);

      var fiveLevels = new _aureliaTreeView.NodeModel('Five Levels (level 1)', [new _aureliaTreeView.NodeModel('Level 2', [new _aureliaTreeView.NodeModel('Level 3', [new _aureliaTreeView.NodeModel('Level 4', [new _aureliaTreeView.NodeModel('Level 5')])])])]);

      this.nodes = [texas, newYork, oregon, california, fourLevels, fiveLevels];
    };

    SelectOnFocus.prototype.onSelect = function onSelect(e) {
      this.selectedNodes = this.selected.map(function (node) {
        return node.title;
      }).join(', ');
    };

    return SelectOnFocus;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"bootstrap/css/bootstrap.css\"></require>\n    <require from='./nav-bar'></require>\n\n\n    <nav-bar router.bind=\"router\"></nav-bar>\n\n    <div class=\"page-host\">\n        <router-view></router-view>\n    </div>\n</template>"; });
define('text!nav-bar.css', ['module'], function(module) { module.exports = "/*nav-bar {\r\n  background-color: #eee;\r\n  display: block;\r\n  width: 100%;\r\n  height: 35px;\r\n  line-height: 35px;\r\n}\r\n\r\nnav-bar a {\r\n  display: inline-block;\r\n}\r\n\r\nnav-bar a.active {\r\n  background-color: #ccc;\r\n}*/\r\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template>\n  <nav class=\"navbar navbar-default\">\n    <require from=\"./route-highlight\"></require>\n\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" route-href=\"route: samples\">\n        <span>Component Catalog</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav\">\n\n        <li route-highlight=\"routes: about\">\n          <a route-href=\"route: about\">About</a>\n        </li>\n\n        <li route-highlight=\"routes: installation\">\n          <a route-href=\"route: installation\">Installation</a>\n        </li>\n\n        <!-- not sure about catalog index for a single component catalog -->\n        <!--<li route-highlight=\"routes: project-status\">\n          <a route-href=\"route: catalog-index\">Catalog index</a>\n        </li>-->\n\n <!--   <li route-highlight=\"routes: theme\">\n          <a route-href=\"route: theme\">Theme</a>\n        </li> -->\n\n        <li route-highlight=\"routes: documentation\">\n          <a route-href=\"route: documentation\">Documentation</a>\n        </li>\n\n        <li route-highlight=\"routes: help\">\n          <a route-href=\"route: help\">Help</a>\n        </li>\n\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"loader\" if.bind=\"router.isNavigating\">\n          <i class=\"fa fa-spinner fa-spin fa-2x\"></i>\n        </li>\n        <li class=\"navbar-brand\">&lt;tree-view&gt;</li>\n      </ul>\n    </div>\n  </nav>\n</template>\n"; });
define('text!shared/showcase.css', ['module'], function(module) { module.exports = "section.showcase h3 {\r\n  padding: 10px 0;\r\n}\r\n"; });
define('text!sample-runner.html', ['module'], function(module) { module.exports = "<template>\n    <section>\n\n        <collapse-panel panel-title.bind=\"sample.title\">\n            <div id=\"exampleWrap\">\n                <compose view-model.bind=\"sample.path\"></compose>\n            </div>\n        </collapse-panel>\n        <collapse-panel panel-title=\"Code Preview\">\n\n            <ul class=\"nav nav-tabs\">\n                <li class=\"active\" show.bind=\"sample.html\"><a data-toggle=\"tab\" href=\"#html\">HTML</a></li>\n                <li show.bind=\"sample.js\"><a data-toggle=\"tab\" href=\"#javascript\">Javascript</a></li>\n                <li show.bind=\"sample.css\"><a data-toggle=\"tab\" href=\"#css\">CSS</a></li>\n                <li show.bind=\"sample.json\"><a data-toggle=\"tab\" href=\"#json\">JSON</a></li>\n                <li show.bind=\"sample.md\"><a data-toggle=\"tab\" href=\"#md\">Documentation</a></li>\n            </ul>\n\n            <div class=\"tab-content\">\n                <div class=\"tab-pane active fade in\" id=\"html\">\n                    <au-code language=\"markup\" url.bind=\"sample.html\">\n                    </au-code>\n                </div>\n\n                <div class=\"tab-pane fade\" id=\"javascript\">\n                    <au-code language=\"javascript\" url.bind=\"sample.js\">\n                    </au-code>\n                </div>\n\n                <div class=\"tab-pane fade\" id=\"css\">\n                    <au-code language=\"css\" url.bind=\"sample.css\">\n                    </au-code>\n                </div>\n\n                <div class=\"tab-pane fade\" id=\"json\">\n                    <au-code language=\"javascript\" url.bind=\"sample.json\">\n                    </au-code>\n                </div>\n\n                <div class=\"tab-pane fade\" id=\"md\">\n                    <au-markdown url.bind=\"sample.md\">\n                    </au-markdown>\n                </div>\n            </div>\n\n        </collapse-panel>\n    </section>\n</template>\n"; });
define('text!samples/main/drag-and-drop.css', ['module'], function(module) { module.exports = "tree-view.drag-over {\r\n  border: dashed 1px red;\r\n}\r\n\r\ntree-view .drag-over {\r\n  border: dashed 1px grey;\r\n}\r\n"; });
define('text!about/about.html', ['module'], function(module) { module.exports = "<template>\n  <section>\n    <h2>About Aurelia-TreeView</h2>\n\n\n            <!-- Row 1 - 1 column (logo image) -->\n            <div class=\"row\">\n                <div class=\"col-xs-12 col-sm-4\">\n                    <img src=\"images/ab-logo-skeleton.png\" >\n                </div>\n            </div>\n\n\n    <div>\n      <!-- Row 2 - 2 columns (text) -->\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-sm-6\">\n          <p>\n            Aurelia is a next generation UI framework. Whether you're building apps for the browser, mobile or desktop, Aurelia can enable\n            you to not only create amazing UI, but do it in a way that is maintainable, testable and extensible.\n          </p>\n          <p>\n            Aurelia is just JavaScript. However, it's not yesterday's JavaScript, but the JavaScript of tomorrow. By using modern tooling\n            we've been able to write Aurelia from the ground up in ECMAScript 2016. This means we have native modules, classes,\n            decorators and more at our disposal...and you have them too.\n          </p>\n          <p>\n            Not only is Aurelia written in modern and future JavaScript, but it also takes a modern approach to architecture. In the\n            past, frameworks have been monolithic beasts. Not Aurelia though. It's built as a series of collaborating libraries.\n            Taken together, they form a powerful and robust framework for building Single Page Apps (SPAs). However, Aurelia's\n            libraries can often be used individually, in traditional web sites or even on the server-side through technologies\n            like NodeJS.\n          </p>\n          <p>\n            Aurelia is open source, but unlike much open source in the JavaScript space, Aurelia is an official product with commercial\n            backing. If your business is going to spend significant money building software, you want to do it on a platform\n            that's committed to you as a customer. You want to be able to form a relationship with your technology provider\n            to ensure that you and your developers have a solid platform upon which to build your business now and in the\n            years to come.\n          </p>\n        </div>\n\n        <div class=\"col-xs-12 col-sm-6\">\n\n          <p>\n            It's a tree-view :-)\n            More to be written...\n          </p>\n        </div>\n      </div>\n\n    </div>\n  </section>\n</template>\n"; });
define('text!samples/main/multi-select.css', ['module'], function(module) { module.exports = "/* compensate for Bootstrap layout */\ntree-node .tree-node-title label {\n  margin: 0;\n}\n\ntree-node .tree-node-title label input[type=\"checkbox\"] {\n  margin: 0;\n  position: relative;\n  top: 2px;\n}\n"; });
define('text!documentation/documentation.html', ['module'], function(module) { module.exports = "<template>\n  <section>\n    <div style=\"height: 790px;\">\n      <h4> This is the documentation for Aurelia KendoUI bridge. Replace with it real documentation for this bridge</h4>\n      <br>\n\n      <iframe src=\"https://aurelia-ui-toolkits.gitbooks.io/kendoui-bridge-docs/content/index.html\"\n              width=\"96%\" height=\"780px\" >\n              <p>Your browser does not support iframes.</p>\n      </iframe>\n\n    </div>\n  </section>\n</template>"; });
define('text!samples/main/node-template-commands.css', ['module'], function(module) { module.exports = ".node-template-commands-sample {\n  width: 300px;\n  position: relative;\n}\n\n.node-template-commands-sample tree-view tree-node div ul .tree-node__title-wrapper {\n  width: 100%;\n}\n"; });
define('text!help/help.html', ['module'], function(module) { module.exports = "<template>\n  <section>\n    <h4>Component Catalog Help</h4>\n\n      <div>\n\n        <!-- Tabs -->\n        <ul class=\"nav nav-tabs\" role=\"tablist\">\n          <li role=\"presentation\" class=\"active\"><a href=\"#free-support-options\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">Free support options</a></li>\n          <li role=\"presentation\"><a href=\"#support-exchange\" aria-controls=\"support-exchange\" role=\"tab\" data-toggle=\"tab\">Support exchange</a></li>\n        </ul>\n\n        <!-- Tab panes -->\n        <div class=\"tab-content\">\n          <div role=\"tabpanel\" class=\"tab-pane active\" id=\"free-support-options\">\n\n            <!-- Gitter sub panel -->\n            <div class=\"row\">\n              <div class=\"col-md-6\">\n                <div style=\"border-style: solid; border-width: 1px; border-color: gray; height: 180px; padding: 10px\">\n                  <h4>Gitter</h4>\n                  <p>Do you need some immediate help? We can provide it in our Gitter room, for very basic questions that can be resolved without you having the more detailed context of your problem and assuming that someone from our team is logged in.</p>\n                  <br>\n                  <a href=\"https://gitter.im/adriatic/Aurelia-KendoUI?utm_source=badge&amp;utm_medium=badge&amp;utm_campaign=pr-badge&amp;utm_content=badge\" target=\"_blank\">\n                    <img src=\"https://camo.githubusercontent.com/da2edb525cde1455a622c58c0effc3a90b9a181c/68747470733a2f2f6261646765732e6769747465722e696d2f4a6f696e253230436861742e737667\" alt=\"Join the chat\" data-canonical-src=\"https://badges.gitter.im/Join%20Chat.svg\" style=\"max-width:100%;\">\n                  </a>\n                </div>\n              </div>\n              <div class=\"col-md-6\">\n                <div style=\"border-style: solid; border-width: 1px; border-color: gray; height: 180px; padding: 10px\">\n                  <h4>Github</h4>\n                  We also monitor <b><a href=\"https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge/issues\" target=\"_blank\">issues</a></b> on Github and that is the recommended way to ask for help when you need to provide more context, including code sections, textual comments and screenshots.\n                  <br><br><br>\n\n                  See <b><a href=\"https://guides.github.com/features/issues/\" target=\"_blank\">this article</a></b> for more information in GitHub issues feature.\n                </div>\n              </div>\n            </div>\n\n            <br>\n\n            <!-- GitHub subpanel -->\n            <div class=\"row\">\n\n              <!-- GistRun outer box -->\n              <div class=\"col-md-12\">\n                <div style=\"border-style: solid; border-width: 1px; border-color: gray;  padding: 10px;\">\n                  <h4>GistRun</h4>\n                  For any problems using this bridge that are not simple enough to be resolved in our Gitter room and you are willing to\n                  \"substantiate\" your problem report by adding a <b>gist</b> - check the <a href=\"http:#/help/docs?category=troubleshooting&file=2._using_gists_and_gistrun\" target=\"_blank\">Troubleshooting section - using GistRun to report problems</a> for details on this procedure. The information below is a summary of that article.\n\n                  <!-- GistRun left inner box -->\n                  <div style=\"padding-top: 20px; \">\n                    <div class=\"col-md-5\">\n                      <div style=\"border-style: none; border-width: 1px; border-color: gray; padding-top: 20px; padding-left: 0; font-size: 1.3em\">\n\n                        <ol type=\"1\">\n                          <li>\n                          Create a <b>new</b> problem report <b><a href=\"https://github.com/aurelia-ui-toolkits/aurelia-kendoui-bridge/issues\" target=\"_blank\">here</a></b>.\n                          </li>\n                          <br>\n\n                          <li>\n                          Open <a href=\"https://gist.run/?id=809bf843b45efdf8589179f88fd1e507\" target=\"_blank\">this gist</a> and click the Create Public Gist button in the top right corner:\n                          <img src=\"http://i.imgur.com/kE4patJ.png\" />\n                          </li>\n                          <br>\n\n                          <li>\n                          Add your problem specific code to your gist (using GistRun editor).\n                          </li>\n                          <br>\n\n                          <li>\n                          Run your gist to verify the problem is still present.\n                          </li>\n                          <br>\n\n                          <li>\n                          Click the \"Update Gist\" button in the top right corner:\n                          <img src=\"http://i.imgur.com/1vwWXjI.png\" />\n                          </li>\n                          <br>\n\n                          <li>\n                          Copy the URL into your problem report.\n                          </li>\n                        </ol>\n\n                      </div>\n                    </div>\n\n                    <!-- GistRun right inner box -->\n                    <div class=\"col-md-6\" style=\"padding-left: 40px\">\n                      <div style=\"border-style: none; border-width: 1px; border-color: gray; height: 300px; padding-top: 40px; padding-left: 20px\">\n                        <img src=\"https://cloud.githubusercontent.com/assets/2712405/15270572/8e1ecbe8-19f2-11e6-9532-04e0078b15b5.png\"\n                        style=\"border: 1px solid gray\">\n                      </div>\n                    </div>\n\n                    <div style=\"clear: both\"></div>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n          <!-- GistRun subpanel -->\n          <div role=\"tabpanel\" class=\"tab-pane\" id=\"support-exchange\">\n            <div class=\"row\">\n              <div class=\"col-md-12\">\n                <div style=\"border-style: solid; border-width: 1px; border-color: gray; height: 340px; padding: 10px\">\n                  <h4>Support Exchange</h4>\n                  <br><br>\n                  <div style=\"font-size: 1.3em; width: 96%\">\n                    We are planning to offer the service exchange where all users of Aureila-UI-Toolkits bridges can register request for any type of help with their applications: find a bug, design and / or implement their application or simply provide a guidance in their projects. Such requests will matched with members of Aurelia Community that are interesting to provide help for a fee.\n                    <br><br>\n                    Please register your interest by answering to this <a href=\" http://goo.gl/ZhCGZC\" target=\"_blank\">poll</a> and visit the Gitter\n                    <a href=\"https://gitter.im/aurelia-ui-toolkits/support-exchange\" target=\"_blank\">Support Exchange</a> chat room for more information\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n\n        </div>\n\n      </div>\n\n  </section>\n</template>\n"; });
define('text!help/index.html', ['module'], function(module) { module.exports = "<template>\n  <router-view></router-view>\n</template>\n"; });
define('text!installation/installation.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"col-md-12\">\n    <h2>Installation</h2>\n    <section>\n    <br><br>\n      Refer to <a href=\"https://www.gitbook.com/book/aurelia-ui-toolkits/kendoui-bridge-docs/details\">this \"Book\"</a> for the definition of what should be the content of this page. The term book is a reference to the <a href=\"https:///www.gitbook.com\">GitBook</a> book writing tools.\n    </section>\n  </div>\n</template>\n"; });
define('text!samples/index.html', ['module'], function(module) { module.exports = "<template>\n    <!--<require from=\"./menu\"></require>\n    <menu router.bind=\"router\"></menu>-->\n\n    <router-view></router-view>\n</template>\n"; });
define('text!shared/collapse-panel.html', ['module'], function(module) { module.exports = "<template>\n    <div>\n        <div class=\"panel ${ 'panel-' + panelClass }\">\n            <div class=\"panel-heading ${ allowCollapse ? 'panel-hover' : '' }\" click.delegate=\"toggle()\">\n                <span class=\"glyphicon glyphicon-chevron-down\" if.bind=\"!collapsed && allowCollapse\"></span>\n                <span class=\"glyphicon glyphicon-chevron-up\" if.bind=\"collapsed && allowCollapse\"></span>\n                <strong>${panelTitle}</strong>\n            </div>\n            <div class=\"panel-body\" show.bind=\"!collapsed\">\n                <slot></slot>\n            </div>\n            <div class=\"panel-footer\" if.bind=\"footer\">\n                ${footer}\n            </div>\n        </div>\n    </div>\n</template>\n"; });
define('text!shared/logger.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"console\">\n  </div>\n</template>\n"; });
define('text!shared/showcase.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"./showcase.css\"></require>\n    <!-- Page is shared by all widgets and sets up the sub-navigation pane -->\n    <section class=\"showcase\">\n        <div>\n            <div class=\"col-md-2\">\n                <ul class=\"nav nav-pills nav-stacked\">\n                    <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n                        <a href.bind=\"row.href\">${row.title}</a>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"col-md-10\" style=\"padding: 0\">\n                <router-view></router-view>\n            </div>\n        </div>\n    </section>\n</template>\n"; });
define('text!samples/main/basic-use.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view nodes.bind=\"nodes\" view-model.ref=\"tree\"></tree-view>\n  </div>\n  <div>\n    <button click.delegate=\"clearSelection()\">clear selection</button>\n  </div>\n</template>\n"; });
define('text!samples/main/custom-compare.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./multi-select.css\"></require>\n  <div>\n    Oregon and its sub nodes should be selected.<br />\n    New York, New York City and its sub nodes should be selected.<br />\n    New York City (New York's first child) is lazy loaded.\n  </div>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view\n      nodes.bind=\"nodes\"\n      multi-select=\"true\"\n      compare-equality.call=\"compareNode(a, b)\"\n      selected.bind=\"selected\"\n    ></tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/drag-and-drop.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"dragula/dragula.css\"></require>\n  <require from=\"./drag-and-drop.css\"></require>\n  <div style=\"width: 300px\">\n    <tree-view expand-on-select=\"true\" nodes.bind=\"nodes\" view-model.ref=\"tree\"></tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/events.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"width: 300px\">\n    <tree-view\n      nodes.bind=\"nodes\"\n      focused.delegate=\"onFocus($event)\"\n      selection-changed.delegate=\"onSelect($event)\"\n      collapsed.delegate=\"onCollapsed($event)\"\n      expanded.delegate=\"onExpanded($event)\"\n    ></tree-view>\n  </div>\n  <logger view-model.ref=\"logger\"></logger>\n</template>\n"; });
define('text!samples/main/expand-on-focus.html', ['module'], function(module) { module.exports = "<template>\r\n  <div style=\"width: 300px\">\r\n    <tree-view expand-on-focus=\"true\" nodes.bind=\"nodes\"></tree-view>\n  </div>\r\n</template>\r\n"; });
define('text!samples/main/init-from-json.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view nodes.bind=\"nodes\"></tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/lazy-load.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"padding: 10px 0;\">\n    The node \"New York / New York City\" is lazy loaded with a delay of 500ms.\n    The node \"California\" is lazy loaded without a delay.\n  </div>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view nodes.bind=\"nodes\"></tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/multi-select.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./multi-select.css\"></require>\n  <div>\n    Hold ctrl to also select the children of a node.<br />\n    Hold ctrl+shift to do this recursively.<br />\n    <br />\n    The node \"New York / New York City\" is lazy loaded with a delay of 500ms.\n  </div>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view multi-select=\"true\" selected.bind=\"selected\" nodes.bind=\"nodes\" selection-changed.delegate=\"onSelect($event)\" view-model.ref=\"tree\"></tree-view>\n  </div>\n  <div>\n    Selected: ${selectedNodes}\n  </div>\n</template>\n"; });
define('text!samples/main/node-template-commands.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./node-template-commands.css\"></require>\n  <div class=\"node-template-commands-sample\">\n    <tree-view nodes.bind=\"nodes\" view-model.ref=\"tree\">\n      <tree-node-template model.bind=\"nodeInterface\">\n        <ul show.bind=\"model.visible\" class=\"tree-node__wrapper\">\n          <li>\n            <div class=\"tree-node__title-wrapper\">\n              <span if.bind=\"model.hasChildren\" click.trigger=\"toggleNode()\" class=\"material-icons tree-node-arrow ${ model.loading ? 'tree-node-rotate' : '' }\">\n                ${ model.loading ? 'cached' : (model.expanded ? 'keyboard_arrow_down' : 'keyboard_arrow_right') }\n              </span>\n              <span click.delegate=\"focusNode($event, true)\" class=\"tree-node-title tree-node-title__pad-right ${ model.hasChildren ? '' : 'tree-node-title__pad-left' }\">\n                <label if.bind=\"model._tree.multiSelect\">\n                  <input type=\"checkbox\" checked.bind=\"model.selected\" click.delegate=\"toggleSelected($event, true)\" />\n                </label> ${model.title}\n              </span>\n              <span style=\"flex-grow: 1;\"></span>\n              <span>\n                <div class=\"dropdown\">\n                  <button class=\"btn btn-link dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">\n                    <i class=\"material-icons\">more_vert</i>\n                  </button>\n                  <ul class=\"dropdown-menu\">\n                    <li repeat.for=\"cmd of commands\"><a href=\"#\" click.delegate=\"executeCommand(cmd, model)\">${cmd.title}</a></li>\n                  </ul>\n                </div>\n              </span>\n            </div>\n\n            <tree-node repeat.for=\"node of model.children\" model.bind=\"node\"></tree-node>\n\n          </li>\n        </ul>\n      </tree-node-template>\n    </tree-view>\n  </div>\n  <logger view-model.ref=\"logger\"></logger>\n\n</template>\n"; });
define('text!samples/main/node-template.html', ['module'], function(module) { module.exports = "<template>\n  <div>\n    <p>\n      Click on a node to trigger a method defined in the calling view model.\n    </p>\n  </div>\n  <div>\n    <span style=\"font-weight: bold;\">clicked node:</span> <span>${clickedNode ? clickedNode.title : 'none'}</span>\n  </div>\n  <hr />\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view nodes.bind=\"nodes\">\n      <tree-node-template model.bind=\"nodeInterface\">\n        <div>\n          -- <span click.delegate=\"nodeClicked(model)\">${model.title}</span>\n        </div>\n        <div style=\"padding: 5px 15px;\">\n          <tree-node repeat.for=\"node of model.children\" model.bind=\"node\"></tree-node>\n        </div>\n      </tree-node-template>\n    </tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/payload.html', ['module'], function(module) { module.exports = "<template>\n  <div style=\"width: 300px\">\n    <tree-view\n      nodes.bind=\"nodes\"\n      selection-changed.delegate=\"onSelect($event)\"\n      collapsed.delegate=\"onCollapsed($event)\"\n      expanded.delegate=\"onExpanded($event)\"\n    ></tree-view>\n  </div>\n  <logger view-model.ref=\"logger\"></template>\n</template>\n"; });
define('text!samples/main/preselect.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./multi-select.css\"></require>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view nodes.bind=\"nodes\" multi-select=\"true\" selected.bind=\"selected\"></tree-view>\n  </div>\n</template>\n"; });
define('text!samples/main/select-on-focus.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./multi-select.css\"></require>\n  <div>\n    Hold ctrl to also select the children of a node.<br />\n    Hold ctrl+shift to do this recursively.<br />\n    <br />\n    The node \"New York / New York City\" is lazy loaded with a delay of 500ms.\n  </div>\n  <div style=\"width: 300px; position: relative;\">\n    <tree-view\n      multi-select=\"true\"\n      selected.bind=\"selected\"\n      select-on-focus=\"true\"\n      nodes.bind=\"nodes\"\n      selection-changed.delegate=\"onSelect($event)\"\n      view-model.ref=\"tree\">\n    </tree-view>\n  </div>\n  <div>\n    Selected: ${selectedNodes}\n  </div>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map