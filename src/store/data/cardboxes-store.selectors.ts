import {useCardboxStore} from "./cardboxes-store.ts";
import {TCardEnriched, TCardboxSide} from "../cardboxes/types.ts";
import {Fonts} from "../../resources/fonts.ts";
import {ColorSchemes} from "../../resources/colors.ts";

export const defaultSide: TCardboxSide = {
	name: 'Side',
	color: ColorSchemes[Object.keys(ColorSchemes)[0]].color,
	fontName: Object.keys(Fonts)[0],
	colorSchemaName: Object.keys(ColorSchemes)[0],
	fontSize: 'M',
	textColor: ColorSchemes[Object.keys(ColorSchemes)[0]].textColor
};

export const defaultCardbox = {
	id: 'none', sides: [
		{
			header: 'Header',
			text: 'Hello world!',
			footer: 'Footer'
		},
		{
			header: 'Encabezado',
			text: '¡Hola Mundo!',
			footer: 'Pie de página'
		},
	],
	cardboxSides: [
		{
			...defaultSide,
			name: 'English',
		},
		{
			...defaultSide,
			name: 'Español'
		}]
};

export const getCardboxes = () => useCardboxStore.getState().cardboxes;

export const getCardbox = (cardboxId?: string) => useCardboxStore(state => {
	const result = state.cardboxes?.find(c => c.id === cardboxId);
	if (!result || !result.sides) {
		return result
	}

	// @ts-ignore
	result.sides = result.sides.map(side => ({...defaultSide, ...side}));

	return result;
});

export const getCard = (cardboxId?: string, cardId?: string): TCardEnriched | null => useCardboxStore(state => {
	const cardbox = state.cardboxes?.find(c => c.id === cardboxId);

	if (!cardbox || !cardbox.cards) {
		return null;
	}

	const card = cardbox.cards?.find(c => c.id === cardId);
	if (!card) {
		return null;
	}

	return {
		id: card.id,
		ownDesign: card.ownDesign,
		sides: card.sides?.map(side => ({header: '', footer: '', ...side})), // enrich with ''
		cardboxSides: cardbox.sides
	};
});

export const moveCardTo = (cardboxId: string, idx1: number, idx2: number) => useCardboxStore.setState(state => {
	return {
		cardboxes: state.cardboxes.map(cardbox => {
			if (cardbox.id !== cardboxId) {
				return {...cardbox};
			}
			if (!cardbox || !cardbox.cards) {
				return {...cardbox};
			}

			if (idx1 < 0 || idx1 >= cardbox.cards.length) {
				return {...cardbox};
			}

			if (idx2 < 0 || idx2 >= cardbox.cards.length) {
				return {...cardbox};
			}

			if (idx1 === idx2) {
				return {...cardbox};
			}
			const cards = [...cardbox.cards];
			const target = cards.splice(idx1, 1)[0];
			cards.splice(idx2, 0, target);

			return {
				...cardbox,
				cards: cards
			}
		})
	}
});

export const countCards = (cardboxId?: string) => useCardboxStore(state => state.cardboxes?.find(c => c.id === cardboxId)?.cards?.length || 0)
