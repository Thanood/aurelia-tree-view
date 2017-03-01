import {NodeModel} from './node-model';

export interface TreeViewSettings {
    compareEquality?: ((args: { a: NodeModel, b: NodeModel }) => boolean);
    multiSelect?: boolean;
}
