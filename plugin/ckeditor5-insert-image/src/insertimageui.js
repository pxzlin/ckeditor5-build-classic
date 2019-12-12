import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import InsertImageFormView from './ui/insertimageformview';
import insertImageIcon from '../theme/icons/insertimage.svg';

export default class InsertImageUI extends Plugin {
	init() {
		const editor = this.editor;
		const command = editor.commands.get( 'insertImage' );

		this.form = new InsertImageFormView( getFormValidators( editor.t ), editor.locale );

		editor.ui.componentFactory.add( 'insertImage', locale => {
			const dropdown = createDropdown( locale );

			this._setUpDropdown( dropdown, this.form, command, editor );
			this._setUpForm( this.form, dropdown, command );

			return dropdown;
		} );
	}

	_setUpDropdown( dropdown, form, command ) {
		const editor = this.editor;
		const t = editor.t;
		const button = dropdown.buttonView;

		dropdown.bind( 'isEnabled' ).to( command );
		dropdown.panelView.children.add( form );
		button.set( {
			label: t( 'Insert image' ),
			icon: insertImageIcon,
			tooltip: true
		} );

		button.on( 'open', () => {
			form.url = command.value || '';
			form.urlInputView.select();
			form.focus();
		}, { priority: 'low' } );

		dropdown.on( 'submit', () => {
			if ( form.isValid() ) {
				editor.execute( 'insertImage', form.url );
				closeUI();
			}
		} );

		dropdown.on( 'change:isOpen', () => form.resetFormStatus() );
		dropdown.on( 'cancel', () => closeUI() );

		function closeUI() {
			editor.editing.view.focus();
			dropdown.isOpen = false;
		}
	}

	_setUpForm( form, dropdown, command ) {
		form.delegate( 'submit', 'cancel' ).to( dropdown );
		form.urlInputView.bind( 'value' ).to( command, 'value' );

		// Form elements should be read-only when corresponding commands are disabled.
		form.urlInputView.bind( 'isReadOnly' ).to( command, 'isEnabled', value => !value );
		form.saveButtonView.bind( 'isEnabled' ).to( command );
	}
}

function getFormValidators( t ) {
	return [
		form => {
			if ( !form.url.length ) {
				return t( 'The URL must not be empty.' );
			}
		},
		form => {
			if ( form.url.indexOf( 'http' ) == -1 ) {
				return t( 'This image URL is not supported.' );
			}
		}
	];
}
