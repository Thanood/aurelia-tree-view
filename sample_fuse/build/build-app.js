var build = function() {

    let fb = require("fuse-box");
    let fuse = fb.FuseBox;

    let bundle = fuse.init({
        homeDir: "./src",
        outFile: "./bundle/fb-app-bundle.js",
        useCache: false,
        plugins: [
            fb.CSSPlugin(),
            fb.HTMLPlugin({
                useDefault: true
            }),
            fb.TypeScriptHelpers()
        ],
        modulesFolder: '../../'
    });

    const modules = `
        > main.ts
        + [**/*.html] 
        + [**/*.ts] 
        + [**/*.css]
        + aurelia-bootstrapper
        + fuse-box-aurelia-loader
        + aurelia-framework
        + aurelia-pal
        + aurelia-metadata
        + aurelia-loader-default
        + aurelia-polyfills
        + aurelia-fetch-client
        + aurelia-pal-browser
        + aurelia-animator-css
        + aurelia-logging-console 
        + aurelia-templating-binding 
        + aurelia-templating-resources 
        + aurelia-event-aggregator 
        + aurelia-history-browser 
        + aurelia-templating-router
        + tv-rewrite
    `;

    // Start dev server
    bundle.devServer(modules, {
        root: './'
    });
};

build();
