import React, {useCallback} from "react";
import {CardSide} from "../card-side.component.tsx";
import {CardRemoveButton} from "../card-remove.button.tsx";
import {TCardListStyle, useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {TCardboxSide} from "../../../../../store/data/types.ts";
import {getCard} from "../../../../../store/data/cardboxes-store.selectors.ts";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {DraggableCard} from "./draggable-card.component.tsx";

export type TCardListItemProps = {
	cardboxId?: string
	sides?: Array<TCardboxSide>
	currentStyle: TCardListStyle
	index: number
	cardId: string
	number: number
	count: number
	handleMove: (dragIndex: number, hoverIndex: number) => void
}

export const CardListItem: React.FC<TCardListItemProps> = (
	{
		cardboxId,
		cardId,
		sides,
		number,
		index,
		count,
		handleMove,
		currentStyle
	}) => {

	const selectedSide = useSettingsStore((state) => state.selectedSide);
	const cardData = getCard(cardboxId, cardId);

	const {goCard} = useCardNavigateHook(cardboxId!, cardId!);

	const navigateToCard = useCallback(() => {
		goCard();
	}, [goCard]);

	return <DraggableCard moveCard={handleMove} key={cardId} id={cardId} index={index}>
		<div className={'card-item'}>
			{number > 0 && <div className={'card-number'}>{number}
				{number % 2 === 0 && <span>of {count}</span>}
			</div>}

			<div className={'card-sides'}>
				{sides?.map((cardboxSide, idx) => {
					const sideColor = (cardData?.ownDesign
						? cardData.sides?.[idx]?.appearance?.color
						: cardboxSide?.color) || '#fff';

					const sideText = (cardData?.ownDesign
						? cardData.sides?.[idx]?.appearance?.textColor
						: cardboxSide?.textColor) || '#222';

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
						cardboxId={cardboxId}
						cardId={cardId}
						sideIdx={idx}
						background={sideColor}
						onClick={navigateToCard}
						color={sideText}
						key={cardId + idx.toString()}/>
				})}

				<div className={'card-actions'}>
					<CardRemoveButton cardboxId={cardboxId} cardId={cardId}/>
				</div>
			</div>
		</div>
	</DraggableCard>;
};
