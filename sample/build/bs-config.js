var path = require('path');

module.exports = {
  open: false,
  server: {
    baseDir: "sample",
    middleware: {
      0: null
    },
    routes: {
      '/src/root/': './',
      '/src/aurelia-tree-view': './devbuild/system'
    }
  }
};
