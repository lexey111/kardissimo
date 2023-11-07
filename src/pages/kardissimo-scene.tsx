import React from "react";
import {Canvas} from '@react-three/fiber';
import {Stage} from "@react-three/drei";
import {KardissimoComponent} from "./kardissimo-component.tsx";

export const KardissimoScene: React.FC = () => {
	return <div className={'kardissimo-content'}>
		<Canvas
			camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
		>
			<Stage
				adjustCamera={1.2} intensity={6} preset="rembrandt"
				// shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
				shadows={false}
				environment="apartment"
			>
				<KardissimoComponent/>
			</Stage>

			<pointLight
				position={[-80, 80, 120]}
				color={'#aaa'}
				intensity={100000}/>

			<pointLight
				position={[80, -80, 200]}
				color={'#000'}
				intensity={100000}/>
		</Canvas>
		<div className={'jumbo-text'}>
			<h1>Kardissimo</h1>
			<p>
				the new level of flash cards
			</p>
		</div>
	</div>;
};
