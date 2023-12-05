import {create} from 'zustand';
import {TCardbox} from "../cardboxes/types-cardbox.ts";

export type ICardboxState = {
	cardboxes: Array<TCardbox>
}

export const useCardboxStore = create<ICardboxState>(() => ({
	cardboxes: []
}));
