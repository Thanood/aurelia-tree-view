import {FrameworkConfiguration} from 'aurelia-framework';

export function configure(aurelia: FrameworkConfiguration) {
    aurelia.globalResources([
        './tree-view/click-counter'
    ]);
}
