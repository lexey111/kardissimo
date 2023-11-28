import React from "react";
import {Canvas} from "@react-three/fiber";
import {CardboxObject} from "./cardbox/cardbox-object.component.tsx";
import {CardObject} from "./cardbox/card-object.component.tsx";

// https://docs.pmnd.rs/react-three-fiber/api/canvas

type TCardboxSceneProps = {
	type?: 'stand' | 'card'
}

export const CardboxScene: React.FC<TCardboxSceneProps> = ({type = 'stand'}) => {
	const factor = type === 'stand' ? 1 : 2;
	const factorLight = type === 'stand' ? 1 : 4;

	return <Canvas
		shadows
		style={{
			position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
		}}
		camera={{
			fov: 75,
			near: 0.1,
			far: 1000,
			position: [0, 50, 300 * factor]
		}}
	>
		<ambientLight intensity={1} color={'#fff'}/>

		{type === 'stand' ? <CardboxObject/> : <CardObject/>}

		<pointLight
			position={[-180, 80, 120 * factorLight]} castShadow={true}
			color={'#c7f5fd'}
			intensity={100000}/>

		<pointLight
			position={[80, -80 / factorLight, 200 * factorLight]} castShadow={true}
			color={'#dffcdd'}
			intensity={100000}/>

	</Canvas>;
};
