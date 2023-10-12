import React from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {CardSide} from "./card-side.component.tsx";
import {useShallow} from "zustand/react/shallow";
import {CardRemove} from "./card-remove.component.tsx";
import {createCard} from "../../store/data/collections-store.actions.ts";

export type TCardListProps = {
	collectionId?: string
}

export const CardList: React.FC<TCardListProps> = ({collectionId}) => {
	const cardIds = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards?.map(card => card.id)));

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	console.log('[LIST]')

	if (!cardIds || cardIds.length === 0) {
		return <div className={'card-no-data'}>
			<p>
				No data to display. Please, use the button below to create the first one.
			</p>

			<button onClick={() => createCard(collectionId)}
			        className={'pure-button pure-button-primary'}>Create card
			</button>
		</div>;
	}

	return <div className={'card-list'}>
		<div className={'card-sides-header'}>
			{sides?.map((sideName, idx) => {
				return <div className={'card-side-name'} key={sideName + idx.toString()}>
					{sideName}
				</div>
			})}
		</div>

		{cardIds.map((cardId, idx) => {
			return <div key={cardId} className={'card-item'}>
				<div className={'card-number'}>{idx + 1}
					{idx %2 === 0 && <span>of {cardIds.length}</span>}
				</div>

				<div className={'card-sides'}>
					{sides?.map((_, idx) => {
						return <CardSide
							collectionId={collectionId}
							cardId={cardId}
							sideIdx={idx}
							key={cardId + idx.toString()}/>
					})}
					<div className={'card-actions'}>
						<CardRemove collectionId={collectionId} cardId={cardId}/>
					</div>
				</div>
			</div>;
		})}
	</div>;

};
