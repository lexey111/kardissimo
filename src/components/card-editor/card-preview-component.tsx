import React from "react";
import {Canvas} from "@react-three/fiber";

import {Stage} from "@react-three/drei";
import {Preview3DCard} from "../card3d/preview-3d-card.component.tsx";


export type TCardPreviewProps = {
	text1: string
	text2: string
	side: number
}
export const CardPreview: React.FC<TCardPreviewProps> = ({text1, text2, side}) => {
	return <Canvas
		style={{
			position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
		}}
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>

		<Stage adjustCamera={.9} intensity={6} preset="rembrandt"
		       shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
		       environment="city"
		>
			<Preview3DCard
				side={side}
				active={'slight'}
				faces={[
					{
						text: text1, color: '#FDBA66', textColor: '#4f351a', fontSize: 20,
					},
					{
						text: text2, color: '#8899ff', textColor: '#2b3b62', fontSize: 20, lineHeight: 1
					}]}/>
		</Stage>

		<pointLight position={[-80, 80, 120]}
		            color={'#0692ff'}
		            intensity={100000}/>

		<pointLight position={[80, -80, 200]}
		            color={'#b5ff00'}
		            intensity={100000}/>
	</Canvas>;
};
