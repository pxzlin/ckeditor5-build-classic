/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
// import Indent from '@ckeditor/ckeditor5-indent/src/indent';
// import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
// import HighLight from '@ckeditor/ckeditor5-highlight/src/highlight';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Font from '@ckeditor/ckeditor5-font/src/font';
import SubScript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import SuperScript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import UnderLine from '@ckeditor/ckeditor5-basic-styles/src/underline';
import StrikeThrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

import InsertImage from '../plugin/ckeditor5-insert-image/src/insertimage.js';
import ClearContent from '../plugin/ckeditor5-clear-content/src/clearcontent.js';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { keyCodes } from '@ckeditor/ckeditor5-utils/src/keyboard';

// class InsertImage extends Plugin {
// 	init() {
// 		const editor = this.editor;

// 		editor.ui.componentFactory.add( 'insertImage', locale => {
// 			const view = new ButtonView( locale );

// 			view.set( {
// 				label: '网络图片',
// 				icon: imageIcon,
// 				tooltip: true
// 			} );

// 			// Callback executed once the image is clicked.
// 			view.on( 'execute', () => {
// 				const imageUrl = prompt( '请输入图片地址' );
// 				if ( !imageUrl ) {
// 					return false;
// 				}
// 				editor.model.change( writer => {
// 					const imageElement = writer.createElement( 'image', {
// 						src: imageUrl
// 					} );

// 					// Insert the image in the current selection location.
// 					editor.model.insertContent( imageElement, editor.model.document.selection );
// 				} );
// 			} );

// 			return view;
// 		} );
// 	}
// }

// class ClearContent extends Plugin {
// 	init() {
// 		const editor = this.editor;

// 		editor.ui.componentFactory.add( 'clearContent', locale => {
// 			const view = new ButtonView( locale );

// 			view.set( {
// 				label: 'Clear content',
// 				icon: deleteIcon,
// 				tooltip: true
// 			} );

// 			// Callback executed once the image is clicked.
// 			view.on( 'execute', () => {
// 				editor.setData( '' );
// 			} );

// 			return view;
// 		} );
// 	}
// }

class TabIndent extends Plugin {
	init() {
		const editor = this.editor;
		const view = editor.editing.view;
		const viewDocument = view.document;
		viewDocument.on( 'keydown', ( evt, data ) => {
			if ( ( data.keyCode == keyCodes.tab ) && viewDocument.isFocused ) {
				editor.execute( 'input', { text: '    ' } );
				evt.stop(); // Prevent executing the default handler.
				data.preventDefault();
				view.scrollToTheSelection();
			}
		} );
	}
}

// import '../theme/black.css';

export default class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
	TabIndent,
	InsertImage,
	ClearContent,
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	ImageResize,
	// Indent,
	// IndentBlock,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	Alignment,
	HorizontalLine,
	// HighLight,
	RemoveFormat,
	Font,
	SubScript,
	SuperScript,
	UnderLine,
	StrikeThrough,
	WordCount
];
// Editor configuration.
ClassicEditor.defaultConfig = {
	fontFamily: {
		options: [
			'default',
			'宋体',
			'黑体',
			'仿宋',
			'楷体',
			'隶书',
			'幼圆',
			'微软雅黑',
			'Arial',
			'Courier New',
			'Georgia',
			'Lucida Sans Unicode',
			'Tahoma',
			'Times New Roman',
			'Trebuchet MS',
			'Verdana'
		]
	},
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikeThrough',
			'subScript',
			'superScript',
			'|',
			'removeFormat',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'alignment',
			'horizontalLine',
			// 'highLight',
			// '|',
			// 'indent',
			// 'outdent',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',
			'clearContent'
		]
	},
	// indentBlock: {
	// 	classes: [
	// 		'indent-b'
	// 	]
	// },
	image: {
		toolbar: [
			'imageStyle:alignLeft',
			'imageStyle:full',
			'imageStyle:alignRight',
			'|',
			'imageTextAlternative'
		],
		styles: [
			'alignLeft',
			'full',
			'alignRight'
		]
		// styles: [
		// 	{ name: 'side', isDefault: true },
		// 	{ name: 'fullSize', icon: 'full', title: 'full', className: 'image-wrap' }

		// ]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells'
		]
	}
};
