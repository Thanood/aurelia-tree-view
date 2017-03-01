import 'aurelia-bootstrapper';
import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging();
    //  .globalResources('converters/upper');

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-tree-view'));

    aurelia.start().then(() => aurelia.setRoot());
}
