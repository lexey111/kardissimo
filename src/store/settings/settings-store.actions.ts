import {TCardListStyle, TCardListTableMode, TCardListTableViewMode, useSettingsStore} from "./settings-store.ts";
import {Appearances} from "../../resources/appearance.ts";

export const setCardListStyle = (style: TCardListStyle) => useSettingsStore.setState((state) => {
	return {...state, cardListStyle: style};
});

export const setTableEditMode = (mode: TCardListTableMode) => useSettingsStore.setState((state) => {
	return {...state, tableEditMode: mode};
});

export const setTableViewMode = (mode: TCardListTableViewMode) => useSettingsStore.setState((state) => {
	return {...state, tableViewMode: mode};
});

export const setSelectedSide = (side: number) => useSettingsStore.setState((state) => {
	return {...state, selectedSide: side};
});

const r: any = document.querySelector(':root');

export const setCurrentAppearance = (id: string) => useSettingsStore.setState((state) => {
	const app = Appearances.find(ap => ap.id === id);
	if (!id) {
		return {...state};
	}

	r!.style.setProperty('--app-background', app?.background);

	return {...state, currentAppearance: id};
});
