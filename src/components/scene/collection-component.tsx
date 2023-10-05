import React from "react";
import {Canvas} from "@react-three/fiber";

import {OrbitControls} from "@react-three/drei";
import {CollectionObject} from "../collection/collection-object.component.tsx";

// https://docs.pmnd.rs/react-three-fiber/api/canvas
export const Collection: React.FC = () => {
	return <Canvas shadows
	               style={{
		               position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
	               }}
	               camera={{fov: 75, near: 0.1, far: 1000, position: [0, 50, 300]}}
	>
		<ambientLight intensity={1} color={'#fff'}/>
		<directionalLight color={'#fff'} position={[100, 100, 200]}/>
		<OrbitControls/>

		<CollectionObject/>

		<pointLight position={[-80, 80, 120]} castShadow={true}
		            color={'#c7f5fd'}
		            intensity={100000}/>
		<pointLight position={[80, -80, 200]} castShadow={true}
		            color={'#dffcdd'}
		            intensity={100000}/>
	</Canvas>;
};
