const path = require("path");
const { AureliaPlugin, ModuleDependenciesPlugin } = require("aurelia-webpack-plugin");
// TODO: this is only temporary until a patched aurelia release is published.
const coreDeps = require("aurelia-core-dependencies");

module.exports = {
    entry: "main",

    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist",
        filename: "bundle.js"
    },

    resolve: {
        alias: {
            "aurelia-tree-view": path.resolve(__dirname, "../src/")
        },
        extensions: [".ts", ".js"],
        modules: ["src", "node_modules", "../src"].map(x => path.resolve(x)),
        symlinks: false
    },

    module: {
        rules: [
            { test: /\.scss$/i, use: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.ts$/i, use: "ts-loader" },
            { test: /\.html$/i, use: "html-loader" }
        ]
    },

    plugins: [
        new AureliaPlugin({ includeAll: "src" }),
        new ModuleDependenciesPlugin({
            "aurelia-tree-view": ["./tree-view/click-counter.ts", "./tree-view/click-counter.html"]
        }),
        coreDeps
    ]
};
