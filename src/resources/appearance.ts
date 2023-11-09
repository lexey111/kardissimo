export type TAppAppearance = {
	id: string,
	name: string
	background: string
	textColor: string
	primaryColor: string
	accentColor: string
	dangerColor: string
	successColor: string
}
export const Appearances: Array<TAppAppearance> = [
	{
		id: 'default',
		name: 'Default',
		background: 'linear-gradient(150deg, #569AFF 10.21%, #88DFAB 84.57%)',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'sky',
		name: 'Deep Sky',
		background: 'linear-gradient(10deg, #0269ff 10.21%, #1b207a 84.57%)',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'bright',
		name: 'Bright Future',
		background: 'linear-gradient(150deg, #0067ff 10.21%, #ff0099 84.57%)',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'snow',
		name: 'Snowflake',
		background: '#f2f2f2',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'grey',
		name: 'Wrocław',
		background: '#757575',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
	{
		id: 'dark',
		name: 'Camisa Negra',
		background: '#252525',
		textColor: '#fff',
		primaryColor: '#0075ce',
		accentColor: '#ffbd0e',
		dangerColor: '#FF005B',
		successColor: '#01a628'
	},
]
