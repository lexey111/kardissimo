import {TCardListStyle, useSettingsStore} from "./settings-store.ts";

export const setCardListStyle = (style: TCardListStyle) => useSettingsStore.setState((state) => {
	return {...state, cardListStyle: style};
});
