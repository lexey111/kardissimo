import React, {useEffect, useRef} from "react";
// @ts-ignore
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";

const loader = new SVGLoader();

export type TSVGLogoProps = {
	material: any
}

export const SVGK: React.FC<TSVGLogoProps> = ({material}) => {
	const ref = useRef<any>();

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const svgData = loader.parse(document.getElementById('svg-k')!.outerHTML);

		svgData.paths.forEach((path: any) => {
			const shapes = path.toShapes(true);

			shapes.forEach((shape: any) => {
				const geometry = new THREE.ExtrudeGeometry(shape, {
					depth: 5,
					bevelEnabled: false,
					bevelSize: 2
				});

				const mesh = new THREE.Mesh(geometry, material);
				mesh.castShadow = true;
				mesh.receiveShadow = true;

				const box = new THREE.Box3().setFromObject(mesh);
				const size = new THREE.Vector3();
				box.getSize(size);

				mesh.scale.set(1, 1, 1);

				mesh.position.x = -512;
				mesh.position.y = -512;
				mesh.position.z = 0;

				ref.current.add(mesh);
			});
		});
	}, [ref]);

	return <group ref={ref} scale-y={-1}/>;
}
