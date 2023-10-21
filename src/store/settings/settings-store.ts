import {create} from 'zustand';

export type TCardListStyle = 'list' | 'cards' | 'table';
export type TCardListTableMode = 'readonly' | 'editable';
export type TCardListTableViewMode = 'wide' | 'narrow';

export type ISettingsState = {
	cardListStyle: TCardListStyle,
	tableEditMode: TCardListTableMode
	tableViewMode: TCardListTableViewMode
	selectedSide: number
}

export const useSettingsStore = create<ISettingsState>(() => ({
	cardListStyle: 'list',
	tableEditMode: 'readonly',
	tableViewMode: 'wide',
	selectedSide: 0,
}));
