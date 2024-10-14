import { Command } from 'ckeditor5/src/core';

/**
 * InsertHtmlCommand Command.
 *
 */
export default class InsertHtmlCommand extends Command {

    override execute( sContent:string ) {
	
		const viewFragment = this.editor.data.processor.toView(sContent)
		const modelFragment = this.editor.data.toModel(viewFragment)

		this.editor.model.change(writer => {
			const insertPosition = this.editor.model.document.selection.getFirstPosition()
			writer.insert(modelFragment, insertPosition)
		})
		
    }
}

