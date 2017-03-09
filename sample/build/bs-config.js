var path = require('path');

module.exports = {
    open: false,
    server: {
        baseDir: "sample",
        logConnections: false,
        routes: {
            '/src/root/': './',
            '/src/aurelia-tree-view': './dist/system'
        }
    }
};
