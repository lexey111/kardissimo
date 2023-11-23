export type TAppAppearance = {
	id: string,
	name: string
	background: string
	textColor: string
	linkColor?: string
	primaryColor: string
	accentColor: string

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
		textColor: '#fff',
		linkColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'sky',
		name: 'Deep Sky',
		background: 'linear-gradient(10deg, #028dff 10.21%, #092f4f 84.57%)',
		textColor: '#d3d8ec',
		linkColor: '#25d1ea',
		primaryColor: '#165786',
		accentColor: '#89e7d9',
		dangerColor: '#e1128e',
		successColor: '#12e594'
	},
	{
		id: 'bright',
		name: 'Bright Future',
		background: 'linear-gradient(150deg, #0067ff 10.21%, #ff0099 84.57%)',
		textColor: '#e4d4f1',
		linkColor: '#fa5ced',
		primaryColor: '#5d00ce',
		accentColor: '#ff00f1',
		dangerText: '#e8c9c9',
		dangerColor: '#ff0000',
		successColor: '#8cff00',
		successText: '#192d01'
	},
	{
		id: 'snow',
		name: 'Snowflake',
		background: '#f2f2f2',
		textColor: '#404950',
		linkColor: '#599da6',
		primaryColor: '#d7e0e7',
		accentColor: '#b6b6b6',
		dangerColor: '#c54747',
		dangerText: '#e8c9c9',
		successColor: '#5abb4f'
	},
	{
		id: 'grey',
		name: 'Wrocław',
		background: '#757575',
		textColor: '#ddd',
		linkColor: '#b0bfd2',
		primaryColor: '#323b44',
		accentColor: '#655e56',
		dangerColor: '#a2013a',
		dangerText: '#e8c9c9',
		successColor: '#04621a',
		successText: '#b0de7d'
	},
	{
		id: 'dark',
		name: 'Camisa Negra',
		background: '#252525',
		textColor: '#ccc',
		linkColor: '#85775d',
		primaryColor: '#936606',
		accentColor: '#0384bb',
		dangerColor: '#ff4400',
		successColor: '#7c9d16'
	},
]
