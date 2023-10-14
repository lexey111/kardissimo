import {create} from 'zustand';

export type TCardListStyle = 'list' | 'cards' | 'table';

export type ISettingsState = {
	cardListStyle: TCardListStyle
}

export const useSettingsStore = create<ISettingsState>(() => ({
	cardListStyle: 'list'
}));
