import React, {useEffect, useRef, useState} from "react";
import {animated, config, useSpring} from '@react-spring/three';
import {FlatCard} from "../card/flat-card.component.tsx";
import {defaultSide} from "../../../store/data/collections-store.selectors.ts";

export const CollectionFallingStayCard: React.FC = () => {
	const [falling, setFalling] = useState(false);

	const {positionY} = useSpring({
		positionY: falling ? 53 : 350,
		delay: 400,
		config: config.molasses//{tension: 80, friction: 12, duration: 1000},
	});
	const {positionZ} = useSpring({
		positionZ: falling ? 75 : 200,
		delay: 1500,
		config: config.slow//{tension: 80, friction: 12, duration: 1000},
	});

	const {rotationX} = useSpring({
		rotationX: falling ? -.16 : 0,
		delay: 1300,
		config: config.slow,
	});
	const {rotationY} = useSpring({
		rotationY: falling ? -.1 : 0.2,
		delay: 1300,
		config: config.wobbly,
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

	return <animated.mesh
		scale={[0.34, 0.34, .4]}
		position-z={positionZ}
		position-y={positionY}
		rotation-x={rotationX}
		rotation-y={rotationY}>
		<FlatCard
			active={false}
			faces={[
				{text: '"Hello, World"\nCollection', header: 'English', footer: 'Español', ...defaultSide, color: '#ffaf00'},
				{text: '¡Hola, Mundo!', ...defaultSide, color: '#00b2ff'},
			]}/>
	</animated.mesh>;
};
