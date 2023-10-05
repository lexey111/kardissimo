import React from "react";
import {cardHeight, cardWidth} from "./card-utils.ts";


export type TCardActiveClickProps = {
	onClickLeft: () => void
	onClickRight: () => void
}

const size = 30;
const boxWidth = cardWidth + size;
const boxHeight = cardHeight + size;

export const CardActiveClick: React.FC<TCardActiveClickProps> = (props: TCardActiveClickProps) => {
	return <mesh visible={false}>
		<mesh>
			<boxGeometry args={[boxWidth, boxHeight, 0]}/>
		</mesh>

		<mesh position={[-boxWidth / 4, 0, 0]}
		      onClick={props.onClickLeft}>
			<boxGeometry args={[boxWidth / 2, boxHeight, 0]}/>
		</mesh>

		<mesh position={[boxWidth / 4, 0, 0]}
		      onClick={props.onClickRight}>
			<boxGeometry args={[boxWidth / 2, boxHeight, 0]}/>
		</mesh>

	</mesh>;
};
