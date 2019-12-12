import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import clearIcon from '../theme/icons/clear.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

export default class ClearContentUI extends Plugin {
	init() {

		const editor = this.editor;
		const t = editor.t;
		console.log( t( 'Cannot upload file:' ) );


		editor.ui.componentFactory.add( 'clearContent', locale => {
			const command = editor.commands.get( 'clearContent' );
			const view = new ButtonView( locale );
			view.set( {
				label: t( 'Clear content' ),
				icon: clearIcon,
				tooltip: true
			} );
			view.bind( 'isEnabled' ).to( command, 'isEnabled' );
			this.listenTo( view, 'execute', () => {
				editor.execute( 'clearContent' );
			} );

			return view;
		} );
	}
}
