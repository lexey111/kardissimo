import React, {useCallback} from "react";
import {CardSide} from "../card-side.component.tsx";
import {CardRemoveButton} from "../card-remove.button.tsx";
import {TCardListStyle} from "../../../../../store/settings/types-settings.ts";
import {TSCardbox} from "../../../../../store/cardboxes/types-cardbox.ts";
import {useCardNavigateHook} from "../../../../../hooks/useCardNavigate.hook.tsx";
import {DraggableCard} from "./draggable-card.component.tsx";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {TSCard} from "../../../../../store/cards/types-card.ts";
import {getSideColorsBySchema} from "../../../../../store/cardboxes/cardboxes-utils.ts";
import {publish} from "../../../../../subscribe.ts";

export type TCardListItemProps = {
	cardbox: TSCardbox
	card: TSCard
	currentStyle: TCardListStyle
	index: number
	handleMove: (dragIndex: number, hoverIndex: number) => void
}

export const CardListItem: React.FC<TCardListItemProps> = (
	{
		cardbox,
		card,
		index,
		handleMove,
		currentStyle
	}) => {
	const {isLoading, error, data: appState} = useSettingsQuery();

	const {goCard} = useCardNavigateHook(cardbox.id, card.id);

	const navigateToCard = useCallback(() => {
		goCard();
	}, [goCard]);

	const handleDelete = useCallback((e: any) => {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			publish('card-delete', card.id)
		}
	}, []);

	if (isLoading || error || !appState) {
		return null;
	}

	const schema1 = getSideColorsBySchema(card.hasOwnDesign ? card.side1schema : cardbox.side1schema);
	const schema2 = getSideColorsBySchema(card.hasOwnDesign ? card.side2schema : cardbox.side2schema);

	return <DraggableCard moveCard={handleMove} key={card.id} id={card.id} index={index}>
		<div className={'card-item' + (card.id === 0 ? ' unstable' : '')} tabIndex={0} onKeyDown={handleDelete}>
			<div className={'card-sides'}>
				{[1, 2].map((_, idx) => {
					const sideColor = idx === 0 ? schema1.color : schema2.color;
					const sideText = idx === 0 ? schema1.textColor : schema2.textColor;

					let needRender = true;

					if (currentStyle === 'cards') {
						if (appState.selectedSide) {
							needRender = appState.selectedSide === idx;
						} else {
							needRender = idx === 0;
						}
					}

					if (!needRender) {
						return null
					}

					return <CardSide
						card={card}
						sideIdx={idx}
						background={sideColor}
						onClick={navigateToCard}
						color={sideText}
						key={'card' + card.id + idx.toString()}/>
				})}

				<div className={'card-actions'}>
					<CardRemoveButton cardId={card.id}/>
				</div>
			</div>
		</div>
	</DraggableCard>;
};
