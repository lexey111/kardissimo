import {Fonts} from "../../../../resources/fonts.ts";
import {TCardFaceProp} from "../../../../store/data/card-types.ts";

export const cardWidth = 200;
export const cardHeight = 300;
export const cardBorderRadius = 30;
export const cardThickness = 4;

export const DefaultValues = {
	text: 'No text',
	header: '',
	footer: '',
	font: Fonts[Object.keys(Fonts)[0]],
	fontName: Object.keys(Fonts)[0],
	fontSize: 'M',
	color: '#ffcccc',
	textColor: '#224455',
	textAlign: 'center',
	maxWidth: cardWidth - 40,
	lineHeight: 1.4,
	letterSpacing: 0,
};

export function getFaceParameters(face?: TCardFaceProp): any {
	if (!face) {
		return {...DefaultValues};
	}

	const result = {...DefaultValues, ...face};

	if (!Fonts[result.fontName]) {
		result.fontName = Object.keys(Fonts)[0];
	}

	result.font = Fonts[result.fontName];

	return result;
}
