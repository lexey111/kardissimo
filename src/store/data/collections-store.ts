import {create} from 'zustand';
import {TCollection} from "./types.ts";

export type ICollectionState = {
	collections: Array<TCollection>
}

export const useCollectionStore = create<ICollectionState>(() => ({
	collections: []
}));
