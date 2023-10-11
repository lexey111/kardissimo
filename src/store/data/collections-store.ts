import {create} from 'zustand';
import {customAlphabet, urlAlphabet} from 'nanoid';

const nanoid = customAlphabet(urlAlphabet, 16);


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
	add: (newCollection: TCollection) => void
	remove: (id: string) => void
	update: (data: TCollection) => void
}

// const collection = useCollectionStore((state) => state.collections.find(c => c.id === id));
export const useCollectionStore = create<ICollectionState>((set) => ({
	collections: [
		{
			id: nanoid(),
			title: 'Test collection',
			author: 'unknown',
			isLocal: true,
			sides: ['aaa', 'bbb']
		},
		{
			id: nanoid(),
			title: 'Second collection',
			author: 'unknown',
			isLocal: true,
			sides: ['a123', 'b234']
		}],
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
}));
