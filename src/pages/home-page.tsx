import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Header} from "../components/utils/header.component.tsx";
import {Canvas, useLoader} from '@react-three/fiber';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {PresentationControls, Stage} from "@react-three/drei";

const Model = () => {
	const result = useLoader(GLTFLoader, '/kardissimo-logo.gltf', function (gltf) {
		const mesh = gltf.scene;
		console.log(mesh)
		//scene.add(mesh);
		for (let i = 0; i < mesh?.children?.length; i++) {
			mesh.children[i].material = mesh?.children?.[i]?.material?.clone();
		}
		//var face = mesh.children[6];
	});
	return <Canvas
		style={{width: '400px', height: '400px'}}
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>

		<Stage
			adjustCamera={1} intensity={6} preset="rembrandt"
			shadows={false}
			environment="dawn"
		>
			<PresentationControls
				config={{mass: 2, tension: 500}}
				snap={{mass: 4, tension: 1500}}
				rotation={[0, -Math.PI / 4, 0]}
				polar={[-Math.PI / 3, Math.PI / 3]}
				azimuth={[-Math.PI / 1.4, Math.PI / 2]}>

				<primitive object={result.scene}/>
			</PresentationControls>
		</Stage>

		<pointLight
			position={[-80, 80, 120]}
			color={'#aaa'}
			intensity={100000}/>

		<pointLight
			position={[80, -80, 200]}
			color={'#000'}
			intensity={100000}/>
	</Canvas>;
}

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'} authOnly={false}>
		<Header
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
		<Model/>
	</AppPage>;
};
