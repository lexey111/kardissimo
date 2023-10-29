import * as THREE from "three";
import React from "react";
import {cardBorderRadius, cardHeight, cardThickness, cardWidth} from "./card-utils.ts";

const x = 0;
const y = 0;

const cardSurfaceShape = new THREE.Shape();
cardSurfaceShape.moveTo(x, y + cardBorderRadius);
cardSurfaceShape.lineTo(x, y + cardHeight - cardBorderRadius);
cardSurfaceShape.quadraticCurveTo(x, y + cardHeight, x + cardBorderRadius, y + cardHeight);
cardSurfaceShape.lineTo(x + cardWidth - cardBorderRadius, y + cardHeight);
cardSurfaceShape.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth, y + cardHeight - cardBorderRadius);
cardSurfaceShape.lineTo(x + cardWidth, y + cardBorderRadius);
cardSurfaceShape.quadraticCurveTo(x + cardWidth, y, x + cardWidth - cardBorderRadius, y);
cardSurfaceShape.lineTo(x + cardBorderRadius, y);
cardSurfaceShape.quadraticCurveTo(x, y, x, y + cardBorderRadius);

const extrudeSettings = {
	depth: cardThickness, bevelEnabled: false, bevelSegments: 4, steps: 2,
};

export type TCardSurfaceProps = {
	color: string
	positionZ?: number
	translucent?: boolean
	scale?: any
};

export const CardSurface: React.FC<TCardSurfaceProps> = (props) => {
	return <mesh
		position={[-cardWidth / 2, -cardHeight / 2, (props.positionZ || 0) - cardThickness / 2]}
		{...props}
		castShadow={true}
		receiveShadow={true}>
		<extrudeGeometry args={[cardSurfaceShape, extrudeSettings]}/>
		{props.translucent ? <meshPhongMaterial color={props.color} transparent={true} opacity={.7}/> :
			<meshPhongMaterial color={props.color}/>}
	</mesh>;
};
