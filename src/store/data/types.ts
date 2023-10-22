export type TBackgroundAppearance = {
	colorFrom: string
	colorTo: string
	angle: number
}

export type TCollectionStat = {
	created_at: Date
	changed_at: Date
}

export type TCardSide = {
	header?: string
	word: string
	footer?: string
}

export type TCard = {
	id: string
	sides?: Array<TCardSide>  // 2, TBD
};

export type TCardAppearance = {
	color?: string
	fontName?: string
	fontSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
	fontColor?: string
}

export type TCardEnriched = TCard & { collectionSides?: Array<TCollectionSide> };

export type TCollectionSide = { name: string } & TCardAppearance;

export type TCollection = {
	id?: string
	title?: string
	isLocal?: boolean
	author?: string
	stat?: TCollectionStat
	sides?: Array<TCollectionSide> // 2, TBD
	cards?: Array<TCard>
}
