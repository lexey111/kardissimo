export type TAppAppearance = {
	id: string,
	name: string
	background: string
	darkBackground: string
	darkBackgroundSolid: string
	textColor: string
	linkColor?: string
	textLinkColor?: string
	primaryColor: string
	primaryText: string
	accentColor: string
	accentText: string

	infoColor?: string
	infoText?: string

	inputBackground?: string
	inputText?: string

	dangerColor: string
	dangerText?: string

	successColor: string
	successText?: string
}
export const Appearances: Array<TAppAppearance> = [
	{
		id: 'default',
		name: 'Default',
		background: 'linear-gradient(150deg, #569AFF 10.21%, #88DFAB 84.57%)',
		darkBackground: 'linear-gradient(110deg, #324262 10.21%, #1a2825 84.57%)',
		darkBackgroundSolid: '#0b252f',
		textColor: '#fff',
		inputBackground: '#fff',
		inputText: '#333',
		linkColor: '#fff',
		textLinkColor: '#0075ce',
		primaryColor: '#0075ce',
		primaryText: '#fff',
		accentColor: '#ffbd0e',
		accentText: '#222',
		dangerColor: '#FF005B',
		successColor: '#01a628',
		infoColor: '#abcdf5',
		infoText: '#295770'
	},
	{
		id: 'sky',
		name: 'Deep Sky',
		background: 'linear-gradient(10deg, #028dff 10.21%, #092f4f 84.57%)',
		darkBackground: 'linear-gradient(170deg, #0667be 10.21%, #0667be 84.57%)',
		darkBackgroundSolid: '#023649',
		textColor: '#d3d8ec',
		inputBackground: '#fff',
		inputText: '#333',
		linkColor: '#25d1ea',
		textLinkColor: '#0667be',
		primaryColor: '#165786',
		primaryText: '#b1d1ec',
		accentColor: '#00a4e3',
		accentText: '#012628',
		dangerColor: '#e1128e',
		successColor: '#12e594',
		infoColor: '#053873',
		infoText: '#99c1ff'
	},
	{
		id: 'bright',
		name: 'Bright Future',
		background: 'linear-gradient(150deg, #0067ff 10.21%, #ff0099 84.57%)',
		darkBackground: 'linear-gradient(110deg, #5d00ce 10.21%, #092f4f 84.57%)',
		darkBackgroundSolid: '#005472',
		textColor: '#e4d4f1',
		inputBackground: '#fff',
		inputText: '#333',
		linkColor: '#fa5ced',
		textLinkColor: '#a203a0',
		primaryColor: '#5d00ce',
		primaryText: '#ccb1ec',
		accentColor: '#ff00f1',
		accentText: '#2a042a',
		dangerText: '#e8c9c9',
		dangerColor: '#ff0000',
		successColor: '#8cff00',
		successText: '#192d01',
		infoColor: '#0076ff',
		infoText: '#b9f7ff'
	},
	{
		id: 'snow',
		name: 'Snowflake',
		background: '#f2f2f2',
		darkBackground: 'linear-gradient(110deg, #b6b6b6 10.21%, #fff 84.57%)',
		darkBackgroundSolid: '#545c60',
		textColor: '#404950',
		inputBackground: '#fff',
		inputText: '#333',
		linkColor: '#599da6',
		textLinkColor: '#56859b',
		primaryColor: '#d7e0e7',
		primaryText: '#30454f',
		accentColor: '#d9d9d9',
		accentText: '#333',
		dangerColor: '#c93030',
		dangerText: '#e8c9c9',
		successColor: '#5abb4f',
		infoColor: '#c0d1ef',
		infoText: '#555b5d'
	},
	{
		id: 'grey',
		name: 'Wrocław',
		background: '#757575',
		darkBackground: 'linear-gradient(110deg, #323b44 10.21%, #09090b 84.57%)',
		darkBackgroundSolid: '#464646',
		textColor: '#ddd',
		inputBackground: '#dadada',
		inputText: '#333',
		linkColor: '#b0bfd2',
		textLinkColor: '#536879',
		primaryColor: '#323b44',
		primaryText: '#abb6c0',
		accentColor: '#7e7e7b',
		accentText: '#504f4b',
		dangerColor: '#a2013a',
		dangerText: '#e8c9c9',
		successColor: '#04621a',
		successText: '#b0de7d',
		infoColor: '#cad3ea',
		infoText: '#5d5d5d'
	},
	{
		id: 'dark',
		name: 'Camisa Negra',
		background: '#252525',
		darkBackground: 'linear-gradient(120deg, #555 10.21%, #333 84.57%)',
		darkBackgroundSolid: '#1e2c33',
		textColor: '#ccc',
		inputBackground: '#232323',
		inputText: '#bbb',
		linkColor: '#85775d',
		textLinkColor: '#8c7642',
		primaryColor: '#775b39',
		primaryText: '#fcf8ac',
		accentColor: '#00773d',
		accentText: '#daffdb',
		dangerColor: '#ff4400',
		successColor: '#4f640f',
		infoColor: '#1b4140',
		infoText: '#66b8bd'
	},
]
