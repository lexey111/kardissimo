import {useSettingsStore} from "./settings-store.ts";

export const getCardListStyle = () => useSettingsStore.getState().cardListStyle;
