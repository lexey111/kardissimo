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
			cloudRef.current.position.y += 2;
			cloudRef.current.scale.x -= .001;
			cloudRef.current.scale.y -= .001;
			setOpacity(v => v > 0 ? v - 0.013 : 0);
			setVolume(v => v > 0 ? v - 1 : 0);
		}
	});

	if (opacity <= 0) {
		return null;
	}

	return <Clouds position-z={20} position-y={-50} ref={cloudRef}>
		<Cloud
			segments={60}
			bounds={[100, 120, 20]}
			volume={volume}
			speed={-2}
			opacity={opacity}
			growth={10}
			seed={100}
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
