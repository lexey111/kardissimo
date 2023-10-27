import React, {useRef} from "react";
import {CardSurface} from "./parts/card-surface.component.tsx";
import {Text} from "@react-three/drei";
import {Fonts} from "../../../resources/fonts.ts";

export type TChoose3DCard = {
	amount: number
	total: number
};

export const Choose3DCard: React.FC<TChoose3DCard> = ({total, amount}) => {

	const ref = useRef<any>();

	// useFrame((_, delta) => {
	// 	//ref.current.rotation.y -= .5 * delta
	// });

	const cardsNumber = 15;
	const percent10 = Math.round((amount / total) * cardsNumber);

	const min = Math.round(cardsNumber / 2 - percent10 / 2);
	const max = Math.round(cardsNumber / 2 + percent10 / 2);

	const cards = ['#ccc'];
	for (let i = 0; i < cardsNumber; i++) {
		if (i >= min && i < max) {
			cards.push('#ffb700');
		} else {
			cards.push('#fff');
		}
	}

	cards.push('#ccc');
	const text = {text: amount !== total ? amount + '/' + total : 'All'};

	return <group ref={ref} rotation-y={-Math.PI / 4}>
		<Text position-z={6}
		      position-y={0}
		      position-x={0}
		      fontSize={40}
		      font={Object.keys(Fonts)[0]}
		      color={'#333'}
		      {...text}
		      anchorX={'center'}
		      anchorY="middle"> </Text>

		{cards.map((c, idx) => {
			return <CardSurface
				color={c}
				positionZ={-idx * 4}
				translucent={true}
				scale={c === '#fff' || c === '#ccc' ? [0.98, 0.98, 6] : [1, 1, 3]}
				// scale={idx === 0 || idx === cards.length - 1 ? [0.98, 0.98, 6] : [1, 1, 3]}
				key={idx}/>
		})}
	</group>;
};
