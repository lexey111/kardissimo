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
				adjustCamera={1.1} intensity={12} preset="rembrandt"
				shadows={false}
				environment="city"
			>
				<KardissimoComponent/>
			</Stage>

			<pointLight
				position={[-80, 80, 500]}
				color={'#aaa'}
				intensity={100000}/>

			<pointLight
				position={[80, -80, 700]}
				color={'#000'}
				intensity={100000}/>
		</Canvas>
		<div className={'jumbo-text'}>
			<h1>Kardissimo</h1>
			<p>
				the new dimension for flash cards
			</p>
		</div>
	</div>;
};
