import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {OrbitControls, Stage} from "@react-three/drei";
import {Choose3DCard} from "./card/choose-3d-card.component.tsx";

export type TChoosePreviewProps = {
	total: number
	amount: number
	delay?: number
}

export const ChoosePreview: React.FC<TChoosePreviewProps> = ({
	                                                             total,
	                                                             amount,
	                                                             delay = 0
                                                             }) => {

	const [showDelayed, setShowDelayed] = useState(delay > 0 ? false : true);
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

	if (!showDelayed) {
		return null;
	}

	return <div className={'choose-container'}>
		<Canvas
			camera={{fov: 75, near: 0.1, far: 1000, position: [0, 0, 300]}}
		>

			<Stage adjustCamera={.9} intensity={6} preset="rembrandt"
			       shadows={{type: 'contact', color: 'skyblue', colorBlend: 2, opacity: 1}}
			       environment="city"
			>
				<OrbitControls/>

				<Choose3DCard amount={amount} total={total}/>
			</Stage>

			<pointLight position={[-80, 80, 120]}
			            color={'#aaa'}
			            intensity={100000}/>

			<pointLight position={[80, -80, 200]}
			            color={'#000'}
			            intensity={100000}/>
		</Canvas>
	</div>;
};
