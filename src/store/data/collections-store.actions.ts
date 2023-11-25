import {customAlphabet, urlAlphabet} from 'nanoid';
import {TCard, TCardEnriched, TCollection} from "./types.ts";
import {useCollectionStore} from "./collections-store.ts";
import {defaultSide, getCollection} from "./collections-store.selectors.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

export const createCollection = (newCollection: TCollection) => useCollectionStore.setState((state) => {
	const _collection = {...newCollection};

	if (!newCollection.id) {
		_collection.id = nanoid();
	}

	if (!newCollection.title) {
		_collection.title = 'New collection';
	}
	return {collections: [...state.collections, _collection]};
});

export const getDefaultCollection = (): TCollection => {
	const id = nanoid();

	return {
		id,
		title: 'New collection',
		author: '',
		isLocal: true,
		sides: [
			{
				...defaultSide,
				name: 'English',
			},
			{
				...defaultSide,
				name: 'Español'
			}]
	};
}

export const getDefaultCard = (collectionId?: string): TCardEnriched | undefined => {
	const collection = getCollection(collectionId);

	if (!collection) {
		return undefined;
	}

	const id = nanoid();

	return {
		id,
		sides: collection.sides?.map(() => ({header: '', text: '', footer: ''})),
		collectionSides: collection.sides
	};
}


export const createDefaultCollection = (): string => {
	const id = nanoid();

	createCollection({
		id,
		title: 'New collection',
		author: '',
		isLocal: true,
		sides: [{name: 'English'}, {name: 'Español'}]
	});

	return id;
}

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

export const createCard = (collectionId?: string, data?: TCard) => useCollectionStore.setState((state) => {
	if (!collectionId || !data) {
		console.error(`Collection "${collectionId}" not found or no data provided!`);
		return {...state.collections};
	}
	const collection = state.collections.find(c => c.id === collectionId);

	if (!collection) {
		console.error(`Collection "${collectionId}" not found!`);
		return {...state.collections};
	}

	if (!collection.cards) {
		collection.cards = [];
	}

	collection.cards.push(data);

	return {
		collections: state.collections
	};
});

export const removeAllCards = (collectionId?: string) => useCollectionStore.setState((state) => {
	if (!collectionId) {
		console.error(`Collection "${collectionId}" not found or no data provided!`);
		return {...state.collections};
	}
	const collection = state.collections.find(c => c.id === collectionId);

	if (!collection) {
		console.error(`Collection "${collectionId}" not found!`);
		return {...state.collections};
	}

	collection.cards = [];

	return {
		collections: state.collections
	};
});

export const isCardExists = (collectionId?: string, text?: string) => {
	const collection = useCollectionStore.getState().collections.find(c => c.id === collectionId);
	if (!collection) {
		console.error(`Collection not found!`);
		return false;
	}

	if (!collection.cards || collection.cards.length === 0) {
		return false
	}

	return collection.cards.findIndex(c => c.sides?.[0].text === text) !== -1;
}

export const updateCard = (collectionId?: string, data?: TCard) => useCollectionStore.setState((state) => {
	const collection = state.collections.find(c => c.id === collectionId);

	if (!collection) {
		return {...state.collections}; // collection not found
	}

	const hasCard = collection.cards?.find(c => c.id === data?.id);

	if (!hasCard) {
		return {...state.collections}; // card not found
	}

	collection.cards = collection!.cards!.map(c => c.id !== data!.id ? c : data!);

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
	author: '',
	isLocal: true,
	sides: [{name: 'English'}, {name: 'Español'}]
});

createCollection({
	id: '6789',// nanoid(),
	title: 'Second collection',
	author: 'John Doe',
	isLocal: true,
	sides: [
		{name: 'English', textColor: '#222', color: '#c5e2e3'},
		{name: 'Español', textColor: '#02326c', color: '#e7d3a8'}
	]
});

createCollection({
	id: nanoid(),
	title: 'Dynamic collection',
	author: 'John Doe',
	isLocal: true,
	sides: [
		{name: 'Ukrainian', textColor: '#222', color: '#c4e8ec'},
		{name: 'English', textColor: '#02326c', color: '#ead1a4'}
	]
});

for (let i = 0; i < 100; i++) {
	const id = nanoid();

	createCard('6789', {
		id,
		sides: [
			{header: '', text: 'Hello, world #' + (i + 1), footer: (i + 1).toString() + 'A'},
			{header: '', text: '¡Hola, Mundo!', footer: (i + 1).toString() + 'B'}
		],
	});
}
