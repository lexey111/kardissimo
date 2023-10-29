import React from "react";
import {Canvas} from "@react-three/fiber";

import {Stage} from "@react-three/drei";
import {FlatCard} from "./card/flat-card.component.tsx";
import {TPreparedCard} from "../../store/data/types.ts";
import {useDebouncedResizeHook} from "../utils/useDebouncedResize.hook.tsx";

// https://docs.pmnd.rs/react-three-fiber/api/canvas
// https://github.com/pmndrs/drei#screenspace

export type TSceneProps = {
	card: TPreparedCard
	onSetSide: (side: number) => void
	side: number
}

export const Scene: React.FC<TSceneProps> = ({card, onSetSide, side}) => {
	const {display} = useDebouncedResizeHook();

	if (!card || card.length !== 2) {
		console.error('Invalid sides array!', card);
		return null;
	}

	if (!card[0].color) {
		console.error('Invalid sides/collectionSides array format!');
		return null;
	}

	if (!display) {
		return null;
	}

	return <Canvas
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>

		<Stage
			adjustCamera={.9} intensity={6} preset="rembrandt"
			shadows={false}
			// shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
			environment="city"
		>
			<FlatCard
				faces={card}
				side={side}
				onSetSide={onSetSide}/>

			<group position={[-150, 0, 0]} scale={[0.5, 0.5, .5]}>
				<FlatCard
					faces={card}
					side={0}/>
			</group>
			<group position={[150, 0, 0]} scale={[0.5, 0.5, 0.5]}>
				<FlatCard
					faces={card}
					side={0}/>
			</group>
		</Stage>

		<pointLight
			position={[-80, 80, 120]}
			color={'#0692ff'}
			intensity={100000}/>

		<pointLight
			position={[80, -80, 200]}
			color={'#b5ff00'}
			intensity={100000}/>
	</Canvas>;
};
