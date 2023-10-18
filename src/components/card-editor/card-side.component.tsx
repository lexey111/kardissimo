import React, {useCallback} from "react";
import {getCard} from "../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";

export type TCardAddProps = {
	collectionId?: string
	cardId?: string
	sideIdx?: number
}

export const CardSide: React.FC<TCardAddProps> = ({collectionId, cardId, sideIdx = 0}) => {
	const cardData = getCard(collectionId, cardId);
	const navigate = useNavigate();

	const navigateToCard = useCallback(() => {
		const scrollContainer: any = window.document.scrollingElement;
		if (scrollContainer && scrollContainer?.scrollTop > 0) {
			localStorage.setItem('_list_scroll_position', scrollContainer.scrollTop);
		}
		navigate(`/collections/${collectionId}/cards/${cardId}`);
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
