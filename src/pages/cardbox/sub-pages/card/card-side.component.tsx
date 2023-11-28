import React from "react";
import {getCard} from "../../../../store/data/cardboxes-store.selectors.ts";

export type TCardAddProps = {
	cardboxId?: string
	cardId?: string
	sideIdx?: number
	color?: string
	background?: string
	onClick: () => void;
}

export const CardSide: React.FC<TCardAddProps> = (
	{
		cardboxId,
		cardId, color, background,
		onClick,
		sideIdx = 0
	}) => {
	const cardData = getCard(cardboxId, cardId);

	if (!cardData || !cardData.sides || cardData.sides.length < sideIdx - 1) {
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
		<div className={'card-header'}>{cardData.sides[sideIdx].header}</div>
		<div className={'card-word'}>{cardData.sides[sideIdx].text}</div>
		<div className={'card-footer'}>{cardData.sides[sideIdx].footer}</div>
	</div>;
};
