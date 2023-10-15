import {TCardListStyle, TCardListTableMode, TCardListTableViewMode, useSettingsStore} from "./settings-store.ts";

export const setCardListStyle = (style: TCardListStyle) => useSettingsStore.setState((state) => {
	return {...state, cardListStyle: style};
});

export const setTableEditMode = (mode: TCardListTableMode) => useSettingsStore.setState((state) => {
	return {...state, tableEditMode: mode};
});

export const setTableViewMode = (mode: TCardListTableViewMode) => useSettingsStore.setState((state) => {
	return {...state, tableViewMode: mode};
});

export const setSelectedSide = (side: string) => useSettingsStore.setState((state) => {
	return {...state, selectedSide: side};
});
