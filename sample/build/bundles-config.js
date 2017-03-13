var config = {
  force: true,
  baseUrl: 'src',
  configPath: './config.js',
  bundles: {
    'dist/app-build': {
      includes: [
        '[*.js]',
        '[shared/*.js]',
        '*.html!text',
        '[shared/*.html!text]',
        '*.css!text',
        '[shared/*.css!text]'
      ],
      options: {
        inject: false,
        minify: false
      }
    },
    'dist/aurelia-tree-view': {
      includes: [
        '[../../dist/system/*.js]',
        '[../../dist/system/common/*.js]',
        '[../../dist/system/tree-view/*.js]',
        '../../dist/system/tree-view/*.html!text',
        '../../dist/system/tree-view/*.css!text'
      ],
      options: {
        inject: false,
        minify: false
      }
    },
    'dist/vendor-build': {
      includes: [
        'aurelia-binding',
        'aurelia-bootstrapper',
        'aurelia-dependency-injection',
        'aurelia-event-aggregator',
        'aurelia-framework',
        'aurelia-http-client',
        'aurelia-loader',
        'aurelia-logging',
        'aurelia-metadata',
        'aurelia-pal',
        'aurelia-task-queue',
        'aurelia-templating',
        'aurelia-templating-resources',
        'babel',
        'bootstrap',
        'core-js',
        'css',
        'dragula',
        'font-awesome',
        // 'google/code-prettify',
        'jquery',
        'json',
        'prism',
        'showdown',
        'showdown-prettify',
        'text'
      ],
      options: {
        inject: false,
        minify: false
      }
    }
  }
};

module.exports = config;
