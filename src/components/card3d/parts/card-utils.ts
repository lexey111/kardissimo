import {Fonts} from "../../../resources/fonts.ts";
import {TCardFace, TCardFaceProp, TExtendedCardProps} from "../card-types.ts";

export const cardWidth = 200;
export const cardHeight = 300;
export const cardBorderRadius = 20;
export const cardThickness = 1;

export const DefaultValues: TCardFace = {
	text: 'No text',
	header: '',
	footer: '',
	font: Fonts['Philosopher'],
	fontName: 'Philosopher',
	fontSize: 'M',
	color: '#ffcccc',
	textColor: '#224455',
	textAlign: 'center',
	maxWidth: cardWidth - 40,
	lineHeight: 1.4,
	letterSpacing: 0,
};

export function getFaceParameters(face?: TCardFaceProp): TExtendedCardProps {
	if (!face) {
		return {...DefaultValues};
	}

	const result = {...DefaultValues, ...face};

	if (!Fonts[result.fontName]) {
		result.fontName = 'Philosopher';
	}

	result.font = Fonts[result.fontName];

	return result;
}
