import {useCollectionStore} from "./collections-store.ts";

export const getCollections = () => useCollectionStore.getState().collections;

export const getCollection = (collectionId?: string) => useCollectionStore(state => state.collections?.find(c => c.id === collectionId));

export const getCollectionSides = (collectionId?: string) => useCollectionStore.getState().collections?.find(c => c.id === collectionId)?.sides;

export const countCollections = () => useCollectionStore(state => state.collections?.length || 0);


export const getCards = (collectionId: string) => useCollectionStore.getState().collections?.find(c => c.id === collectionId)?.cards;

export const getCard = (collectionId?: string, cardId?: string) => useCollectionStore(state => (
	state.collections
		?.find(c => c.id === collectionId)?.cards
		?.find(c => c.id === cardId)));

export const countCards = (collectionId?: string) => useCollectionStore(state => state.collections?.find(c => c.id === collectionId)?.cards?.length || 0)
