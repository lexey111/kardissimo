import React, {useCallback, useEffect, useRef, useState} from "react";
import {TCardProps} from "./card-types.ts";
import {cardThickness, getFaceParameters} from "./parts/card-utils.ts";
import {CardFace} from "./parts/card-face.component.tsx";
import {animated, config, useSpring} from '@react-spring/three';
import {CardActiveOver} from "./parts/card-active-over.component.tsx";
import {CardActiveClick} from "./parts/card-active-click.component.tsx";

export type TCardState = 'stale' | 'rotateLeft' | 'rotateRight';

const subRotateHSize = Math.PI / 32;
const subRotateVSize = Math.PI / 64;

export const Preview3DCard: React.FC<TCardProps> = ({faces, side, active = 'active'}) => {

	const [cardState, setCardState] = useState<TCardState>('stale');
	const [currentSide, setCurrentSide] = useState(side || 0);

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

	const currentRotation = useRef(side || 0);

	const {rotateCard} = useSpring({
		rotateCard: currentRotation.current,
		config: config.wobbly,//{tension: 180, friction: 12, duration: 400},
		onRest: () => {
			setCardState('stale');
			const curSide = Math.abs(Math.floor(rotateCard.get() / Math.PI) % 2);
			setCurrentSide(curSide);
		}
	});

	useEffect(() => {
		if (typeof side !== 'undefined') {

			rotateCard.finish();
			// rotateCard.reset();

			setTimeout(() => {
				if (currentSide !== side) {
					currentRotation.current += Math.PI * (Math.random() > 0.5 ? 1 : -1);
					setCardState('rotateRight');
				}
			}, 10);
		}
	}, [side, currentSide, setCardState]);

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
		if (cardState !== 'stale') {
			return;
		}
		currentRotation.current -= Math.PI;
		setCardState('rotateLeft');
	}, [cardState]);

	const clickRight = useCallback(() => {
		if (cardState !== 'stale') {
			return;
		}
		currentRotation.current += Math.PI;
		setCardState('rotateRight');
	}, [cardState]);

	// Input parameters
	const face1 = getFaceParameters(faces[0]);
	const face2 = getFaceParameters(faces[1]);

	return <group>
		{active !== 'none' && <CardActiveOver onLeave={moveNone}
		                                      onBottom={moveBottom}
		                                      onLeft={moveLeft}
		                                      onLeftBottom={moveLeftBottom}
		                                      onRight={moveRight}
		                                      onRightBottom={moveRightBottom}
		                                      onTop={moveTop}
		                                      onTopLeft={moveTopLeft}
		                                      onTopRight={moveTopRight}
		/>}
		{active === 'active' && <CardActiveClick onClickLeft={clickLeft} onClickRight={clickRight}/>}

		<animated.mesh
			rotation-y={subRotateY}
			rotation-x={subRotateX}
		>
			<animated.mesh rotation-y={rotateCard}>
				<CardFace face={face1} positionZ={cardThickness / 2} rotation={[0, 0, 0]}/>
				<CardFace face={face2} positionZ={-cardThickness / 2} rotation={[0, Math.PI, 0]}/>
			</animated.mesh>
		</animated.mesh>
	</group>;
};
