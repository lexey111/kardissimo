import React, {useCallback, useState} from "react";

import {Box} from "@react-three/drei";
import {TCardProps} from "./card-types.ts";
import {cardHeight, cardThickness, cardWidth, getFaceParameters} from "./card-utils.ts";
import {CardFace} from "./card-face-component.tsx";

export const Card: React.FC<TCardProps> = (props: TCardProps) => {
	// State
	const [rotation, setRotation] = useState([0, 0, 0]);
	const [rotation2, setRotation2] = useState([0, Math.PI, 0]);

	// Handlers:
	const onMouseMove = useCallback((e: any) => {
		const rY = ((e.clientY / window.innerHeight - 0.5) * -Math.PI) / 64;
		const rX = ((e.clientX / window.innerWidth - 0.5) * -Math.PI) / 32;

		setRotation([rY, rX, 0]);
		setRotation2([rY, rX + Math.PI, 0]);
	}, [setRotation, setRotation2]);

	const onMouseLeave = useCallback(() => {
		setRotation([0, 0, 0]);
		setRotation2([0, Math.PI, 0]);
	}, [setRotation]);

	// Input parameters
	const face1 = getFaceParameters(props.faces[0]);
	const face2 = getFaceParameters(props.faces[1]);

	return <Box onPointerMove={onMouseMove} onPointerLeave={onMouseLeave}>
		<mesh position-z={0} visible={false}>
			<boxGeometry args={[cardWidth + 20, cardHeight + 20, 0]}/>
		</mesh>

		<CardFace face={face1} positionZ={cardThickness / 2} rotation={rotation}/>
		<CardFace face={face2} positionZ={-cardThickness / 2} rotation={rotation2}/>
	</Box>;
};
