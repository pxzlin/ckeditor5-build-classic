import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InsertImageEditing from './insertimageediting';
import InsertImageUI from './insertimageui';


export default class InsertImage extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ InsertImageEditing, InsertImageUI ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'InsertImage';
	}
}
