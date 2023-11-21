import {
	ISettingsState,
	TCardListStyle,
	TCardListTableMode,
	TCardListTableViewMode,
	useSettingsStore
} from "./settings-store.ts";
import {Appearances} from "../../resources/appearance.ts";
import {supabase} from "../supabase.ts";
import {useAuthStore} from "../auth/auth-store.ts";

export const setAllSetting = (data: ISettingsState, updateStyles = false) => useSettingsStore.setState((state) => {
	if (updateStyles) {
		assignGlobalStyles(data?.currentAppearance);
	}
	return {...state, ...data};
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

const r: any = document.querySelector(':root');

function LightenDarkenColor(col: string, amt: number) {
	let usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}

	const num = parseInt(col, 16);

	let r = (num >> 16) + amt;

	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	let b = ((num >> 8) & 0x00FF) + amt;

	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	let g = (num & 0x0000FF) + amt;

	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

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

export const assignGlobalStyles = (id: string) => {
	const app = Appearances.find(ap => ap.id === id);
	if (!id || !app) {
		return;
	}
	// @ts-ignore
	document.body.classList = 'theme-' + app.id;

	r!.style.setProperty('--app-background', app?.background);
	r!.style.setProperty('--app-text', app?.textColor);
	r!.style.setProperty('--app-primary-background', app?.primaryColor); // synonyms
	r!.style.setProperty('--app-background-color', app?.primaryColor);

	r!.style.setProperty('--app-success-background', app?.successColor);
	r!.style.setProperty('--app-success-text', app?.successText || '#fff');

	r!.style.setProperty('--app-accent-background', app?.accentColor);
	r!.style.setProperty('--app-accent-background-darken', LightenDarkenColor(app!.accentColor!, -20));

	r!.style.setProperty('--app-danger-background', app?.dangerColor);
	r!.style.setProperty('--app-danger-text', app?.dangerText || '#fff');
	r!.style.setProperty('--app-danger-background-darken', LightenDarkenColor(app!.dangerColor!, -20));
};


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
