import {Cloud, Clouds} from "@react-three/drei";
import React, {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";

export type TSessionCloudsProps = {
	color1?: string
	color2?: string
};

export const SessionClouds: React.FC<TSessionCloudsProps> = ({color1, color2}) => {
	const cloudRef = useRef<any>();

	const [opacity, setOpacity] = useState(.9);
	const [volume, setVolume] = useState(350);

	useFrame((_, delta) => {
		if (cloudRef.current && opacity > 0) {
			cloudRef.current.rotation.y += delta;
			cloudRef.current.position.y += 5;
			cloudRef.current.position.z += 1;
			cloudRef.current.scale.x -= .001;
			cloudRef.current.scale.y -= .01;

			setOpacity(v => v > 0 ? v - 0.03 : 0);
			setVolume(v => v > 0 ? v - 13 : 0);
		}
	});

	if (opacity <= 0) {
		return null;
	}

	return <Clouds position-z={30} position-y={-70} ref={cloudRef}>
		<Cloud
			segments={60}
			bounds={[100, 120, 20]}
			volume={volume}
			speed={-2}
			opacity={opacity}
			growth={10}
			seed={2}
			color={color1 || '#fff'}/>
		<Cloud
			seed={10}
			fade={0}
			speed={2}
			growth={12}
			segments={60}
			volume={volume}
			opacity={opacity}
			bounds={[30, 100, 20]}
			color={color2 || '#ccc'}/>
	</Clouds>
}
