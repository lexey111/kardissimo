import {TSCardbox} from "./types.ts";
import {ColorSchemes} from "../../resources/colors.ts";
import {Fonts} from "../../resources/fonts.ts";


export const defaultSchema = Object.keys(ColorSchemes)[0];
export const secondDefaultSchema = Object.keys(ColorSchemes)[1];
export const defaultFont = Object.keys(Fonts)[0];

export const getSideColorsBySchema = (schemaName: string) => {
	const schema = ColorSchemes[schemaName] || defaultSchema;

	return {...schema};
}

export const getDefaultSCardbox = (): TSCardbox => {
	return {
		id: 0,
		created_at: new Date(),
		changed_at: new Date(),
		owner: '',

		title: 'New cardbox',
		author: '',
		description: '',

		public: false,
		version: 1,

		side1title: '',
		side2title: '',

		side1schema: defaultSchema,
		side2schema: secondDefaultSchema,

		side1fontSize: 'M',
		side2fontSize: 'M',

		side1fontName: defaultFont,
		side2fontName: Object.keys(Fonts)[0],

	};
}
