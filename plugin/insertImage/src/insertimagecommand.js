import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertImageCommand extends Command {
	execute() {
		const model = this.editor.model;
		const imageUrl = prompt( '请输入图片地址' );
		if ( !imageUrl ) {
			return false;
		}
		model.change( writer => {
			const imageElement = writer.createElement( 'image', {
				src: imageUrl
			} );

			model.insertContent( imageElement, model.document.selection );
		} );
	}
}
