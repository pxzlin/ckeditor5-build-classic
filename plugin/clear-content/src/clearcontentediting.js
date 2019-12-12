import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClearContentCommand from './clearcontentcommand';

export default class ClearContentEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ClearContentEditing';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		editor.commands.add( 'clearContent', new ClearContentCommand( editor ) );
	}
}
