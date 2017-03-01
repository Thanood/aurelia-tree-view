var path = require('path');

module.exports = {
    open: false,
    server: {
        baseDir: "sample",
        routes: {
            '/src/root/': './',
            '/src/aurelia-tree-view': './dist/system'
        }
    }
};
