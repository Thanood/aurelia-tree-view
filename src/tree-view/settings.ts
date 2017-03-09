import {TemplateInfo} from './data-source';
import {NodeModel} from './node-model';

export interface TreeViewSettings {
    compareEquality: ((args: { a: NodeModel, b: NodeModel }) => boolean);
    expandOnFocus: boolean;
    multiSelect: boolean;
    templateInfo: TemplateInfo | null;
}
