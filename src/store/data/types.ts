export type TCardAppearance = {
	color?: string
	fontName?: string
	fontSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
	textColor?: string
	colorSchemaName?: string
}

export type TCollectionStat = {
	created_at: Date
	changed_at: Date
}

export type TCardSide = {
	header?: string
	text: string
	footer?: string
	appearance? : TCardAppearance
}

export type TCard = {
	id: string
	ownDesign?: boolean
	sides?: Array<TCardSide>
};

export type TCardEnriched = TCard & { collectionSides?: Array<TCollectionSide> };

export type TPreparedSide = { id?: string } & TCardSide & TCollectionSide;
export type TPreparedCard = Array<TPreparedSide>; // [{id, text, color, font...}, {id, text, color, font...}]...
export type TPreparedCards = Array<TPreparedCard>; // [ [id...], [id...] ]

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
