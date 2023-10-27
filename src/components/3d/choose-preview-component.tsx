import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {PresentationControls, Stage} from "@react-three/drei";
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
			       shadows={false}
			       environment="city"
			>
				<PresentationControls
					config={{mass: 2, tension: 500}}
					snap={{mass: 4, tension: 1500}}
					rotation={[0, -Math.PI / 4, 0]}
					polar={[-Math.PI / 3, Math.PI / 3]}
					azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
					<Choose3DCard amount={amount} total={total}/>
				</PresentationControls>
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
