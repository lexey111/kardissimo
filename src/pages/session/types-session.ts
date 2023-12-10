export type TCardAppearance = {
	color: string
	fontName: string
	fontSize: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
	textColor: string
}

export type TCardSide = {
	name: string
	header: string
	text: string
	footer: string
	appearance: TCardAppearance
}


export type TPreparedSide = { id: number } & TCardSide & TCardboxSide;
export type TPreparedCard = [TPreparedSide, TPreparedSide]; // [{id, text, color, font...}, {id, text, color, font...}]...
export type TPreparedCards = Array<TPreparedCard>; // [ [id...], [id...] ]

export type TCardboxSide = { name: string } & TCardAppearance;
