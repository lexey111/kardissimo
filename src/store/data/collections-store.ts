import {create} from 'zustand';
import {nanoid} from "nanoid";


export type TBackgroundAppearance = {
	colorFrom: string
	colorTo: string
	angle: number
}

export type TCollectionStat = {
	created_at: Date
	changed_at: Date
}

export type TCollectionAppearance = {
	background: TBackgroundAppearance
}

export type TCollection = {
	id?: string
	title?: string
	isLocal?: boolean
	author?: string
	stat?: TCollectionStat
	appearance?: TCollectionAppearance
	sides?: [string, string] // 2
	// cards: Array<TCard> // TBD
}

// export type TCollections = Array<TCollection>

export interface ICollectionState {
	collections: Array<TCollection>
	// getCollection: (id: string) => TCollection | undefined
	add: (newCollection: TCollection) => void
	remove: (id: string) => void
	rename: (id: string, title: string) => void
}

export const useCollectionStore = create<ICollectionState>((set) => ({
	collections: [{id: nanoid(), title: 'Test collection'}, {id: nanoid(), title: 'Second collection', isLocal: true}],
	// getCollection: (id) => {
	// 	return collectionStore.collections.find(c => c.id === id);
	// },
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
	rename: (id, title) => set((state,) => {
		return {
			collections: state.collections.map(c => c.id !== id ? c : {...c, title})
		};
	}),
}));
