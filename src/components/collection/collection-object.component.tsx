import React, {useRef} from "react";
import {useFrame, useThree} from "@react-three/fiber";
import {Cylinder} from "@react-three/drei";
import {CardSurface} from "../card/parts/card-surface.component.tsx";

const sheetsArray = Array(32).fill('#A99', -32);
export const CollectionObject: React.FC = () => {
	const {viewport} = useThree();
	const scale = Math.min(viewport.width / 250, viewport.height / 250);

	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y += .5 * delta
		// ref.current.rotation.z += 0.5 * delta
	});

	return <mesh scale={[scale, scale, 1]} position-y={-110}>
		<Cylinder args={[100, 110, 5, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#ccc'}/>
		</Cylinder>

		<Cylinder position-y={-5.5} args={[110, 110, 6, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#aaa'}/>
		</Cylinder>

		<Cylinder position-y={-10} args={[110, 110, 2, 64]} castShadow={true} receiveShadow={true}>
			<meshBasicMaterial color={'#333'}/>
		</Cylinder>

		<mesh ref={ref}>
			{sheetsArray.map((_, idx) => {
				const randomColor = Math.random() > 0.7 ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') : '#a99';

				return <mesh scale={[.4, .4, 3.7]}
				             key={idx}
				             rotation-x={Math.PI / 2}
				             rotation-z={Math.sin(idx / 4.82)}
				             position-x={Math.random() + 10}
				             position-y={6 + idx * 4.2}>
					<CardSurface color={randomColor} positionZ={0}/>
				</mesh>
			})}
		</mesh>
	</mesh>;
};
