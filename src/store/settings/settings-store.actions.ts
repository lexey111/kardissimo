import {
	DefaultSettings,
	ISettingsState,
	TCardListStyle,
	TCardListTableMode,
	TCardListTableViewMode,
	useSettingsStore
} from "./settings-store.ts";
import {Appearances} from "../../resources/appearance.ts";
import {supabase} from "../supabase.ts";
import {useAuthStore} from "../auth/auth-store.ts";
import {assignGlobalStyles} from "./settings-store.utils.ts";

export const setAllSetting = (data: ISettingsState) => useSettingsStore.setState((state) => {
	return {...state, ...data};
});

export const resetSettings = () => useSettingsStore.setState((state) => {
	assignGlobalStyles(DefaultSettings.currentAppearance);
	return {...state, ...DefaultSettings};
});

export const setCardListStyle = (style: TCardListStyle) => useSettingsStore.setState((state) => {
	const result = {...state, cardListStyle: style};
	void saveSettingsToServer(result);

	return result;
});

export const setBusyState = (busy: boolean) => useSettingsStore.setState((state) => {
	return {...state, busy: busy};
});

export const setTableEditMode = (mode: TCardListTableMode) => useSettingsStore.setState((state) => {
	const result = {...state, tableEditMode: mode};
	void saveSettingsToServer(result);

	return result;
});

export const setTableViewMode = (mode: TCardListTableViewMode) => useSettingsStore.setState((state) => {
	const result = {...state, tableViewMode: mode};
	void saveSettingsToServer(result);

	return result;
});

export const setSelectedSide = (side: number) => useSettingsStore.setState((state) => {
	const result = {...state, selectedSide: side};
	void saveSettingsToServer(result);

	return result;
});

export const setCurrentAppearance = (id: string) => useSettingsStore.setState((state) => {
	const app = Appearances.find(ap => ap.id === id);
	if (!id || !app) {
		return {...state};
	}

	const result = {...state, currentAppearance: id};
	assignGlobalStyles(id);
	void saveSettingsToServer(result);
	return result;
});

export const loadSettingsFromServer = async (): Promise<any> => {
	const {data, error} = await supabase
		.from('settings')
		.select();

	if (error) {
		throw error;
	}

	if (!data?.[0]?.data) {
		throw new Error('Invalid data from server');
	}

	const state = JSON.parse(data[0].data);
	setAllSetting({...state, busy: false});
	assignGlobalStyles(state.currentAppearance);
}


export const saveSettingsToServer = async (state: Record<string, any>) => {
	const userId = useAuthStore.getState().loginData.id;

	const {error} = await supabase
		.from('settings')
		.upsert({data: JSON.stringify(state)})
		.eq('id', userId)

	if (error) {
		throw error;
	}

	setBusyState(false);
}
