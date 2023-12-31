import React, {useEffect, useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";

import {PresentationControls, Stage} from "@react-three/drei";
import {ChooseChunkSize} from "./card/choose-chunk-size.component.tsx";

export type TChoosePreviewProps = {
	total: number
	amount: number
	delay?: number
	side?: string
	mode?: string
	isRandom: boolean
}

export const ChoosePreview: React.FC<TChoosePreviewProps> = (
	{
		total,
		amount,
		side,
		mode,
		isRandom,
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

			<Stage
				adjustCamera={1} intensity={1} preset="rembrandt"
				shadows={false}
				environment="city"
			>
				<PresentationControls
					config={{mass: 2, tension: 500}}
					snap={{mass: 4, tension: 1500}}
					rotation={[0, -Math.PI / 5, 0]}
					polar={[-Math.PI / 3, Math.PI / 3]}
					azimuth={[-Math.PI / 1.4, Math.PI / 2]}>

					<ChooseChunkSize
						amount={amount} total={total} side={side || 'Random'} mode={mode || 'Random'}
						isRandom={isRandom}/>
				</PresentationControls>
			</Stage>

			<pointLight
				position={[-80, 80, 220]}
				color={'#aaa'}
				intensity={100000}/>

			<pointLight
				position={[80, -80, 200]}
				color={'#000'}
				intensity={100000}/>
		</Canvas>
	</div>;
};
