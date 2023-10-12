import {customAlphabet, urlAlphabet} from 'nanoid';
import {TCollection} from "./types.ts";
import {useCollectionStore} from "./collections-store.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

export const createCollection = (newCollection: TCollection) => useCollectionStore.setState((state) => {
	let _collection = {...newCollection};
	if (!newCollection.id) {
		_collection.id = nanoid();
	}
	if (!newCollection.title) {
		_collection.title = 'New collection';
	}
	return {collections: [...state.collections, _collection]};
});

export const removeCollection = (id: string) => useCollectionStore.setState((state) => {
	return {
		collections: state.collections.filter(c => c.id !== id)
	};
});

export const updateCollection = (data: TCollection) => useCollectionStore.setState((state) => {
	const oldData = state.collections.find(c => c.id === data?.id);
	if (!oldData) {
		return {...state.collections};
	}
	return {
		collections: state.collections.map(c => c.id !== data.id
			? c
			: {...data})
	};
});

export const createCard = (collectionId?: string) => useCollectionStore.setState((state) => {
	const collection = state.collections.find(c => c.id === collectionId);

	if (!collection) {
		return {...state.collections};
	}

	if (!collection.cards) {
		collection.cards = [];
	}

	collection.cards.push({
			id: nanoid(),
			sides: [
				{word: 'The word'},
				{word: 'La palabra'}
			]
		}
	);

	return {
		collections: state.collections
	};
});

export const removeCard = (collectionId?: string, cardId?: string) => useCollectionStore.setState((state) => {
	const collection = state.collections.find(c => c.id === collectionId);

	if (!collection) {
		return {...state.collections};
	}

	collection.cards = collection.cards?.filter(c => c.id !== cardId);

	return {
		collections: state.collections
	}
});

// temp
createCollection({
	id: '1234', //nanoid(),
	title: 'First Test collection',
	isLocal: true,
	sides: ['aaa', 'bbb']
});

createCollection({
	id: '6789',// nanoid(),
	title: 'Second collection',
	author: 'John Doe',
	isLocal: true,
	sides: ['a123', 'b234']
});

createCollection({
	id: nanoid(),
	title: 'Dynamic collection',
	author: 'John Doe',
	isLocal: true,
	sides: ['a123', 'b234']
});

for (let i = 0; i < 100; i++) {
	createCard('6789');
}
