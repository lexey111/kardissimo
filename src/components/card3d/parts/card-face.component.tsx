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
	const headerProps = {...props.face};
	headerProps.text = props.face.header || '';
	headerProps.fontSize = props.face.fontSize * .7;

	const footerProps = {...props.face};
	footerProps.text = props.face.footer || '';
	footerProps.fontSize = props.face.fontSize * .7;

	return <group
		position-z={props.positionZ}
		// @ts-ignore
		rotation={props.rotation}
	>
		{props.face.header && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={120}
			{...headerProps}
			color={props.face.textColor}
			anchorX={props.face.textAlign}
			anchorY="top"></Text>}

		<Text
			position-z={cardThickness / 2 + 0.5}
			{...props.face}
			position-y={5}
			color={props.face.textColor}
			anchorX={props.face.textAlign}
			anchorY="middle"></Text>

		{props.face.footer && <Text
			position-z={cardThickness / 2 + 0.5}
			position-y={-120}
			{...footerProps}
			color={props.face.textColor}
			anchorX={props.face.textAlign}
			anchorY="bottom"></Text>}

		<CardSurface color={props.face.color} positionZ={0}/>
	</group>;
};
