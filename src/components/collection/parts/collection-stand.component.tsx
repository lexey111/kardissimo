import React from "react";
import {Cylinder, Shadow} from "@react-three/drei";
import * as THREE from "three";

const shadowGeometry = new THREE.CircleGeometry(120, 64);

export const CollectionStand: React.FC = React.memo(() => {
	return <group>
		<Cylinder position-y={2} args={[95, 95, 2, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#bbb'}/>
		</Cylinder>

		<Cylinder args={[100, 110, 5, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#ccc'}/>
		</Cylinder>

		<Cylinder position-y={-5.5} args={[110, 110, 6, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#aaa'}/>
		</Cylinder>

		<Cylinder position-y={-10} args={[105, 105, 5, 64]} castShadow={true} receiveShadow={true}>
			<meshPhongMaterial color={'#333'}/>
		</Cylinder>

		<Shadow
			position-y={-15}
			position-x={10}
			scale={[230, 230, 1]}
			color="black"
			colorStop={0}
			opacity={1}
			geometry={shadowGeometry}
			fog={false} // Reacts to fog (default=false)
		/>
	</group>;
});
