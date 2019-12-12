import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';

import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';

import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';
import '../../theme/insertimageform.css';

export default class InsertImageFormView extends View {
	/**
	 * @param {Array.<Function>} validators Form validators used by {@link #isValid}.
	 * @param {module:utils/locale~Locale} [locale] The localization services instance.
	 */
	constructor( validators, locale ) {
		super( locale );

		const t = locale.t;

		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.urlInputView = this._createUrlInput();
		this.saveButtonView = this._createButton( t( 'Save' ), checkIcon, 'ck-button-save' );
		this.saveButtonView.type = 'submit';
		this.cancelButtonView = this._createButton( t( 'Cancel' ), cancelIcon, 'ck-button-cancel', 'cancel' );
		this._focusables = new ViewCollection();
		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: 'shift + tab',
				focusNext: 'tab'
			}
		} );
		this._validators = validators;

		this.setTemplate( {
			tag: 'form',
			attributes: {
				class: [
					'ck',
					'ck-insertimage-form'
				],
				tabindex: '-1'
			},

			children: [
				this.urlInputView,
				this.saveButtonView,
				this.cancelButtonView
			]
		} );
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		const childViews = [
			this.urlInputView,
			this.saveButtonView,
			this.cancelButtonView
		];

		childViews.forEach( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );

		const stopPropagation = data => data.stopPropagation();

		// Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
		// keystroke handler would take over the key management in the URL input. We need to prevent
		// this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
		this.keystrokes.set( 'arrowright', stopPropagation );
		this.keystrokes.set( 'arrowleft', stopPropagation );
		this.keystrokes.set( 'arrowup', stopPropagation );
		this.keystrokes.set( 'arrowdown', stopPropagation );

		// Intercept the "selectstart" event, which is blocked by default because of the default behavior
		// of the DropdownView#panelView.
		// TODO: blocking "selectstart" in the #panelView should be configurable per–drop–down instance.
		this.listenTo( this.urlInputView.element, 'selectstart', ( evt, domEvt ) => {
			domEvt.stopPropagation();
		}, { priority: 'high' } );
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		this._focusCycler.focusFirst();
	}

	/**
	 * The native DOM `value` of the {@link #urlInputView} element.
	 *
	 * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	 * which works one way only and may not represent the actual state of the component in the DOM.
	 *
	 * @type {Number}
	 */
	get url() {
		return this.urlInputView.inputView.element.value.trim();
	}

	/**
	 * Sets the native DOM `value` of the {@link #urlInputView} element.
	 *
	 * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	 * which works one way only and may not represent the actual state of the component in the DOM.
	 *
	 * @param {String} url
	 */
	set url( url ) {
		this.urlInputView.inputView.element.value = url.trim();
	}

	/**
	 * Validates the form and returns `false` when some fields are invalid.
	 *
	 * @returns {Boolean}
	 */
	isValid() {
		this.resetFormStatus();

		for ( const validator of this._validators ) {
			const errorText = validator( this );

			// One error per field is enough.
			if ( errorText ) {
				// Apply updated error.
				this.urlInputView.errorText = errorText;

				return false;
			}
		}

		return true;
	}

	/**
	 * Cleans up the supplementary error and information text of the {@link #urlInputView}
	 * bringing them back to the state when the form has been displayed for the first time.
	 *
	 * See {@link #isValid}.
	 */
	resetFormStatus() {
		this.urlInputView.errorText = null;
		this.urlInputView.infoText = this._urlInputViewInfoDefault;
	}

	/**
	 * Creates a labeled input view.
	 *
	 * @private
	 * @returns {module:ui/labeledinput/labeledinputview~LabeledInputView} Labeled input view instance.
	 */
	_createUrlInput() {
		const t = this.locale.t;

		const labeledInput = new LabeledInputView( this.locale, InputTextView );
		const inputView = labeledInput.inputView;

		this._urlInputViewInfoDefault = t( 'Paste the image URL in the input.' );
		this._urlInputViewInfoTip = t( 'Tip: Paste the URL into the content to embed faster.' );

		labeledInput.label = t( 'Image URL' );
		labeledInput.infoText = this._urlInputViewInfoDefault;
		inputView.placeholder = 'https://example.com';

		inputView.on( 'input', () => {
			labeledInput.infoText = inputView.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
		} );

		return labeledInput;
	}

	_createButton( label, icon, className, eventName ) {
		const button = new ButtonView( this.locale );

		button.set( {
			label,
			icon,
			tooltip: true
		} );

		button.extendTemplate( {
			attributes: {
				class: className
			}
		} );

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}
}
