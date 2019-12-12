import Command from '@ckeditor/ckeditor5-core/src/command';
import { getSelectedImageModelWidget } from './utils';

export default class InsertImageCommand extends Command {

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const schema = model.schema;
		const position = selection.getFirstPosition();
		const selectedImage = getSelectedImageModelWidget( selection );

		let parent = position.parent;

		if ( parent != parent.root ) {
			parent = parent.parent;
		}

		this.value = selectedImage ? selectedImage.getAttribute( 'src' ) : null;
		this.isEnabled = schema.checkChild( parent, 'image' );
	}

	execute( url ) {
		const model = this.editor.model;
		model.change( writer => {
			const imageElement = writer.createElement( 'image', {
				src: url
			} );

			model.insertContent( imageElement, model.document.selection );
		} );
	}
}
