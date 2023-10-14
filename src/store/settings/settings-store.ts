import {create} from 'zustand';

export type TCardListStyle = 'list' | 'cards' | 'table';
export type TCardListTableMode = 'readonly' | 'editable';

export type ISettingsState = {
	cardListStyle: TCardListStyle,
	tableEditMode: TCardListTableMode
}

export const useSettingsStore = create<ISettingsState>(() => ({
	cardListStyle: 'list',
	tableEditMode: 'readonly'
}));
