import { Plugin, type Editor } from '@ckeditor/ckeditor5-core';
/**
 * DetectChanges Plugin.
 *
 */
export default class DetectChanges extends Plugin {
    constructor(editor: Editor);
    init(): void;
    static get pluginName(): string;
}
