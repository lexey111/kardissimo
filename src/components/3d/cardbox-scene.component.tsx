import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {CardboxStandObject} from "./cardbox/cardbox-stand-object.component.tsx";
import {CardCircleObject} from "./cardbox/card-circle-object.component.tsx";
import {CardObject} from "./cardbox/card-object.component.tsx";
import {Stage} from "@react-three/drei";
import {CardboxCardsObject} from "./cardbox/cardbox-cards-object.component.tsx";

// https://docs.pmnd.rs/react-three-fiber/api/canvas

type TCardboxSceneProps = {
	type?: 'stand' | 'run' | 'card' | 'cards'
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
	const factor = type === 'run' ? 2 : 1;
	const factorLight = type === 'run' ? 4 : 1;

	const [visible, setVisible] = useState(false);
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	useEffect(() => {
		setVisible((() => false));

		const hndlr = setTimeout(() => {
			if (destroying.current) {
				return;
			}
			setVisible((() => true));
		}, 20);

		return () => {
			clearTimeout(hndlr);
		}
	}, [type]);

	if (!visible) {
		// force rebuild scene
		return null;
	}

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

		{type === 'stand' && <CardboxStandObject/>}

		{type === 'run' && <CardCircleObject/>}

		{(type === 'card' || type === 'cards') && <>
			<Stage
				adjustCamera={1.3} intensity={1} preset="rembrandt"
				// shadows={false}
				environment="sunset"
			>
				{type === 'cards' && <CardboxCardsObject
					text1={text1}
					text2={text2}
					color1={color1}
					color2={color2}
					background1={background1}
					background2={background2}/>}

				{type === 'card' &&
					<CardObject
						text1={text1}
						text2={text2}
						color1={color1}
						color2={color2}
						background1={background1}
						background2={background2}/>
				}
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
