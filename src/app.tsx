import React from "react";
import {Canvas} from "@react-three/fiber";

import "./styles.css";
import {Center} from "@react-three/drei";
import {Card} from "./components/card/card-component.tsx";

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const text2 = 'Other side';

// https://docs.pmnd.rs/react-three-fiber/api/canvas
export const App: React.FC = () => {
	return <div>
		<Canvas
			style={{
				position: "fixed", top: 0, left: 0, width: "100%", height: "100%"
			}}
			camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
		>
			<ambientLight/>
			{/*<OrbitControls/>*/}

			<Center>
				<Card faces={[{text: text, color: '#FDBA66'}, {
					text: text2, color: '#8899ff', textColor: '#ffffff', fontSize: 48
				}]}/>
			</Center>

			<pointLight position={[-100, 100, 100]}
			            color={'#FFFFFF'}
			            intensity={20000}/>

			<pointLight position={[-100, 50, 0]}
			            color={'#FFFF22'}
			            intensity={10000}/>
			<pointLight position={[0, -50, -100]}
			            color={'#CCCCCC'}
			            intensity={20000}/>
		</Canvas>
	</div>;
};
