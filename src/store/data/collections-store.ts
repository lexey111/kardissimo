import {create} from 'zustand';
import {customAlphabet, urlAlphabet} from 'nanoid';
import {TCollection} from "./types.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

// export type TCollections = Array<TCollection>

export interface ICollectionState {
	collections: Array<TCollection>
	add: (newCollection: TCollection) => void
	remove: (id: string) => void
	update: (data: TCollection) => void
	addCard: (collectionId: string) => void
}

export const useCollectionStore = create<ICollectionState>((set) => ({
	collections: [],

	add: (newCollection: TCollection) => set((state) => {
		let _collection = {...newCollection};
		if (!newCollection.id) {
			_collection.id = nanoid();
		}
		if (!newCollection.title) {
			_collection.title = 'New collection';
		}
		return {collections: [...state.collections, _collection]};
	}),

	remove: (id) => set((state) => {
		return {
			collections: state.collections.filter(c => c.id !== id)
		};
	}),

	update: (data) => set((state) => {
		const oldData = state.collections.find(c => c.id === data?.id);
		if (!oldData) {
			return {...state.collections};
		}
		return {
			collections: state.collections.map(c => c.id !== data.id
				? c
				: {...data})
		};
	}),

	addCard: (collectionId: string) => set((state) => {
		const collection = state.collections.find(c => c.id === collectionId);
		if (!collection) {
			return {...state.collections};
		}

		return {
			collections: state.collections.map(c => c.id !== collectionId
				? c
				: c
			)
		};
	}),
}));

console.log('useCollectionStore', useCollectionStore)
// temp
const add = useCollectionStore(state => state.add);
add({
	id: '1234', //nanoid(),
	title: 'Test collection',
	author: 'unknown',
	isLocal: true,
	sides: ['aaa', 'bbb']
});
add({
	id: '6789',// nanoid(),
	title: 'Second collection',
	author: 'unknown',
	isLocal: true,
	sides: ['a123', 'b234']
});
