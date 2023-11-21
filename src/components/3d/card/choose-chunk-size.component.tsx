import React from "react";
import {CardSurface} from "./parts/card-surface.component.tsx";
import {Text} from "@react-three/drei";

export type TChoose3DCard = {
	amount: number
	total: number
};

export const ChooseChunkSize: React.FC<TChoose3DCard> = ({total, amount}) => {
	const cardsNumber = 16;
	const percent10 = (amount / total) * cardsNumber;

	const min = Math.round(cardsNumber / 2 - percent10 / 2);
	const max = Math.round(cardsNumber / 2 + percent10 / 2);

	const cards = ['#0f7cf5'];
	for (let i = 0; i < cardsNumber; i++) {
		if (i >= min && i < max) {
			cards.push('#ffb700');
		} else {
			cards.push('#fff');
		}
	}

	if (!cards.includes('#ffb700')) {
		cards[Math.round(cardsNumber / 2)] = '#ffb700'; // at leas 1
	}

	cards.push('#0f7cf5');
	const text = {text: amount !== total ? amount + '/' + total : 'All'};

	return <group>
		<Text
			position-z={1.1}
			position-y={0}
			position-x={0}
			fontSize={40}
			// font={Object.keys(Fonts)[0]}
			color={'#fff'}
			fillOpacity={.7}
			{...text}
			anchorX={'center'}
			anchorY="middle"> </Text>

		{cards.map((c, idx) => {
			return <CardSurface
				color={c}
				positionZ={-idx * 4}
				translucent={true}
				scale={c !== '#ffb700' ? [0.98, 0.98, .7] : [1, 1, .9]}
				key={idx}/>
		})}
	</group>;
};
