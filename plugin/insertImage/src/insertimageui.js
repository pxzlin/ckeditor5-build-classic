import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import insertImageIcon from '../theme/icons/insertimage.svg';

export default class InsertImageUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const command = editor.commands.get( 'insertImage' );
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Insert remote image' ),
				icon: insertImageIcon,
				tooltip: true
			} );

			view.bind( 'isEnabled' ).to( command, 'isEnabled' );

			// Execute the command.
			this.listenTo( view, 'execute', () => editor.execute( 'insertImage' ) );

			return view;
		} );
	}
}


