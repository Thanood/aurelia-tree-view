import {NodeModel} from './node-model';
import {TemplateInfo} from './template-info';

export interface TreeViewSettings {
    compareEquality: ((args: { a: NodeModel, b: NodeModel }) => boolean);
    expandOnFocus: boolean;
    multiSelect: boolean;
    templateInfo: TemplateInfo | null;
}
