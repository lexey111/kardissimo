export type TColorSchemeContent = {
	color: string
	textColor: string
};

export type TColorScheme = Record<string, TColorSchemeContent>;

export const ColorSchemes: TColorScheme = {
	'Default': {textColor: '#111', color: '#f2f2f2'},
	'White and Black': {textColor: '#222', color: '#eee'},
	'White and Blue': {textColor: '#004491', color: '#eee'},
	'White and Red': {textColor: '#910033', color: '#eee'},
	'Green and Black': {textColor: '#222', color: '#9bda5c'},
	'Green and Blue': {textColor: '#004491', color: '#9bda5c'},
	'Green and Red': {textColor: '#910033', color: '#9bda5c'},
	'Yellow and Black': {textColor: '#222', color: '#fffb46'},
	'Yellow and Blue': {textColor: '#004491', color: '#fffb46'},
	'Yellow and Red': {textColor: '#910033', color: '#fffb46'},
	'Orange and Black': {textColor: '#222', color: '#d29002'},
	'Orange and Blue': {textColor: '#02326c', color: '#d29002'},
	'Orange and Red': {textColor: '#910033', color: '#d29002'},
	'Red and Black': {textColor: '#222', color: '#d20240'},
	'Red and Yellow': {textColor: '#fff3a6', color: '#d20240'},
	'Red and Red': {textColor: '#59011e', color: '#d20240'},
	'Red and White': {textColor: '#fff', color: '#d20240'},
	'Black and White': {textColor: '#f1efef', color: '#111'},
	'Black and Blue': {textColor: '#00b3ff', color: '#112'},
	'Black and Green': {textColor: '#2de100', color: '#121'},
	'Black and Red': {textColor: '#ff1334', color: '#211'},
}
