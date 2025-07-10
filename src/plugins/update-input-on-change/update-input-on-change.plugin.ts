import { Plugin } from '@ckeditor/ckeditor5-core';
import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

export default class UpdateInputOnChange extends Plugin {

    static get pluginName() {
        return 'UpdateInputOnChange';
    }

    private debounceTimeout: number | undefined;

    init() {

        // retrieve editor instance
        const oEditor:ClassicEditor = this.editor as ClassicEditor;

        if(oEditor.sourceElement !== undefined) {
            const oInputElement = oEditor.sourceElement as HTMLInputElement;

            // update input when data change
            oEditor.model.document.on('change:data', (event) => {
                // Clear the existing timeout if there is one
                if (this.debounceTimeout) {
                    clearTimeout(this.debounceTimeout);
                }

                // Set a new timeout to call the update function after X seconds
                this.debounceTimeout = window.setTimeout(() => {
                    // only when input and textarea are different
                    if (oInputElement.value !== oEditor.getData()) {
                        oInputElement.value = oEditor.getData();
                    }
                }, 2000); // Set the delay to 2 seconds (2000 milliseconds)
            });

        }
    }

}