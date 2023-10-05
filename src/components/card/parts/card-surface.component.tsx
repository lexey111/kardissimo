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
	positionZ: number
};

export const CardSurface: React.FC<TCardSurfaceProps> = ({color, positionZ}) => {
	return <mesh position={[-cardWidth / 2, -cardHeight / 2, (positionZ || 0) - cardThickness / 2]} castShadow={true} receiveShadow={true}>
		<extrudeGeometry args={[cardSurfaceShape, extrudeSettings]}/>
		<meshPhongMaterial color={color}/>
		{/*<meshBasicMaterial color={color} transparent={true} opacity={0.8}/>*/}
	</mesh>;
};
