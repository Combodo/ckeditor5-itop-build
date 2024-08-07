import { Plugin } from '@ckeditor/ckeditor5-core';
import {ClassicEditor} from "@ckeditor/ckeditor5-editor-classic";

export default class Disabler extends Plugin {

    static get pluginName() {
        return 'Disabler';
    }

    init() {

        // retrieve editor instance
        const oEditor:ClassicEditor = this.editor as ClassicEditor;

            // perform disabling when editor ui is ready
            oEditor.ui.on('ready', () => {
                Disabler.processDisabling(oEditor, oInputElement);
            });

            // perform disabling when input is updated
            const oInputElement = oEditor.sourceElement as HTMLInputElement;
            // @ts-ignore
            $('#' + oInputElement.id).on('update', function(){
                Disabler.processDisabling(oEditor, oInputElement);
            });
    }

    /**
     * Process ckeditor disabling.
     *
     * @param oEditor
     * @param oInputElement
     */
    static processDisabling(oEditor:ClassicEditor, oInputElement:HTMLInputElement){

        // @ts-ignore
        const oElement = $(oEditor.ui.element);
        if(typeof oElement.block === 'function') {
            if (oInputElement.disabled) {
                oElement.block({message: '', blockMsgClass: '', enableValidation : true, baseZ: 9999, overlayCSS:  { backgroundColor: '#ccd6e066'}});
            } else {
                oElement.unblock();
            }
        }

        // handle ckeditor read only mode
        if(oInputElement.disabled){
            oEditor.enableReadOnlyMode('ibo');
        }
        else{
            oEditor.disableReadOnlyMode('ibo');
        }

    }
}