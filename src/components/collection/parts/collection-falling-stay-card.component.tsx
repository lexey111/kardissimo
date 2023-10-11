import React, {useEffect, useRef, useState} from "react";
import {animated, config, useSpring} from '@react-spring/three';
import {FlatCard} from "../../card/flat-card.component.tsx";

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

	return <animated.mesh scale={[0.25, 0.25, 2]}
	                      position-z={positionZ}
	                      position-y={positionY}
	                      rotation-x={rotationX}
	                      rotation-y={rotationY}>
		<FlatCard active={false} faces={[
			{
				text: 'Hello, world!', color: '#FDBA66', textColor: '#4f351a', fontSize: 48, lineHeight: 1
			},
			{
				text: '¡Hola mundo!', color: '#8899ff', textColor: '#2b3b62', fontSize: 48, lineHeight: 1
			}]}/>
	</animated.mesh>;
};
