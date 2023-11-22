import {create} from 'zustand';
import {Appearances} from "../../resources/appearance.ts";
import {assignGlobalStyles} from "./settings-store.utils.ts";

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

let lastTheme = localStorage.getItem('lastUsedTheme');
if (!lastTheme || !Appearances.find(ap => ap.id === lastTheme)) {
	lastTheme = 'default';
} else {
	assignGlobalStyles(lastTheme);
}


export const useSettingsStore = create<ISettingsState>(() => ({
	...DefaultSettings,
	currentAppearance: lastTheme!,
	busy: true
}));
