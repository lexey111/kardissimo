import React, {useRef} from "react";
import {useFrame} from '@react-three/fiber';
import * as THREE from "three";
import {SVGLogo} from "./svg-logo.component.tsx";
import {SVGK} from "./svg-k.component.tsx";

const logoMaterial = new THREE.MeshLambertMaterial({color: '#f1e6c0', transparent: true, opacity: .8});

const kMaterial = new THREE.MeshPhysicalMaterial({
	metalness: .8,
	roughness: .15,
	envMapIntensity: 0.95,
	clearcoat: 1,
	transparent: true,
	transmission: .95,
	opacity: .5,
	reflectivity: 0.2,
	ior: 2.9,
	side: THREE.BackSide
});

// based on https://stackoverflow.com/questions/19639506/continuous-color-transition
function random(...args: any) {
	if (arguments.length > 2) {
		return 0;
	}
	switch (arguments.length) {
		case 0:
			return Math.random();
		case 1:
			return Math.round(Math.random() * args[0]);
		case 2:
			return Math.round(Math.random() * (args[1] - args[0]) + args[0]);
	}
}

function generateRGB(_min?: number, _max?: number) {
	const min = _min || 0;
	const max = _max || 255;
	const color = [];

	for (let i = 0; i < 3; i++) {
		const num = random(min, max);
		color.push(num);
	}
	return color;
}

function calculateDistance(colorArray1: any, colorArray2: any) {
	const distance = [];
	for (let i = 0; i < colorArray1.length; i++) {
		distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
	}
	return distance;
}

function calculateIncrement(distanceArray: any, fps = 30, duration = 1) {
	const increment = [];
	for (let i = 0; i < distanceArray.length; i++) {
		let incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
		if (incr == 0) {
			incr = 1;
		}
		increment.push(incr);
	}
	return increment;
}

const currentColor = [10, 10, 10]; // getElementBG(transElement);

let targetColor: any;
let distance: any;
let increment: any;

startTransition();

function startTransition() {
	targetColor = generateRGB();
	distance = calculateDistance(currentColor, targetColor);
	increment = calculateIncrement(distance, 30, 10);
}

function transition() {
	if (currentColor[0] > targetColor[0]) {
		currentColor[0] -= increment[0];
		if (currentColor[0] <= targetColor[0]) {
			increment[0] = 0;
		}
	} else {
		currentColor[0] += increment[0];
		if (currentColor[0] >= targetColor[0]) {
			increment[0] = 0;
		}
	}

	if (currentColor[1] > targetColor[1]) {
		currentColor[1] -= increment[1];
		if (currentColor[1] <= targetColor[1]) {
			increment[1] = 0;
		}
	} else {
		currentColor[1] += increment[1];
		if (currentColor[1] >= targetColor[1]) {
			increment[1] = 0;
		}
	}

	if (currentColor[2] > targetColor[2]) {
		currentColor[2] -= increment[2];
		if (currentColor[2] <= targetColor[2]) {
			increment[2] = 0;
		}
	} else {
		currentColor[2] += increment[2];
		if (currentColor[2] >= targetColor[2]) {
			increment[2] = 0;
		}
	}

	logoMaterial.color.setRGB(currentColor[0] / 256, currentColor[1] / 256, currentColor[2] / 256);

	if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
		startTransition();
	}
}

export const KardissimoComponent: React.FC = () => {
	const logoRef = useRef<any>();
	const ref = useRef<any>();

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.rotation.y -= delta;
			logoRef.current.rotation.x = -Math.sin(ref.current.rotation.y) / 4;
			transition();
		}
	});

	return <group ref={ref}>
		<group ref={logoRef}>
			<SVGLogo material={logoMaterial} shift={-20}/>
			<SVGLogo material={kMaterial} shift={20}/>
			<SVGK material={kMaterial}/>
		</group>
	</group>;
};
