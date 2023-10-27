import React from "react";

import {Text} from "@react-three/drei";
import {CardSurface} from "./card-surface.component.tsx";
import {TExtendedCardProps} from "../card-types.ts";
import {cardThickness} from "./card-utils.ts";

export type TCardFaceProps = {
	face: TExtendedCardProps
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

	const headerProps = {...props.face};


	headerProps.text = props.face.header || '';
	const headerFontSize = fontSize * .7;

	const footerProps = {...props.face};
	footerProps.text = props.face.footer || '';

	return <group
		position-z={props.positionZ}
		rotation={props.rotation}
	>
		{props.face.header && <Text position-z={cardThickness / 2 + 0.5}
		                            position-y={120}
		                            {...headerProps}
									fontSize={headerFontSize}
		                            color={props.face.textColor}
		                            anchorX={props.face.textAlign}
		                            anchorY="top"> </Text>}

		<Text position-z={cardThickness / 2 + 0.5}
		      {...props.face}
		      position-y={5}
		      fontSize={fontSize}
		      color={props.face.textColor}
		      anchorX={props.face.textAlign}
		      anchorY="middle"> </Text>

		{props.face.footer && <Text position-z={cardThickness / 2 + 0.5}
		                            position-y={-120}
		                            {...footerProps}
		                            fontSize={headerFontSize}
		                            color={props.face.textColor}
		                            anchorX={props.face.textAlign}
		                            anchorY="bottom"> </Text>}

		<CardSurface color={props.face.color} positionZ={0}/>
	</group>;
};
