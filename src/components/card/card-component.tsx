import React, {useCallback, useRef, useState} from "react";
import {TCardProps} from "./card-types.ts";
import {cardThickness, getFaceParameters} from "./parts/card-utils.ts";
import {CardFace} from "./parts/card-face-component.tsx";
import {useFrame} from "@react-three/fiber";
import {animated, config, useSpring} from '@react-spring/three'
import {CardActiveOver} from "./parts/card-active-over-component.tsx";
import {CardActiveClick} from "./parts/card-active-click-component.tsx";

export type TCardState = 'stale' | 'rotateLeft' | 'rotateRight';

export const Card: React.FC<TCardProps> = (props: TCardProps) => {
	const ref = useRef<any>();
	// State
	const [rotation, setRotation] = useState([0, 0, 0]);
	const [rotation2, setRotation2] = useState([0, Math.PI, 0]);

	const [cardState, setCardState] = useState<TCardState>('stale')

	const [activeSubRotateLeft, setActiveSubRotateLeft] = useState(false);
	const [activeSubRotateRight, setActiveSubRotateRight] = useState(false);
	const [activeSubRotateTop, setActiveSubRotateTop] = useState(false);
	const [activeSubRotateBottom, setActiveSubRotateBottom] = useState(false);

	const {rotateY, rotateX} = useSpring({
		rotateY: activeSubRotateLeft
			? Math.PI / 32
			: activeSubRotateRight
				? -Math.PI / 32
				: 0,
		rotateX: activeSubRotateTop
			? Math.PI / 128
			: activeSubRotateBottom
				? -Math.PI / 128
				: 0,
		config: config.wobbly
	});


	useFrame((_, delta) => {
		if (!ref.current) {
			return;
		}

		if (cardState === 'stale') {
			return;
		}

		//                                   *
		//  [-2*Math.PI = 0] - [-Math.PI] - [0] - [Math.PI] - [2*Math.PI = 0]
		if (cardState === 'rotateRight') {
			ref.current.rotation.y += 7 * delta;
		}

		if (cardState === 'rotateLeft') {
			ref.current.rotation.y -= 7 * delta;
		}

		if (ref.current.rotation.y >= Math.PI) {
			console.log('STOP R');
			setCardState('stale');
			ref.current.rotation.y = Math.PI;
			return;
		}

		if (ref.current.rotation.y <= 0) {
			console.log('STOP L');
			setCardState('stale');
			ref.current.rotation.y = 0;
			return;
		}
	});

	const onMouseClick = useCallback((e: any) => {
		if (cardState !== 'stale') {
			return;
		}

		if (e.clientX > window.innerWidth / 2) {
			console.log('click right');
			setCardState('rotateRight');
		} else {
			console.log('click left');
			setCardState('rotateLeft');
		}
	}, [cardState, setCardState]);

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

	const clickLeft = useCallback(() => {
		console.log('click left')
	}, []);

	const clickRight = useCallback(() => {
		console.log('click right')
	}, []);

	// Input parameters
	const face1 = getFaceParameters(props.faces[0]);
	const face2 = getFaceParameters(props.faces[1]);

	return <mesh onClick={onMouseClick} ref={ref}>
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
		<CardActiveClick onClickLeft={clickLeft} onClickRight={clickRight}/>

		<animated.mesh
			visible={true}
			rotation-y={rotateY}
			rotation-x={rotateX}
		>
			<CardFace face={face1} positionZ={cardThickness / 2} rotation={rotation}/>
			<CardFace face={face2} positionZ={-cardThickness / 2} rotation={rotation2}/></animated.mesh>
	</mesh>
		;
};
