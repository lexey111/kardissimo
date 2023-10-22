import React from "react";
import {Canvas} from "@react-three/fiber";

import {Stage} from "@react-three/drei";
import {Preview3DCard} from "../card3d/preview-3d-card.component.tsx";
import {TCardEnriched} from "../../store/data/types.ts";
import {Fonts} from "../../resources/fonts.ts";

export type TCardPreviewProps = {
	card: TCardEnriched
	side: number
}

export const CardPreview: React.FC<TCardPreviewProps> = ({
	                                                         card,
	                                                         side
                                                         }) => {

	if (!card || !card.sides || card.sides.length !== 2) {
		console.error('Invalid sides array!');
		return null;
	}

	if (!card.collectionSides || card.sides.length !== card.collectionSides.length) {
		console.error('Invalid sides/collectionSides arrays!');
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
			fontName:  card.collectionSides?.[idx].fontName || Object.keys(Fonts)[0],
		}
	});

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
				faces={faces}/>
		</Stage>

		<pointLight position={[-80, 80, 120]}
		            color={'#aaa'}
		            intensity={100000}/>

		<pointLight position={[80, -80, 200]}
		            color={'#000'}
		            intensity={100000}/>
	</Canvas>;
};
