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

	return {...state, currentAppearance: id};
});
