import React from "react";
import {Canvas} from "@react-three/fiber";

import {Center} from "@react-three/drei";
import {FlatCard} from "../card3d/flat-card.component.tsx";

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const text2 = 'Other side';

// https://docs.pmnd.rs/react-three-fiber/api/canvas
// https://github.com/pmndrs/drei#screenspace
export const Scene: React.FC = () => {

	return <Canvas
		style={{
			position: "absolute", top: 0, left: 0, width: "100%", height: "100%"
		}}
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>
		<ambientLight intensity={1} color={'#fff'}/>
		<directionalLight color={'#fff'} position={[100, 100, 200]}/>
		{/*<OrbitControls/>*/}

		<Center>
			<FlatCard faces={[
				{
					text: text, color: '#FDBA66', textColor: '#4f351a'
				},
				{
					text: text2, color: '#8899ff', textColor: '#2b3b62', fontSize: 48, lineHeight: 1
				}]}/>
		</Center>

		<pointLight position={[-80, 80, 120]}
		            color={'#0692ff'}
		            intensity={100000}/>
		<pointLight position={[80, -80, 200]}
		            color={'#b5ff00'}
		            intensity={100000}/>
	</Canvas>;
};