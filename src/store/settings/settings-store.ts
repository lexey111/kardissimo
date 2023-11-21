import {create} from 'zustand';

export type TCardListStyle = 'list' | 'cards' | 'table';
export type TCardListTableMode = 'readonly' | 'editable';
export type TCardListTableViewMode = 'wide' | 'narrow';

export type ISettingsState = {
	cardListStyle: TCardListStyle,
	tableEditMode: TCardListTableMode
	tableViewMode: TCardListTableViewMode
	selectedSide: number
	currentAppearance: string
	busy: boolean
}

export const DefaultSettings: ISettingsState = {
	cardListStyle: 'list',
	tableEditMode: 'readonly',
	tableViewMode: 'wide',
	selectedSide: 0,
	currentAppearance: 'default',
	busy: false
};

export const useSettingsStore = create<ISettingsState>(() => ({
	...DefaultSettings,
	busy: true
}));
