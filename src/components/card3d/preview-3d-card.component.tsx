import React, {useCallback, useEffect, useRef, useState} from "react";
import {TCardFaceProp} from "./card-types.ts";
import {cardThickness, getFaceParameters} from "./parts/card-utils.ts";
import {CardFace} from "./parts/card-face.component.tsx";
import {animated, config, useSpring} from '@react-spring/three';
import {CardActiveOver} from "./parts/card-active-over.component.tsx";
import {useFrame} from "@react-three/fiber";

const subRotateHSize = Math.PI / 16;
const subRotateVSize = Math.PI / 32;

export type TPreview3DCardProps = {
	faces: Array<TCardFaceProp>
	side: number
};

export const Preview3DCard: React.FC<TPreview3DCardProps> = ({faces, side}) => {
	const [activeSubRotateLeft, setActiveSubRotateLeft] = useState(false);
	const [activeSubRotateRight, setActiveSubRotateRight] = useState(false);
	const [activeSubRotateTop, setActiveSubRotateTop] = useState(false);
	const [activeSubRotateBottom, setActiveSubRotateBottom] = useState(false);

	const {subRotateY, subRotateX} = useSpring({
		subRotateY: activeSubRotateLeft
			? -subRotateHSize
			: activeSubRotateRight
				? subRotateHSize
				: 0,
		subRotateX: activeSubRotateTop
			? -subRotateVSize
			: activeSubRotateBottom
				? subRotateVSize
				: 0,
		config: config.slow
	});

	const [rotateProps, api] = useSpring(() => ({
			from: {'rotation-y': Math.PI / 2},
			to: {'rotation-y': 0},
			config: {tension: 180, friction: 12, duration: 200},
			//config: config.wobbly
		}), []
	);

	const ref = useRef<any>();
	useFrame((_, delta) => {
		if (side === -1) {
			ref.current.rotation.y -= .5 * delta
		}
	});

	useEffect(() => {
		if (side === -1) {
			api.update({
				to: {'rotation-y': 0},
			});
			api.start();
			return;
		}

		const targetAngle = side * Math.PI;
		ref.current.rotation.y = 0;

		api.update({
			to: {'rotation-y': targetAngle},
		});
		api.start();
	}, [side]);

	const moveTopLeft = useCallback(() => {
		setActiveSubRotateTop(true);
		setActiveSubRotateLeft(true);

		setActiveSubRotateRight(false);
		setActiveSubRotateBottom(false);
	}, []);

	const moveLeft = useCallback(() => {
		setActiveSubRotateLeft(true);

		setActiveSubRotateTop(false);
		setActiveSubRotateRight(false);
		setActiveSubRotateBottom(false);
	}, []);

	const moveLeftBottom = useCallback(() => {
		setActiveSubRotateBottom(true);
		setActiveSubRotateLeft(true);

		setActiveSubRotateTop(false);
		setActiveSubRotateRight(false);
	}, []);

	const moveTopRight = useCallback(() => {
		setActiveSubRotateTop(true);
		setActiveSubRotateRight(true);

		setActiveSubRotateLeft(false);
		setActiveSubRotateBottom(false);
	}, []);

	const moveRight = useCallback(() => {
		setActiveSubRotateRight(true);

		setActiveSubRotateTop(false);
		setActiveSubRotateLeft(false);
		setActiveSubRotateBottom(false);
	}, []);

	const moveRightBottom = useCallback(() => {
		setActiveSubRotateBottom(true);
		setActiveSubRotateRight(true);

		setActiveSubRotateTop(false);
		setActiveSubRotateLeft(false);
	}, []);

	const moveBottom = useCallback(() => {
		setActiveSubRotateBottom(true);

		setActiveSubRotateRight(false);
		setActiveSubRotateTop(false);
		setActiveSubRotateLeft(false);
	}, []);

	const moveTop = useCallback(() => {
		setActiveSubRotateTop(true);

		setActiveSubRotateRight(false);
		setActiveSubRotateBottom(false);
		setActiveSubRotateLeft(false);
	}, []);

	const moveNone = useCallback(() => {
		setActiveSubRotateTop(false);
		setActiveSubRotateRight(false);
		setActiveSubRotateBottom(false);
		setActiveSubRotateLeft(false);
	}, []);


	// Input parameters
	const face1 = getFaceParameters(faces[0]);
	const face2 = getFaceParameters(faces[1]);

	return <group ref={ref}>
		<CardActiveOver onLeave={moveNone}
		                onBottom={moveBottom}
		                onLeft={moveLeft}
		                onLeftBottom={moveLeftBottom}
		                onRight={moveRight}
		                onRightBottom={moveRightBottom}
		                onTop={moveTop}
		                onTopLeft={moveTopLeft}
		                onTopRight={moveTopRight}
		/>

		<animated.mesh
			rotation-y={subRotateY}
			rotation-x={subRotateX}
		>
			<animated.mesh {...rotateProps}>
				<CardFace face={face1} positionZ={cardThickness / 2} rotation={[0, 0, 0]}/>
				<CardFace face={face2} positionZ={-cardThickness / 2} rotation={[0, Math.PI, 0]}/>
			</animated.mesh>
		</animated.mesh>
	</group>;
};
