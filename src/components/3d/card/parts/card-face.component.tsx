import React from "react";

import {Text} from "@react-three/drei";
import {CardSurface} from "./card-surface.component.tsx";
import {cardThickness, DefaultValues} from "./card-utils.ts";
import {TCardFace, TPreparedSide} from "../../../../store/cards/types-card-face.ts";

export type TCardFaceProps = {
	face: TPreparedSide
	positionZ: number
	rotation: any
}

function getSafeValues(values: TCardFace): TCardFace {
	return {
		...DefaultValues,
		text: values.text,
		header: values.header,
		footer: values.footer,
		fontName: values.fontName,
		font: values.font,
		fontSize: values.fontSize,
		color: values.color,
		textColor: values.textColor,
		textAlign: values.textAlign,
		maxWidth: values.maxWidth,
		lineHeight: values.lineHeight,
		letterSpacing: values.letterSpacing
	}
}

export const CardFace: React.FC<TCardFaceProps> = (props: TCardFaceProps) => {
	let fontSize = 21; // M

	if (props.face.fontSize === 'XXS') {
		fontSize = 10;
	}
	if (props.face.fontSize === 'XS') {
		fontSize = 14;
	}
	if (props.face.fontSize === 'S') {
		fontSize = 18;
	}
	if (props.face.fontSize === 'L') {
		fontSize = 24;
	}
	if (props.face.fontSize === 'XL') {
		fontSize = 30;
	}
	if (props.face.fontSize === 'XXL') {
		fontSize = 36;
	}
	if (props.face.fontSize === 'XXXL') {
		fontSize = 42;
	}

	const safeFace = getSafeValues(props.face);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	//const {fontSize: _1, id: _2, ...headerProps} = props.face;

	const headerProps = {...safeFace, fontSize: fontSize * .7, text: safeFace.header};
	const footerProps = {...safeFace, fontSize: fontSize * .7, text: safeFace.footer};
	const textProps = {...safeFace, fontSize: fontSize, text: safeFace.text};

	return <group
		position-z={props.positionZ}
		rotation={props.rotation}
	>
		{props.face.header && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={130}
			{...headerProps}
			color={textProps.textColor}
			clipRect={[-95, -20, 95, 20]}
			anchorX={'center'}
			anchorY="top">{textProps.header}</Text>}

		<Text
			position-z={cardThickness / 2 + 0.5}
			{...textProps}
			position-y={5}
			fontSize={fontSize}
			color={textProps.textColor}
			clipRect={[-95, -100, 95, 100]}
			anchorX={'center'}
			anchorY="middle">{textProps.text}</Text>

		{props.face.footer && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={-130}
			{...footerProps}
			clipRect={[-95, -20, 95, 20]}
			color={textProps.textColor}
			anchorX={'center'}
			anchorY="bottom">{textProps.footer}</Text>}

		<CardSurface color={props.face.color!} positionZ={0}/>
	</group>;
};
