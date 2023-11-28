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

const radius = 300;

export const CardObject: React.FC = () => {

	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y += 0.5 * delta
	});

	return <mesh ref={ref}>
		{rotations.map((r, idx) => {
			return <mesh
				position-x={Math.sin(r) * radius}
				position-z={Math.cos(r) * radius}
				position-y={70}
				key={r}
				scale-z={4}
				rotation-y={r}>
				<FlatCard
					active={false}
					faces={[
						{
							text: (idx + 1).toString(),
							header: 'English',
							footer: 'Español', ...defaultSide, fontSize: 'XXL', textColor: '#000',
							color: colors[idx]
						},
						{text: (idx + 1).toString(), ...defaultSide, color: colors[7 - idx]},
					]}/>
			</mesh>
		})}
	</mesh>;
};
