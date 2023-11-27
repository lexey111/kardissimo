import React, {useCallback} from "react";
import {CardSide} from "../card-side.component.tsx";
import {CardRemoveButton} from "../card-remove.button.tsx";
import {TCardListStyle, useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {TCollectionSide} from "../../../../../store/data/types.ts";
import {getCard} from "../../../../../store/data/collections-store.selectors.ts";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {DraggableCard} from "./draggable-card.component.tsx";

export type TCardListItemProps = {
	collectionId?: string
	sides?: Array<TCollectionSide>
	currentStyle: TCardListStyle
	index: number
	cardId: string
	number: number
	count: number
}

export const CardListItem: React.FC<TCardListItemProps> = (
	{
		collectionId,
		cardId,
		sides,
		number,
		index,
		count,
		currentStyle
	}) => {

	const selectedSide = useSettingsStore((state) => state.selectedSide);
	const cardData = getCard(collectionId, cardId);

	//moveCard: (dragIndex: number, hoverIndex: number) => void
	const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
		console.log('move', dragIndex, hoverIndex)
	}, []);

	const {goCard} = useCardNavigateHook(collectionId!, cardId!);

	const navigateToCard = useCallback(() => {
		goCard();
	}, [goCard]);

	return <DraggableCard moveCard={handleMove} key={cardId} id={cardId} index={index}>
		<div className={'card-item'} onClick={navigateToCard}>
			{number > 0 && <div className={'card-number'}>{number}
				{number % 2 === 0 && <span>of {count}</span>}
			</div>}

			<div className={'card-sides'}>
				{sides?.map((collectionSide, idx) => {
					const sideColor = (cardData?.ownDesign
						? cardData.sides?.[idx]?.appearance?.color
						: collectionSide?.color) || '#fff';

					const sideText = (cardData?.ownDesign
						? cardData.sides?.[idx]?.appearance?.textColor
						: collectionSide?.textColor) || '#222';

					let needRender = true;
					if (currentStyle === 'cards') {
						if (selectedSide) {
							needRender = selectedSide === idx;
						} else {
							needRender = idx === 0;
						}
					}
					if (!needRender) {
						return null
					}
					return <CardSide
						collectionId={collectionId}
						cardId={cardId}
						sideIdx={idx}
						background={sideColor}
						color={sideText}
						key={cardId + idx.toString()}/>
				})}

				<div className={'card-actions'}>
					<CardRemoveButton collectionId={collectionId} cardId={cardId}/>
				</div>
			</div>
		</div>
	</DraggableCard>;
};
