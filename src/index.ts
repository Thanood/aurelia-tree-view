import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        PLATFORM.moduleName('./tree-view/tree-node'),
        PLATFORM.moduleName('./tree-view/tree-node-template'),
        PLATFORM.moduleName('./tree-view/tree-view')
    ]);
}

export * from './tree-view/tree-node';
export * from './tree-view/tree-node-template';
export * from './tree-view/tree-view';
