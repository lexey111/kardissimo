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
	return <group
		position-z={props.positionZ}
		// @ts-ignore
		rotation={props.rotation}
	>
		<Text
			position-z={cardThickness / 2 + 0.5}
			{...props.face}
			color={props.face.textColor}
			anchorX={props.face.textAlign}
			anchorY="middle"
		>
		</Text>
		<CardSurface color={props.face.color} positionZ={0}/>
	</group>;
};
