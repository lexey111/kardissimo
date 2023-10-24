import React, {useEffect, useRef, useState} from "react";
import {animated, config, useSpring} from '@react-spring/three';
import {CardSurface} from "../card/parts/card-surface.component.tsx";

export type TCollectionFallingCardProps = {
	color: string
	endPosition: number
	idx: number
};

export const CollectionFallingCard: React.FC<TCollectionFallingCardProps> = ({color, idx, endPosition}) => {
	const [falling, setFalling] = useState(false);

	const {rotateCard} = useSpring({
		rotateCard: falling ? Math.sin(idx / 4.82) : 0,
		config: config.slow, //{tension: 180, friction: 12, duration: 1400},
	});

	const {positionY} = useSpring({
		positionY: falling ? endPosition : 350 + idx * 100,
		delay: 100 + idx * 5,
		config: {tension: 80, friction: 12, duration: 1000},
	});

	const destroying = useRef(false);
	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (destroying.current) {
				return;
			}
			setFalling(true);
		}, 20);
	}, [setFalling]);

	return <animated.mesh scale={[.4, .4, 3.5]} rotation-x={Math.PI / 2} rotation-z={rotateCard} position-y={positionY}>
		<CardSurface color={color}/>
	</animated.mesh>;
};
