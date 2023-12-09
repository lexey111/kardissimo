import React from "react";
import {CardSurface} from "./parts/card-surface.component.tsx";
import {Text} from "@react-three/drei";

export type TChoose3DCard = {
	amount: number
	total: number
	side: string
	mode: string
};

export const ChooseChunkSize: React.FC<TChoose3DCard> = ({total, amount, side, mode}) => {
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

	return <group scale={[.9, .9, .9]}>
		<Text
			position-z={1.1}
			position-y={10}
			position-x={0}
			fontSize={80}
			// font={Object.keys(Fonts)[0]}
			color={'#fff'}
			fillOpacity={.9}
			textAlign={'center'}
			anchorX={'center'}
			anchorY="middle">{amount}</Text>
		<Text
			position-z={1.1}
			position-y={-30}
			position-x={0}
			fontSize={20}
			// font={Object.keys(Fonts)[0]}
			color={'#fff'}
			fillOpacity={.7}
			textAlign={'center'}
			anchorX={'center'}
			anchorY="middle">of {total}</Text>

		<Text
			position-z={1.1}
			position-y={100}
			position-x={0}
			fontSize={15}
			// font={Object.keys(Fonts)[0]}
			color={'#fff'}
			fillOpacity={.5}
			anchorX={'center'}
			anchorY="middle">{mode}</Text>

		<Text
			position-z={1.1}
			position-y={-100}
			position-x={0}
			fontSize={15}
			// font={Object.keys(Fonts)[0]}
			color={'#fff'}
			fillOpacity={.5}
			anchorX={'center'}
			anchorY="middle">{side}</Text>

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
