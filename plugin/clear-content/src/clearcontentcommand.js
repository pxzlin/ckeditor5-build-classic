import Command from '@ckeditor/ckeditor5-core/src/command';

export default class ClearContentCommand extends Command {
	refresh() {
		this.isEnabled = true;
	}
	execute() {
		const editor = this.editor;
		editor.setData( '' );
	}
}
