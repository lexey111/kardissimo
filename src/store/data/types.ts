export type TBackgroundAppearance = {
	colorFrom: string
	colorTo: string
	angle: number
}

export type TCollectionStat = {
	created_at: Date
	changed_at: Date
}

export type TCollectionAppearance = {
	fontName: string
	background: TBackgroundAppearance
}

export type TCardSideAppearance = {
	id: string
	background: string
	color: string
	font: string

	fontSizeHeader: number
	fontSizeWord: number
	fontSizeFooter: number
}

export type TCardSide = {
	header?: string
	word: string
	footer?: string
}

export type TCard = {
	id: string
	sides?: [TCardSide, TCardSide]  // 2, TBD
};

export type TCollection = {
	id?: string
	title?: string
	isLocal?: boolean
	author?: string
	stat?: TCollectionStat
	appearance?: TCollectionAppearance
	sides?: [string, string] // 2, TBD
	cards?: Array<TCard> // TBD
}
