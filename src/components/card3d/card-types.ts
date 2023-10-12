export type TCardFace = {
	text: string
	fontName: string
	font: string
	fontSize: number
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
	active?: boolean
};

export type TExtendedCardProps = TCardFace & { font: string };
