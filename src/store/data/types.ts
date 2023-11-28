export type TCardAppearance = {
	color?: string
	fontName?: string
	fontSize?: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
	textColor?: string
	colorSchemaName?: string
}

export type TCardboxStat = {
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

export type TCardEnriched = TCard & { cardboxSides?: Array<TCardboxSide> };

export type TPreparedSide = { id?: string } & TCardSide & TCardboxSide;
export type TPreparedCard = Array<TPreparedSide>; // [{id, text, color, font...}, {id, text, color, font...}]...
export type TPreparedCards = Array<TPreparedCard>; // [ [id...], [id...] ]

export type TCardboxSide = { name: string } & TCardAppearance;

export type TCardbox = {
	id?: string
	title?: string
	isLocal?: boolean
	author?: string
	stat?: TCardboxStat
	sides?: Array<TCardboxSide> // 2, TBD
	cards?: Array<TCard>
}
