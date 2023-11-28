import {create} from 'zustand';
import {TCardbox} from "./types.ts";

export type ICardboxState = {
	cardboxes: Array<TCardbox>
}

export const useCardboxStore = create<ICardboxState>(() => ({
	cardboxes: []
}));
