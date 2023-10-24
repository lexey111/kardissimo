export type TCardFace = {
	text: string
	header?: string
	footer?: string
	fontName: string
	font: string
	fontSize: string
	color: string
	textColor: string
	textAlign: 'center' | 'left' | 'right'
	maxWidth: number
	lineHeight: number
	letterSpacing: number
}

export type TCardFaceProp = Pick<TCardFace, 'text'> & (Partial<Omit<TCardFace, 'text'>>);

export type TCardProps = {
	faces: [TCardFaceProp, TCardFaceProp]
	active?: 'active' | 'slight' | 'none'
	side?: number
};

export type TExtendedCardProps = TCardFace & { font: string };
