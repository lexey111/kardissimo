import React, {useCallback, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {Cloud, Clouds, Stage} from "@react-three/drei";
import {FlatCard} from "./card/flat-card.component.tsx";
import {TPreparedCard} from "../../store/data/types.ts";
import {animated, Controller} from "@react-spring/three";
import {easeInOut} from "framer-motion";
import {useDebouncedResizeHook} from "../utils/useDebouncedResize.hook.tsx";
import {MeshBasicMaterial} from "three";

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
	percent: number
}

const animationDuration = 400;
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

const animationsClouds = new Controller({
	scale: [0, 0, 0],
	'position-y': 0,
	'position-z': 10,
	config: {...animationConfig, duration: 600}
});

const animationsIntroCard = new Controller({
	scale: [1, 1, 1],
	'rotation-x': -Math.PI,
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
	const intro = useRef(true);

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
			'rotation-x': 0
		});

		animationsClouds.set({
			scale: [0, 0, 0],
			'position-y': 0,
			'position-z': -10,
		})

		void animationsIntroCard.start({
			'rotation-x': 0, scale: [1, 1, 1], config: {...animationConfig, duration: 1200}
		});

		void animationsClouds.start({
			scale: [1, 1, 1], 'position-y': 0, 'position-z': 2,
			onResolve: () => {
				void animationsClouds.start({
					scale: [0, 1, 0], 'position-y': 0, 'position-z': -100,
					onResolve: () => {
						intro.current = false;
						setIsAnimating(() => false);
						updateCardsState();
					},
					config: {duration: 1000},
				})
			}
		});
	}, [updateCardsState]);

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
						side={0}/>
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
						side={0}/>
				</group>}
			</mesh>

			{intro.current && <animated.group {...animationsClouds.springs}>
				<Clouds material={MeshBasicMaterial}>
					<Cloud
						segments={60}
						bounds={[100, 120, 20]}
						volume={400}
						speed={-2}
						opacity={0.2}
						growth={10}
						seed={100}
						color={card[0].color}/>
					<Cloud
						position-z={20}
						seed={10}
						fade={9}
						speed={2}
						growth={12}
						segments={60}
						volume={350}
						opacity={0.2}
						bounds={[30, 100, 20]}
						color={card[1].color}/>
				</Clouds>
			</animated.group>}

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
						side={0}/>
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
						side={0}/>
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
