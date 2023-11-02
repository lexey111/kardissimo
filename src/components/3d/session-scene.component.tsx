import React, {useCallback, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {FlatCard} from "./card/flat-card.component.tsx";
import {TPreparedCard} from "../../store/data/types.ts";
import {animated, Controller} from "@react-spring/three";
import {easeInOut} from "framer-motion";
import {useDebouncedResizeHook} from "../utils/useDebouncedResize.hook.tsx";
import {SessionClouds} from "./session-clouds.component.tsx";
import {Stage} from "@react-three/drei";

// https://docs.pmnd.rs/react-three-fiber/api/canvas
// https://github.com/pmndrs/drei#screenspace

export type TSceneProps = {
	card: TPreparedCard
	prevCard?: TPreparedCard
	nextCard?: TPreparedCard
	direction?: 'left' | 'right'
	onSetSide: (side: number) => void
	onCompleteAnimation: () => void
	side: number
}

const animationDuration = 300;
const animationConfig = {tension: 18, friction: 1, duration: animationDuration, easing: easeInOut};

const leftPosition = {"position-x": -120, 'position-z': 10, scale: [0, .8, 0], 'rotation-y': Math.PI / 2};
const curPosition = {
	"position-x": 0,
	'position-z': 0,
	scale: [1, 1, 1],
	'rotation-x': 0,
	'rotation-y': 0
};
const rightPosition = {"position-x": 120, 'position-z': 10, scale: [0, .8, 0], 'rotation-y': -Math.PI / 2};

const mostRightPosition = {"position-x": 120, 'position-z': 10, scale: [0, 0, 0], 'rotation-y': -Math.PI};
const mostLeftPosition = {"position-x": -120, 'position-z': 10, scale: [0, 0, 0], 'rotation-y': Math.PI};

const animationsLeft = new Controller({
	...leftPosition,
	config: {...animationConfig}
});

const animationsCurrent = new Controller({
	...curPosition,
	config: {...animationConfig}
});

const animationsRight = new Controller({
	...rightPosition,
	config: {...animationConfig}
});

const animationsIntroCard = new Controller({
	scale: [1, 1, 1],
	'rotation-x': -Math.PI,
	'rotation-y': -Math.PI,
	config: {...animationConfig, duration: 1200}
});

export const SessionScene: React.FC<TSceneProps> = (
	{
		card, prevCard, nextCard,
		onSetSide, onCompleteAnimation,
		direction,
		side,
	}) => {
	const [isAnimating, setIsAnimating] = useState(true);
	const intro = useRef(false);

	const [, rerender] = React.useState();
	// @ts-ignore
	const forceUpdate = React.useCallback(() => rerender({}), []);

	const {display} = useDebouncedResizeHook();

	const _rightCard = useRef<any>();
	const _leftCard = useRef<any>();
	const _curCard = useRef<any>();

	const cardSet = useRef<any>();

	const resetMovement = useCallback(() => {
		animationsLeft.set({...leftPosition});
		animationsCurrent.set({...curPosition});
		animationsRight.set({...rightPosition});
	}, []);

	const updateCardsState = useCallback(() => {
		if (intro.current) {
			return;
		}
		setIsAnimating(false);
		_curCard.current = cardSet.current[0];
		_leftCard.current = cardSet.current[1];
		_rightCard.current = cardSet.current[2];

		resetMovement();
		forceUpdate();
		onCompleteAnimation();
		// console.log('current', _curCard.current[0].text, card[0].text)
	}, []);

	const startAnimationsRight = useCallback(() => {

		void animationsLeft.start({...curPosition, onResolve: updateCardsState});
		void animationsCurrent.start({...rightPosition});
		void animationsRight.start({...mostRightPosition});

		setIsAnimating(true);
	}, []);

	const startAnimationsLeft = useCallback(() => {

		void animationsLeft.start({...mostLeftPosition});
		void animationsCurrent.start({...leftPosition});
		void animationsRight.start({...curPosition, onResolve: updateCardsState});

		setIsAnimating(true);
	}, []);

	useEffect(() => {
		animationsIntroCard.set({
			scale: [0, 0, 0],
			'rotation-x': -Math.PI / 1.5,
			'rotation-y': -Math.PI / 1.5
		});

		intro.current = true;
		forceUpdate();

		void animationsIntroCard.start({
			'rotation-x': 0, 'rotation-y': 0, scale: [1, 1, 1], onResolve: () => {
				intro.current = false;
				setIsAnimating(() => false);
				updateCardsState();
			}, config: {...animationConfig, duration: 1200, easing: easeInOut}
		});
	}, []);

	useEffect(() => {
		cardSet.current = [card, nextCard, prevCard];

		if (!_curCard.current) {
			updateCardsState();
			return;
		}

		if (direction === 'left') {
			startAnimationsLeft();
		} else {
			startAnimationsRight();
		}
	}, [card, direction]);

	if (!display) {
		return null;
	}

	return <Canvas
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>
		<Stage
			adjustCamera={.9} intensity={6} preset="rembrandt"
			shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
			environment="city"
		>
			<mesh visible={!isAnimating}>
				{nextCard && <group {...leftPosition as any}>
					<FlatCard
						active={false}
						faces={nextCard}
						side={side}/>
				</group>}

				{card && <group {...curPosition as any}>
					<FlatCard
						faces={card}
						side={side}
						onSetSide={onSetSide}/>
				</group>}

				{prevCard && <group {...rightPosition as any}>
					<FlatCard
						active={false}
						faces={prevCard}
						side={side}/>
				</group>}
			</mesh>

			{card && <SessionClouds color1={card[0].color} color2={card[1].color}/>}

			{intro.current && card && <animated.group {...animationsIntroCard.springs}>
				<FlatCard
					faces={card}
					active={false}
					side={side}/>
			</animated.group>}

			<mesh visible={isAnimating && !intro.current}>
				{_leftCard.current && <animated.group {...animationsLeft.springs}>
					<FlatCard
						active={false}
						faces={_leftCard.current}
						side={side}/>
				</animated.group>}

				{_curCard.current && <animated.group {...animationsCurrent.springs}>
					<FlatCard
						faces={_curCard.current}
						side={side}/>
				</animated.group>}

				{_rightCard.current && <animated.group {...animationsRight.springs}>
					<FlatCard
						active={false}
						faces={_rightCard.current}
						side={side}/>
				</animated.group>}
			</mesh>
		</Stage>

		<pointLight
			position={[-80, 80, 120]}
			color={'#0692ff'}
			intensity={100000}/>

		<pointLight
			position={[80, -80, 200]}
			color={'#b5ff00'}
			intensity={100000}/>
	</Canvas>;
};
