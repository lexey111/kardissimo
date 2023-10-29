import React, {useRef} from "react";
import {CollectionStand} from "./collection-stand.component.tsx";
import {useFrame, useThree} from "@react-three/fiber";
import {CollectionFallingCard} from "./collection-falling-card.component.tsx";
import {CollectionFallingStayCard} from "./collection-falling-stay-card.component.tsx";

const sheetsArray = Array.from({length: 30}, () => {
	return Math.random() > 0.7 ? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0') : '#a99';
});

export const CollectionObject: React.FC = () => {
	const {viewport} = useThree();
	const scale = Math.min(viewport.width / 250, viewport.height / 250);

	const ref = useRef<any>();
	useFrame((_, delta) => {
		ref.current.rotation.y -= .5 * delta
	});

	return <mesh position-y={-110} scale={[scale, scale, 1]}>

		<CollectionStand/>

		<mesh ref={ref}>
			{sheetsArray.map((randomColor, idx) => <CollectionFallingCard key={idx}
			                                                              color={randomColor}
			                                                              idx={idx}
			                                                              endPosition={6 + idx * 4}/>)}
			<CollectionFallingStayCard/>
		</mesh>
	</mesh>;
};
