import React, {useRef} from "react";
import {useFrame} from "@react-three/fiber";
import {FlatCard} from "../card/flat-card.component.tsx";
import {defaultSide} from "../../../store/cards/types-card-face.ts";

type TCardObjectProps = {
	text1?: string
	text2?: string
	color1?: string
	color2?: string
	background1?: string
	background2?: string
}

export const CardObject: React.FC<TCardObjectProps> = ({text1, text2, color1, color2, background1, background2}) => {

	const ref = useRef<any>();

	useFrame((_, delta) => {
		ref.current.rotation.y += .5 * delta;
	});

	return <mesh
		castShadow
		ref={ref}
		scale={[1, 1, 2]}>
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
	</mesh>;
};
