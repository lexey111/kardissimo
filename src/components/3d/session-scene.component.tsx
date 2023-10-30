import React, {useCallback, useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {Stage} from "@react-three/drei";
import {FlatCard} from "./card/flat-card.component.tsx";
import {TPreparedCard} from "../../store/data/types.ts";
import {animated, Controller} from "@react-spring/three";
import {easeInOut} from "framer-motion";
import {useDebouncedResizeHook} from "../utils/useDebouncedResize.hook.tsx";

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

const animationDuration = 600;
const animationConfig = {tension: 18, friction: 1, duration: animationDuration, easing: easeInOut};

const leftPosition = {"position-x": -120, 'position-z': 10, scale: [0, .8, 0], 'rotation-y': Math.PI / 2};
const curPosition = {"position-x": 0, 'position-z': 0, scale: [1, 1, 1], 'rotation-y': 0};
const rightPosition = {"position-x": 120, 'position-z': 10, scale: [0, .8, 0], 'rotation-y': -Math.PI / 2};

const mostRightPosition = {"position-x": 120, 'position-z': 10, scale: [0, 0, 0], 'rotation-y': -Math.PI};
const mostLeftPosition = {"position-x": -120, 'position-z': 10, scale: [0, 0, 0], 'rotation-y': Math.PI};

const animationsNext = new Controller({
	...leftPosition,
	config: {...animationConfig}
});

const animationsCurrent = new Controller({
	...curPosition,
	config: {...animationConfig}
});

const animationsPrev = new Controller({
	...rightPosition,
	config: {...animationConfig}
});


export const SessionScene: React.FC<TSceneProps> = (
	{
		card, prevCard, nextCard,
		onSetSide, onCompleteAnimation,
		direction,
		side
	}) => {
	const destroying = useRef(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	const [, updateState] = React.useState();
	// @ts-ignore
	const forceUpdate = React.useCallback(() => updateState({}), []);

	const {display} = useDebouncedResizeHook();

	const _prevCard = useRef<any>();
	const _nextCard = useRef<any>();
	const _curCard = useRef<any>();

	const cardSet = useRef<any>();

	const resetMovement = useCallback(() => {
		animationsNext.set({...leftPosition});
		animationsCurrent.set({...curPosition});
		animationsPrev.set({...rightPosition});
	}, []);

	const updateCardsState = useCallback(() => {
		console.log('>>> done')

		setIsAnimating(false);
		_curCard.current = cardSet.current[0];
		_nextCard.current = cardSet.current[1];
		_prevCard.current = cardSet.current[2];

		resetMovement();
		forceUpdate();
		onCompleteAnimation();
		// console.log('current', _curCard.current[0].text, card[0].text)
	}, []);

	const startAnimationsRight = useCallback(() => {
		console.log('++++++++++++ START R ++++++++++++++');

		void animationsNext.start({...curPosition, onResolve: updateCardsState});
		void animationsCurrent.start({...rightPosition});
		void animationsPrev.start({...mostRightPosition});

		setIsAnimating(true);
	}, []);

	const startAnimationsLeft = useCallback(() => {
		console.log('++++++++++++ START L ++++++++++++++');

		void animationsNext.start({...mostLeftPosition});
		void animationsCurrent.start({...leftPosition});
		void animationsPrev.start({...curPosition, onResolve: updateCardsState});

		setIsAnimating(true);
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
				{nextCard && <group {...leftPosition}>
					<FlatCard
						active={false}
						faces={nextCard}
						side={0}/>
				</group>}

				{card && <group {...curPosition}>
					<FlatCard
						faces={card}
						side={side}
						onSetSide={onSetSide}/>
				</group>}

				{prevCard && <group {...rightPosition}>
					<FlatCard
						active={false}
						faces={prevCard}
						side={0}/>
				</group>}
			</mesh>

			<mesh visible={isAnimating}>
				{_nextCard.current && <animated.group {...animationsNext.springs}>
					<FlatCard
						active={false}
						faces={_nextCard.current}
						side={0}/>
				</animated.group>}

				{_curCard.current && <animated.group {...animationsCurrent.springs}>
					<FlatCard
						faces={_curCard.current}
						side={side}
						onSetSide={onSetSide}/>
				</animated.group>}

				{_prevCard.current && <animated.group {...animationsPrev.springs}>
					<FlatCard
						active={false}
						faces={_prevCard.current}
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
