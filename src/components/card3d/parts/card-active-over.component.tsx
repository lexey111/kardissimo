import React from "react";
import {cardHeight, cardWidth} from "./card-utils.ts";


export type TCardActiveOverProps = {
	onTopLeft: () => void
	onTop: () => void
	onTopRight: () => void
	onRight: () => void
	onRightBottom: () => void
	onBottom: () => void
	onLeftBottom: () => void
	onLeft: () => void

	onLeave: () => void
}

const size = 30;
const halfSize = size / 2;
const quarterSize = size / 4;

const boxWidth = cardWidth; //+ size;
const boxHeight = cardHeight;// + size;

export const CardActiveOver: React.FC<TCardActiveOverProps> = (props: TCardActiveOverProps) => {

	return <mesh onPointerLeave={props.onLeave} visible={false}>
		<mesh>
			<boxGeometry args={[boxWidth, boxHeight, 0]}/>
		</mesh>

		<mesh position={[-cardWidth / 4 - quarterSize, cardHeight / 4 + quarterSize, 0]}
		      onPointerEnter={props.onTopLeft}>
			<boxGeometry args={[cardWidth / 2 - halfSize, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[-cardWidth / 4 - quarterSize, 0, 1]} onPointerEnter={props.onLeft}>
			<boxGeometry args={[cardWidth / 2 - halfSize, size, 0]}/>
		</mesh>

		<mesh position={[-cardWidth / 4 - quarterSize, -cardHeight / 4 - quarterSize, 0]}
		      onPointerEnter={props.onLeftBottom}>
			<boxGeometry args={[cardWidth / 2 - halfSize, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[cardWidth / 4 + quarterSize, cardHeight / 4 + quarterSize, 0]}
		      onPointerEnter={props.onTopRight}>
			<boxGeometry args={[cardWidth / 2 - halfSize, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[cardWidth / 4 + quarterSize, 0, 0]} onPointerEnter={props.onRight}>
			<boxGeometry args={[cardWidth / 2 - halfSize, size, 0]}/>
		</mesh>

		<mesh position={[cardWidth / 4 + quarterSize, -cardHeight / 4 - quarterSize, 0]}
		      onPointerEnter={props.onRightBottom}>
			<boxGeometry args={[cardWidth / 2 - halfSize, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[0, cardHeight / 4 + quarterSize, 0]} onPointerEnter={props.onTop}>
			<boxGeometry args={[size, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[0, -cardHeight / 4 - quarterSize, 0]} onPointerEnter={props.onBottom}>
			<boxGeometry args={[size, cardHeight / 2 - halfSize, 0]}/>
		</mesh>

		<mesh position={[0, 0, 0]} onPointerEnter={props.onLeave}>
			<boxGeometry args={[size, size, 0]}/>
		</mesh>
	</mesh>;
};
