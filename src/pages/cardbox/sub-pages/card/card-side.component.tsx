import React from "react";
import {TSCard, TSCardKey} from "../../../../store/cards/types-card.ts";

export type TCardAddProps = {
	card: TSCard
	sideIdx?: number
	color?: string
	background?: string
	onClick: () => void;
}

export const CardSide: React.FC<TCardAddProps> = (
	{
		card,
		color,
		background,
		onClick,
		sideIdx = 0
	}) => {

	if (!card) {
		return <div className={'card-not-found'}>
			Card not found
		</div>;
	}

	const styles: any = {};
	if (color) {
		styles['color'] = color;
	}

	if (background) {
		styles['backgroundColor'] = background;
	}

	return <div className={'card-side-content'} style={styles} onClick={onClick}>
		<div className={'card-header'}>{card[`side${sideIdx + 1}header` as TSCardKey] as string}</div>
		<div className={'card-text'}>{card[`side${sideIdx + 1}text` as TSCardKey] as string}</div>
		<div className={'card-footer'}>{card[`side${sideIdx + 1}footer` as TSCardKey] as string}</div>
	</div>;
};
