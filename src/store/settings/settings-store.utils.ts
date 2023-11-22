import {Appearances} from "../../resources/appearance.ts";

const r: any = document.querySelector(':root');

export function LightenDarkenColor(col: string, amt: number) {
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

export const assignGlobalStyles = (id: string) => {
	const app = Appearances.find(ap => ap.id === id);
	if (!id || !app) {
		return;
	}

	Appearances.forEach(app => document.body.classList.remove('theme-' + app.id));
	document.body.classList.add('theme-' + app.id);
	localStorage.setItem('lastUsedTheme', app.id);

	r!.style.setProperty('--app-background', app?.background); // gradient
	r!.style.setProperty('--app-text', app?.textColor);
	r!.style.setProperty('--app-primary-background', app?.primaryColor); // synonyms
	r!.style.setProperty('--app-primary-background-darken', LightenDarkenColor(app!.primaryColor!, 15));
	r!.style.setProperty('--app-background-color', app?.primaryColor);

	r!.style.setProperty('--app-success-background', app?.successColor);
	r!.style.setProperty('--app-success-text', app?.successText || '#fff');

	r!.style.setProperty('--app-accent-background', app?.accentColor);
	r!.style.setProperty('--app-accent-background-darken', LightenDarkenColor(app!.accentColor!, -20));

	r!.style.setProperty('--app-danger-background', app?.dangerColor);
	r!.style.setProperty('--app-danger-text', app?.dangerText || '#fff');
	r!.style.setProperty('--app-danger-background-darken', LightenDarkenColor(app!.dangerColor!, -20));
};
