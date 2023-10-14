import React from "react";
import {ICollectionState, useCollectionStore} from "../../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {CardListAdd} from "./card-list-add.component.tsx";
import {useSettingsStore} from "../../../store/settings/settings-store.ts";
import {CardListNoData} from "./card-list-no-data.component.tsx";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";

export type TCardListProps = {
	collectionId?: string
}

export const CardList: React.FC<TCardListProps> = ({collectionId}) => {

	const cardIds = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards?.map(card => card.id)));

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	if (!cardIds || cardIds.length === 0) {
		return <CardListNoData collectionId={collectionId}/>;
	}

	if (currentStyle === 'table') {
		// table style uses separate component
		return <>
			<CardTable collectionId={collectionId}/>
			{cardIds.length < 7 && <CardListAdd collectionId={collectionId}/>}
		</>;
	}

	const threshold = currentStyle === 'list' ? 3: 18;
	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${currentStyle}`}>
		{cardIds.map((cardId, idx) => {
			return <CardListItem key={cardId}
			                     collectionId={collectionId}
			                     cardId={cardId}
			                     sides={sides}
			                     number={idx + 1}
			                     currentStyle={currentStyle}
			                     count={cardIds.length}
			/>
		})}
		{cardIds.length < threshold && <CardListAdd collectionId={collectionId}/>}
	</div>;
};
