import React, {useRef} from "react";
import {CardboxStand} from "./cardbox-stand.component.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import {CardboxFallingCard} from "./cardbox-falling-card.component.tsx";
import {CardboxFallingStayCard} from "./cardbox-falling-stay-card.component.tsx";

const randColor = () => Math.random() > 0.7 ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') : '#a99';
const sheetsArray = Array.from({length: 30}, () => randColor());

export const CardboxStandObject: React.FC = () => {
	const {viewport} = useThree();
	const scale = Math.min(viewport.width / 250, viewport.height / 250);

	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y -= .5 * delta
	});

	return <mesh position-y={-110} scale={[scale, scale, 1]}>

		<CardboxStand/>

		<mesh ref={ref}>
			{sheetsArray.map((randomColor, idx) => <CardboxFallingCard
				key={idx}
				color={randomColor}
				idx={idx}
				endPosition={6 + idx * 4}/>)}
			<CardboxFallingStayCard/>
		</mesh>
	</mesh>;
};
