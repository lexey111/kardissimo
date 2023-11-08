import React, {useEffect, useRef} from "react";
import {SVGLoader} from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";

const loader = new SVGLoader();

export type TSVGLogoProps = {
	material: any
	shift?: number
}

export const SVGLogo: React.FC<TSVGLogoProps> = ({material, shift = 0}) => {
	const ref = useRef<any>();

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const svgData = loader.parse(document.getElementById('svg-logo')!.outerHTML);

		svgData.paths.forEach((path: any) => {
			const shapes = path.toShapes(true);

			shapes.forEach((shape: any) => {
				const geometry = new THREE.ExtrudeGeometry(shape, {
					depth: 40,
					bevelEnabled: true,
					bevelSize: 1,
					bevelThickness: 2,
					bevelSegments: 20,
					bevelOffset: -5
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
				// mesh.rotation.z = Math.PI;

				ref.current.add(mesh);
			});
		});
	}, [ref]);

	return <group ref={ref} scale-y={-1} position-z={shift}/>;
}
