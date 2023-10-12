import React from "react";
import {getCard} from "../../store/data/collections-store.selectors.ts";

export type TCardAddProps = {
	collectionId?: string
	cardId?: string
	sideIdx?: number
}

export const CardSide: React.FC<TCardAddProps> = ({collectionId, cardId, sideIdx = 0}) => {
	const cardData = getCard(collectionId, cardId);

	if (!cardData || !cardData.sides || cardData.sides.length < sideIdx - 1) {
		return <div className={'card-not-found'}>
			Card not found
		</div>;
	}

	console.log('[SIDE]', cardId);

	return <div>
 		<div className={'card-side-content'}>
			<div className={'card-header'}>{cardData.sides[sideIdx].header}</div>
			<div className={'card-word'}>{cardData.sides[sideIdx].word}</div>
			<div className={'card-footer'}>{cardData.sides[sideIdx].footer}</div>
		</div>
	</div>;
};
