import React, {useRef} from "react";
import {CardSurface} from "./parts/card-surface.component.tsx";
import {Text} from "@react-three/drei";

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

	const cards = ['#0f7cf5'];
	for (let i = 0; i < cardsNumber; i++) {
		if (i >= min && i < max) {
			cards.push('#ffb700');
		} else {
			cards.push('#fff');
		}
	}

	cards.push('#0f7cf5');
	const text = {text: amount !== total ? amount + '/' + total : 'All'};

	return <group ref={ref}>
		<Text position-z={6}
		      position-y={0}
		      position-x={0}
		      fontSize={40}
			// font={Object.keys(Fonts)[0]}
			  color={'#333'}
			  {...text}
			  anchorX={'center'}
			  anchorY="middle"> </Text>

		{cards.map((c, idx) => {
			return <CardSurface
				color={c}
				positionZ={-idx * 4}
				translucent={true}
				scale={c === '#fff' || c === '#0f7cf5' ? [0.98, 0.98, 6] : [1, 1, 3]}
				// scale={idx === 0 || idx === cards.length - 1 ? [0.98, 0.98, 6] : [1, 1, 3]}
				key={idx}/>
		})}
	</group>;
};
