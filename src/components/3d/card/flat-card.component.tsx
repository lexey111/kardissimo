import React, {useCallback, useEffect, useRef, useState} from "react";
import {TCardProps} from "./card-types.ts";
import {cardThickness, getFaceParameters} from "./parts/card-utils.ts";
import {CardFace} from "./parts/card-face.component.tsx";
import {animated, config, useSpring} from '@react-spring/three';
import {CardActiveOver} from "./parts/card-active-over.component.tsx";
import {CardActiveClick} from "./parts/card-active-click.component.tsx";

const subRotateHSize = Math.PI / 16;
const subRotateVSize = Math.PI / 32;

export const FlatCard: React.FC<TCardProps> = ({faces, onSetSide, active = true, side = 0}) => {
	const [cardSide, setCardSide] = useState(side);

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

	useEffect(() => {
		setCardSide(side);
	}, [side]);

	useEffect(() => {
		if (cardSide === -1) {
			api.update({
				to: {'rotation-y': 0},
			});
			api.start();
			return;
		}

		ref.current.rotation.y = 0;

		api.update({
			to: {'rotation-y': cardSide * Math.PI},
		});
		api.start();
		onSetSide && onSetSide(cardSide);
	}, [cardSide]);

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
		setCardSide(v => v > 0 ? v - 1 : v + 1);
	}, []);

	const clickRight = useCallback(() => {
		setCardSide(v => v > 0 ? v - 1 : v + 1);
	}, []);

	// Input parameters
	const face1 = getFaceParameters(faces[0]);
	const face2 = getFaceParameters(faces[1]);

	return <group ref={ref}>
		{active && <CardActiveOver onLeave={moveNone}
		                           onBottom={moveBottom}
		                           onLeft={moveLeft}
		                           onLeftBottom={moveLeftBottom}
		                           onRight={moveRight}
		                           onRightBottom={moveRightBottom}
		                           onTop={moveTop}
		                           onTopLeft={moveTopLeft}
		                           onTopRight={moveTopRight}
		/>}
		{active && <CardActiveClick onClickLeft={clickLeft} onClickRight={clickRight}/>}

		<animated.mesh
			rotation-y={subRotateY}
			rotation-x={subRotateX}
		>
			{/*<animated.mesh rotation-y={rotateCard}>*/}
			<animated.mesh {...rotateProps}>
				<CardFace face={face1} positionZ={cardThickness / 2} rotation={[0, 0, 0]}/>
				<CardFace face={face2} positionZ={-cardThickness / 2} rotation={[0, Math.PI, 0]}/>
			</animated.mesh>
		</animated.mesh>
	</group>;
};
