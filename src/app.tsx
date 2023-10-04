import React, {useCallback, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {Fonts} from "./fonts";

import "./styles.css";
import {OrbitControls, Text} from "@react-three/drei";
// import THREE from "three";
import * as THREE from 'three';
// Register Text as a react-three-fiber element
// extend({Text});

const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const text2 = 'Other side';

let x = 1;
let y = 1;
let width = 250;
let height = 250;
let radius = 20

const shape = new THREE.Shape();
shape.moveTo(x, y + radius);
shape.lineTo(x, y + height - radius);
shape.quadraticCurveTo(x, y + height, x + radius, y + height);
shape.lineTo(x + width - radius, y + height);
shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
shape.lineTo(x + width, y + radius);
shape.quadraticCurveTo(x + width, y, x + width - radius, y);
shape.lineTo(x + radius, y);
shape.quadraticCurveTo(x, y, x, y + radius);

const extrudeSettings = {
	depth: 1, bevelEnabled: false, bevelSegments: 4, steps: 2,
};


// https://docs.pmnd.rs/react-three-fiber/api/canvas
export const App: React.FC = () => {
	// State:
	const [rotation, setRotation] = useState([0, 0, 0]);
	const [opts] = useState({
		font: "Philosopher",
		fontSize: 8,
		color: "#224455",
		maxWidth: 180,
		lineHeight: 1.4,
		letterSpacing: 0,
		textAlign: "center",
		materialType: "MeshPhongMaterial"
	});

	// Handlers:
	const onMouseMove = (e: any) => {
		const rY = ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 32;
		const rX = ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / .5;
		setRotation([rY, rX, 0]);
	};
	const onMouseLeave = useCallback(() => {
		setRotation([0, 0, 0]);
	}, [setRotation]);

	const onClick = useCallback((e: any) => {
		console.log('click', e);
	}, [opts]);

	// @ts-ignore
	return <div>
		<Canvas
			style={{
				position: "fixed", top: 0, left: 0, width: "100%", height: "100%"
			}}
			camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
			onMouseMove={onMouseMove}
			onMouseLeave={onMouseLeave}
		>
			<ambientLight/>
			<OrbitControls/>

			<group
				position-z={0}
				// @ts-ignore
				rotation={rotation}
			>
				<Text
					position-z={2}
					{...opts}
					// @ts-ignore
					text={text}
					// @ts-ignore
					font={Fonts[opts.font]}
					onClick={onClick}
					anchorX="center"
					anchorY="middle"
				>
					<meshPhongMaterial color="#555555"/>
				</Text>

				<mesh position-z={0}>
					<boxGeometry args={[210, 210, 2, 1, 1, 1]}/>
					<meshPhongMaterial color="#CCBBAA"/>
				</mesh>
				<mesh visible position={[-100, -100, -1.5]}>
					<extrudeGeometry args={[shape, extrudeSettings]}/>
					<meshPhongMaterial color="#f3f3f3"/>
				</mesh>
			</group>

			<group
				position-z={0}
				// @ts-ignore
				rotation={rotation}
			>
				<Text
					position-z={-4}
					rotation-y={Math.PI}
					{...opts}
					color={'#ffffff'}
					fontSize={20}
					// @ts-ignore
					text={text2}
					// @ts-ignore
					font={Fonts[opts.font]}
					onClick={onClick}
					anchorX="center"
					anchorY="middle"
				>
					<meshPhongMaterial color="#555555"/>
				</Text>

				<mesh visible position-z={-2}>
					<boxGeometry args={[210, 210, 2, 1, 1, 1]}/>
					<meshPhongMaterial color="#777777"/>
				</mesh>

			</group>

			<pointLight position={[-100, 100, 100]}
			            color={'#FFFFFF'}
			            intensity={20000}/>
		</Canvas>
	</div>;
};
