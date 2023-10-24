import React from "react";
import {CardSide} from "../card-side.component.tsx";
import {CardRemoveButton} from "../card-remove.component.tsx";
import {TCardListStyle, useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {TCollectionSide} from "../../../../../store/data/types.ts";

export type TCardListItemProps = {
	collectionId?: string
	sides?: Array<TCollectionSide>
	currentStyle: TCardListStyle
	cardId: string
	number: number
	count: number
}

export const CardListItem: React.FC<TCardListItemProps> = ({
	                                                           collectionId,
	                                                           cardId,
	                                                           sides,
	                                                           number,
	                                                           count,
	                                                           currentStyle
                                                           }) => {

	const selectedSide = useSettingsStore((state) => state.selectedSide);

	return <div className={'card-item'}>
		{number > 0 && <div className={'card-number'}>{number}
			{number % 2 === 0 && <span>of {count}</span>}
		</div>}

		<div className={'card-sides'}>
			{sides?.map((_, idx) => {
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
					key={cardId + idx.toString()}/>
			})}
			<div className={'card-actions'}>
				<CardRemoveButton collectionId={collectionId} cardId={cardId}/>
			</div>
		</div>

	</div>;
};
