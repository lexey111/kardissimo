import {useCollectionStore} from "./collections-store.ts";
import {TCollectionSide} from "./types.ts";
import {Fonts} from "../../resources/fonts.ts";


export const defaultSide: TCollectionSide = {
	name: 'Side',
	color: '#fd2234',
	fontName: Object.keys(Fonts)[0],
	fontSize: 'M',
	fontColor: '#062b46'
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

export const getCard = (collectionId?: string, cardId?: string) => useCollectionStore(state => {
	const result = state.collections
		?.find(c => c.id === collectionId)?.cards
		?.find(c => c.id === cardId);

	return result;
});

export const countCards = (collectionId?: string) => useCollectionStore(state => state.collections?.find(c => c.id === collectionId)?.cards?.length || 0)
