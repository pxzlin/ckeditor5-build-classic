export function getSelectedImageModelWidget( selection ) {
	const selectedElement = selection.getSelectedElement();

	if ( selectedElement && selectedElement.is( 'image' ) ) {
		return selectedElement;
	}

	return null;
}
