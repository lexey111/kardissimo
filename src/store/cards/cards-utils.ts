import {Fonts} from "../../resources/fonts.ts";
import {defaultFont, defaultSchema, secondDefaultSchema} from "../cardboxes/cardboxes-utils.ts";
import {TSCard} from "./types-card.ts";

export const getDefaultSCard = (cardboxId: number): TSCard => {
	return {
		id: 0,
		created_at: new Date(),
		changed_at: new Date(),
		box_id: cardboxId,

		side1header: '',
		side1text: '',
		side1footer: '',

		side2header: '',
		side2text: '',
		side2footer: '',

		hasOwnDesign: false,

		side1schema: defaultSchema,
		side2schema: secondDefaultSchema,

		side1fontSize: 'M',
		side2fontSize: 'M',

		side1fontName: defaultFont,
		side2fontName: Object.keys(Fonts)[0],

		cards_order: 0
	};
}
