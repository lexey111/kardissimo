import React from "react";
import {CardSide} from "./card-side.component.tsx";
import {CardRemove} from "./card-remove.component.tsx";
import {TCardListStyle} from "../../store/settings/settings-store.ts";

export type TCardListItemProps = {
	collectionId?: string
	sides?: [string, string]
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
	return <div className={'card-item'}>
		<div className={'card-number'}>{number}
			{number % 2 === 0 && <span>of {count}</span>}
		</div>

		<div className={'card-sides'}>
			{sides?.map((_, idx) => {
				if (currentStyle === 'cards' && idx > 0) {
					return null
				}
				return <CardSide
					collectionId={collectionId}
					cardId={cardId}
					sideIdx={idx}
					key={cardId + idx.toString()}/>
			})}
		</div>

		<div className={'card-actions'}>
			<CardRemove collectionId={collectionId} cardId={cardId}/>
		</div>
	</div>;
};
