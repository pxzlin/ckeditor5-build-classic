import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InsertImageCommand from './insertimagecommand';

export default class InsertImageEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'InsertImageEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		editor.commands.add( 'insertImage', new InsertImageCommand( editor ) );
	}
}
