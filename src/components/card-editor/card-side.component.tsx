import React, {useCallback} from "react";
import {getCard} from "../../store/data/collections-store.selectors.ts";
import {useCardNavigateHook} from "../utils/useCardNavigate.hook.tsx";

export type TCardAddProps = {
	collectionId?: string
	cardId?: string
	sideIdx?: number
}

export const CardSide: React.FC<TCardAddProps> = ({collectionId, cardId, sideIdx = 0}) => {
	const cardData = getCard(collectionId, cardId);
	const {goCard} = useCardNavigateHook(collectionId!, cardId!);

	const navigateToCard = useCallback(() => {
		goCard();
	}, []);

	if (!cardData || !cardData.sides || cardData.sides.length < sideIdx - 1) {
		return <div className={'card-not-found'}>
			Card not found
		</div>;
	}

	return <div className={'card-side-content'} onClick={navigateToCard}>
		<div className={'card-header'}>{cardData.sides[sideIdx].header}</div>
		<div className={'card-word'}>{cardData.sides[sideIdx].word}</div>
		<div className={'card-footer'}>{cardData.sides[sideIdx].footer}</div>
	</div>;
};
