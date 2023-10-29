import React from "react";

import {Text} from "@react-three/drei";
import {CardSurface} from "./card-surface.component.tsx";
import {cardThickness} from "./card-utils.ts";
import {TPreparedSide} from "../../../../store/data/types.ts";

export type TCardFaceProps = {
	face: TPreparedSide
	positionZ: number
	rotation: any
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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {id: _1, fontSize: _2, ...headerProps} = props.face;
	headerProps.text = props.face.header || '';
	// @ts-ignore
	headerProps['fontSize'] = fontSize * .7;

	const footerProps = {...headerProps};
	footerProps.text = props.face.footer || '';
	// @ts-ignore
	footerProps['fontSize'] = fontSize * .7;

	const textProps = {...headerProps};
	textProps.text = props.face.text || '';
	// @ts-ignore
	textProps['fontSize'] = fontSize;

	return <group
		position-z={props.positionZ}
		rotation={props.rotation}
	>
		{props.face.header && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={120}
			{...headerProps}
			color={props.face.textColor}
			anchorX={'center'}
			anchorY="top"> </Text>}

		<Text
			position-z={cardThickness / 2 + 0.5}
			{...textProps}
			position-y={5}
			fontSize={fontSize}
			color={props.face.textColor}
			anchorX={'center'}
			anchorY="middle"> </Text>

		{props.face.footer && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={-120}
			{...footerProps}
			color={props.face.textColor}
			anchorX={'center'}
			anchorY="bottom"> </Text>}

		<CardSurface color={props.face.color!} positionZ={0}/>
	</group>;
};
