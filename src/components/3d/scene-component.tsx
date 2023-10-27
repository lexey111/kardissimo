import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {Stage} from "@react-three/drei";
import {FlatCard} from "./card/flat-card.component.tsx";
import {TCardEnriched} from "../../store/data/types.ts";
import {Fonts} from "../../resources/fonts.ts";

// https://docs.pmnd.rs/react-three-fiber/api/canvas
// https://github.com/pmndrs/drei#screenspace

export type TSceneProps = {
	card: TCardEnriched
	side: number
	delay?: number
}

export const Scene: React.FC<TSceneProps> = ({card, side, delay = 0}) => {
	const [showDelayed, setShowDelayed] = useState(delay <= 0);
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	useEffect(() => {
		if (delay === 0) {
			return
		}
		setTimeout(() => {
			if (!destroying.current) {
				setShowDelayed(true);
			}
		}, delay);
	}, [delay]);

	if (!card || !card.sides || card.sides.length !== 2) {
		console.error('Invalid sides array!');
		return null;
	}

	if (!card.collectionSides || card.sides.length !== card.collectionSides.length) {
		console.error('Invalid sides/collectionSides arrays!');
		return null;
	}

	if (!showDelayed) {
		return null;
	}

	const faces = card.sides.map((side, idx) => {
		return {
			text: side.word || '',
			header: side.header || '',
			footer: side.footer || '',
			color: card.collectionSides?.[idx].color || '#FDBA66',
			textColor: card.collectionSides?.[idx].fontColor || '#2b3b62',
			fontSize: card.collectionSides?.[idx].fontSize || 'M',
			fontName: card.collectionSides?.[idx].fontName || Object.keys(Fonts)[0],
		}
	});

	return <Canvas
		camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
	>

		<Stage adjustCamera={.9} intensity={6} preset="rembrandt"
		       shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
		       environment="city"
		>
			<FlatCard faces={faces} side={side}/>
		</Stage>

		<pointLight position={[-80, 80, 120]}
		            color={'#0692ff'}
		            intensity={100000}/>

		<pointLight position={[80, -80, 200]}
		            color={'#b5ff00'}
		            intensity={100000}/>
	</Canvas>;
};
