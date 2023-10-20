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

export type TCardSide = {
	header?: string
	word: string
	footer?: string
}

export type TCard = {
	id: string
	sides?: [TCardSide, TCardSide]  // 2, TBD
};

export type TCollectionSide = {
	name: string
	fontName?: string
	fontSize?: 'XS' | 'S' | 'M' | 'L' | 'XL'
	color?: string
}

export type TCollection = {
	id?: string
	title?: string
	isLocal?: boolean
	author?: string
	stat?: TCollectionStat
	sides?: [TCollectionSide, TCollectionSide] // 2, TBD
	cards?: Array<TCard>
}
