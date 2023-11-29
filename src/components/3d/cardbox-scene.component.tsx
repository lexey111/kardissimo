import React from "react";
import {Canvas} from "@react-three/fiber";
import {CardboxObject} from "./cardbox/cardbox-object.component.tsx";
import {CardCircleObject} from "./cardbox/card-circle-object.component.tsx";
import {CardObject} from "./cardbox/card-object.component.tsx";
import {Stage} from "@react-three/drei";

// https://docs.pmnd.rs/react-three-fiber/api/canvas

type TCardboxSceneProps = {
	type?: 'stand' | 'cards' | 'card'
	text1?: string
	text2?: string
	color1?: string
	color2?: string
	background1?: string
	background2?: string
}

export const CardboxScene: React.FC<TCardboxSceneProps> = (
	{
		type = 'stand',
		text1, text2, color1, color2, background1, background2
	}) => {
	const factor = type === 'cards' ? 2 : 1;
	const factorLight = type === 'cards' ? 4 : 1;

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

		{type === 'stand' && <CardboxObject/>}
		{type === 'cards' && <CardCircleObject/>}

		{type === 'card' && <>
			<Stage
				adjustCamera={1.2} intensity={1} preset="rembrandt"
				// shadows={false}
				environment="sunset"
			>
				<CardObject
					text1={text1}
					text2={text2}
					color1={color1}
					color2={color2}
					background1={background1}
					background2={background2}/>
			</Stage>
		</>}

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
