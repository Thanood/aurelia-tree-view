import {Aurelia} from 'aurelia-framework';

// FuseBox.pkg('aurelia-tree-view', {}, function(___scope___: any) {
//         ___scope___.entry = 'index.js'
// });

// add custom loader for fuse
(window as any).FUSEBOX_AURELIA_LOADER_LOGGING = true;
import 'fuse-box-aurelia-loader';
import 'aurelia-bootstrapper';

// aurelia configuration
export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('tv-rewrite');

  aurelia.start().then(() => aurelia.setRoot());
}
