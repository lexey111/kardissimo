import {useCollectionStore} from "./collections-store.ts";
import {TCardEnriched, TCollectionSide} from "./types.ts";
import {Fonts} from "../../resources/fonts.ts";
import {ColorSchemes} from "../../resources/colors.ts";

export const defaultSide: TCollectionSide = {
	name: 'Side',
	color: ColorSchemes[Object.keys(ColorSchemes)[0]].background,
	fontName: Object.keys(Fonts)[0],
	colorSchemaName: Object.keys(ColorSchemes)[0],
	fontSize: 'M',
	textColor: ColorSchemes[Object.keys(ColorSchemes)[0]].text
};

export const defaultCollection = {
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
	collectionSides: [
		{
			...defaultSide,
			name: 'English',
		},
		{
			...defaultSide,
			name: 'Español'
		}]
};

export const getCollections = () => useCollectionStore.getState().collections;

export const getCollection = (collectionId?: string) => useCollectionStore(state => {
	const result = state.collections?.find(c => c.id === collectionId);
	if (!result || !result.sides) {
		return result
	}

	// @ts-ignore
	result.sides = result.sides.map(side => ({...defaultSide, ...side}));

	return result;
});

export const getCollectionSides = (collectionId?: string) => useCollectionStore.getState().collections?.find(c => c.id === collectionId)?.sides;

export const countCollections = () => useCollectionStore(state => state.collections?.length || 0);


export const getCards = (collectionId: string) => useCollectionStore.getState().collections?.find(c => c.id === collectionId)?.cards;

export const getCard = (collectionId?: string, cardId?: string): TCardEnriched | null => useCollectionStore(state => {
	const collection = state.collections?.find(c => c.id === collectionId);

	if (!collection || !collection.cards) {
		return null;
	}

	const card = collection.cards?.find(c => c.id === cardId);
	if (!card) {
		return null;
	}

	return {
		id: card.id,
		sides: card.sides?.map(side => ({header: '', footer: '', ...side})), // enrich with ''
		collectionSides: collection.sides
	};
});

export const countCards = (collectionId?: string) => useCollectionStore(state => state.collections?.find(c => c.id === collectionId)?.cards?.length || 0)
