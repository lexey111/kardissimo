import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {FlatCard} from "../card/flat-card.component.tsx";
import {defaultSide} from "../../../store/data/cardboxes-store.selectors.ts";

const rotations = [
	0,
	Math.PI / 4,
	Math.PI / 2,
	Math.PI / 2 + Math.PI / 4,
	Math.PI,
	Math.PI + Math.PI / 4,
	Math.PI + Math.PI / 2
];

const colors = [
	'#ffaf00',
	'#ddff00',
	'#11ff00',
	'#00ff9d',
	'#44b4fc',
	'#8c49f5',
	'#fd4fde',
];

const texts = [
	'Hello!',
	'Hi!',
	'How are you?',
	'How do you do?',
	'What\'s up?',
	'¡Hola!',
	'¡Buenos dias!'
];

const radius = 300;

export const CardCircleObject: React.FC = () => {

	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y += 1.5 * delta;
		ref.current.rotation.x += Math.sin(delta) / 3;
		ref.current.rotation.z += 0.2 * delta;
	});

	return <mesh ref={ref} scale={[0.9, 0.9, 0.9]} position-y={10}>
		{rotations.map((r, idx) => {
			return <mesh
				position-x={Math.sin(r) * radius}
				position-z={Math.cos(r) * radius}
				key={r}
				scale-z={4}
				position-y={90}
				rotation-y={r}>
				<FlatCard
					active={false}
					faces={[
						{
							text: texts[idx],
							...defaultSide,
							fontSize: 'XXXL',
							textColor: '#000',
							color: colors[idx]
						},
						{
							text: texts[7 - idx],
							...defaultSide,
							color: colors[7 - idx]
						},
					]}/>
			</mesh>
		})}
	</mesh>;
};
