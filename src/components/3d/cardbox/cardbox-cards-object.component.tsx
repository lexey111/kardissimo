import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {FlatCard} from "../card/flat-card.component.tsx";
import {defaultSide} from "../../../store/data/cardboxes-store.selectors.ts";

const sheetsArray = [1, 2, 3, 4, 5];

type TCardboxCardsObjectProps = {
	text1?: string
	text2?: string
	color1?: string
	color2?: string
	background1?: string
	background2?: string
}

const step = 20;

export const CardboxCardsObject: React.FC<TCardboxCardsObjectProps> = (
	{
		text1,
		text2,
		color1,
		color2,
		background1,
		background2
	}) => {
	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y -= .5 * delta
	});

	return <mesh ref={ref}>
		{sheetsArray.map((_, idx) => <mesh
			key={idx}
			position-z={-(sheetsArray.length / 2) * step + idx * step}
			rotation-z={Math.random() / 20 * (Math.random() > 0.5 ? -1 : 1)}
			position-x={Math.random() * 20 * (Math.random() > 0.5 ? -1 : 1)}
			scale-z={2}
		>
			<FlatCard
				active={false}
				faces={[
					{
						text: text1 || 'English',
						...defaultSide,
						fontSize: 'XXXL',
						textColor: color1 || '#333',
						color: background1 || '#fff864'
					},
					{
						text: text2 || 'Español',
						...defaultSide,
						fontSize: 'XXXL',
						textColor: color2 || '#333',
						color: background2 || '#4fd4fd'
					},
				]}/>
		</mesh>)}
	</mesh>;
};
