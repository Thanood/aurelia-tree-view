# aurelia-tree-view

An experimental tree-view custom element for Aurelia.
*At the moment* it depends on [Google Material Icons](https://design.google.com/icons/).
This dependency will be removed later.

Also a means to try [`skeleton-catalog`](https://github.com/aurelia-ui-toolkits/skeleton-catalog) in practice.

Inspired heavily by: https://github.com/thelgevold/aurelia-treeview

Following this blog post: http://www.syntaxsuccess.com/viewarticle/5529813d955de264e1fbbaec

## Installing

`jspm install aurelia-tree-view=github:Thanood/aurelia-tree-view`

In `main.js`:

```javascript
aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-tree-view', plugin => plugin.useAll());
```

Other loaders (aurelia-cli/webpack) following..

## Running this repo

* clone it
* `npm install` in root
* `jspm install` in sample directory
* `npm start` in root
