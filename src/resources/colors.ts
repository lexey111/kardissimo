export type TColorSchemeContent = {
	background: string
	text: string
};

export type TColorScheme = Record<string, TColorSchemeContent>;

export const ColorSchemes: TColorScheme = {
	'White and Black': {text: '#222', background: '#eee'},
	'White and Blue': {text: '#004491', background: '#eee'},
	'White and Red': {text: '#910033', background: '#eee'},
	'Green and Black': {text: '#222', background: '#9bda5c'},
	'Green and Blue': {text: '#004491', background: '#9bda5c'},
	'Green and Red': {text: '#910033', background: '#9bda5c'},
	'Yellow and Black': {text: '#222', background: '#fffb46'},
	'Yellow and Blue': {text: '#004491', background: '#fffb46'},
	'Yellow and Red': {text: '#910033', background: '#fffb46'},
	'Orange and Black': {text: '#222', background: '#d29002'},
	'Orange and Blue': {text: '#02326c', background: '#d29002'},
	'Orange and Red': {text: '#910033', background: '#d29002'},
	'Red and Black': {text: '#222', background: '#d20240'},
	'Red and Yellow': {text: '#fff3a6', background: '#d20240'},
	'Red and Red': {text: '#59011e', background: '#d20240'},
	'Red and white': {text: '#fff', background: '#d20240'},
	'Black and White': {text: '#f1efef', background: '#111'},
	'Black and Blue': {text: '#00b3ff', background: '#112'},
	'Black and Green': {text: '#2de100', background: '#121'},
	'Black and Red': {text: '#ff1334', background: '#211'},
}
