import {ColorSchemes} from "../../resources/colors.ts";
import {Fonts} from "../../resources/fonts.ts";
import {TFontSize} from "../types-common.ts";

export type TCardFace = {
	text: string
	header?: string
	footer?: string
	fontName: string
	font: string
	fontSize: string
	color: string
	textColor: string
	textAlign: 'center' | 'left' | 'right'
	maxWidth: number
	lineHeight: number
	letterSpacing: number
}

export type TCardFaceProp = Pick<TCardFace, 'text'> & (Partial<Omit<TCardFace, 'text'>>);

export type TCardProps = {
	faces: any
	active?: boolean
	side?: number
	onSetSide?: (side: number) => void
};

export const defaultSide = {
	color: ColorSchemes[Object.keys(ColorSchemes)[0]].color,
	fontName: Object.keys(Fonts)[0],
	fontSize: 'M',
	textColor: ColorSchemes[Object.keys(ColorSchemes)[0]].textColor
};


export type TFacesData = {
	sides: [{ header: string, text: string, footer: string }, { header: string, text: string, footer: string }]
	cardboxSides: [{
		color: string,
		textColor: string,
		name: string,
		fontName: string,
		fontSize: TFontSize,
		colorSchemaName: string
	}, {
		color: string,
		textColor: string,
		name: string,
		fontName: string,
		fontSize: TFontSize,
		colorSchemaName: string
	}]
}
export type TPreparedSide = TCardFace;
