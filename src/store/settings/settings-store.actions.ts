import {TCardListStyle, TCardListTableMode, useSettingsStore} from "./settings-store.ts";

export const setCardListStyle = (style: TCardListStyle) => useSettingsStore.setState((state) => {
	return {...state, cardListStyle: style};
});

export const setTableEditMode = (mode: TCardListTableMode) => useSettingsStore.setState((state) => {
	return {...state, tableEditMode: mode};
});
