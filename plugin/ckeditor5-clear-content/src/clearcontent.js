import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ClearContentEditing from './clearcontentediting';
import ClearContentUI from './clearcontentui';


export default class ClearContent extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ClearContentEditing, ClearContentUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ClearContent';
	}
}
