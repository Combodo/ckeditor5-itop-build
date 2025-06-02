import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Node from '@ckeditor/ckeditor5-engine/src/model/node';

export default class InsertCarriageReturnAfterBlock extends Plugin {
    init() {

        const editor = this.editor;

        // checks if the node is one of the block elements we want a newline after
        const blockElements = ['codeBlock', 'div', 'pre'];
        const isBlockElement = (node: Node) => {
            return blockElements.some(element => node.is('element', element));
        };

        // checks if the node is a code block
        const isCodeBlockElement = (node: Node) => {
            return node.is('element', 'codeBlock');
        };

        // Listen to changes in the model
        editor.model.document.on('change:data', (evt, batch) => {
            if (batch.isLocal) {

                // store current cursor position
                const currentCursorPosition = editor.model.document.selection.getFirstPosition();

                // retrieve the last change
                const change = editor.model.document.differ.getChanges().pop();

                // Check if the change is an insertion and if the inserted node is a block element
                if (change !== undefined && change.type === 'insert' && change.position.nodeAfter !== null && isBlockElement(change.position.nodeAfter)) {

                    let insertParapgraphAfter = false;

                    if (change.position.nodeAfter.nextSibling !== null) {
                        // case 1: nex sibling is a block code
                        insertParapgraphAfter = isCodeBlockElement(change.position.nodeAfter.nextSibling);
                    } else {
                        // case 2: nex sibling is empty
                        insertParapgraphAfter = true;
                    }

                    if(insertParapgraphAfter){

                        // Insert a newline after the block element
                        const p = editor.model.createPositionAfter(change.position.nodeAfter);
                        editor.model.change(writer =>  {
                            editor.execute('insertParagraph', {
                                position: p,
                            });
                        });

                        // Restore the cursor position (most likely in the created block)
                        editor.model.change(writer => {
                            writer.setSelection(currentCursorPosition);
                        });
                    }

                }

            }
        });
    }
}
