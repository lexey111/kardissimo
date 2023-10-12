import React from "react";
import {useCollectionStore} from "../../store/data/collections-store.ts";

export type TCardListProps = {
	collectionId?: string
}

export const CardList: React.FC<TCardListProps> = ({collectionId}) => {
	const cardIds = useCollectionStore((state) => state.collections
		.find(c => c.id === collectionId)?.cards?.map(card => card.id)
	);

	return <div className={'card-list'}>
		{(!cardIds || cardIds.length === 0)
			? (<div>No data to display</div>)
			: (
				cardIds.map(cardId => {
					return <div key={cardId} className={'card-item'}>
						id: {cardId}
					</div>;
				})
			)}
		<div>Actions</div>
	</div>;
};
