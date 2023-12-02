export type TCardListStyle = 'list' | 'cards' | 'table';
export type TCardListTableMode = 'readonly' | 'editable';
export type TCardListTableViewMode = 'wide' | 'narrow';

export type TSettingsState = {
	cardListStyle: TCardListStyle,
	tableEditMode: TCardListTableMode
	tableViewMode: TCardListTableViewMode
	selectedSide: number
	currentAppearance: string
}

export const defaultAppState: TSettingsState = {
	cardListStyle: 'list',
	tableEditMode: 'readonly',
	tableViewMode: 'wide',
	selectedSide: 0,
	currentAppearance: 'default',
};
