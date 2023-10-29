import React, {useEffect} from "react";
import {ICollectionState, useCollectionStore} from "../../../../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {CardListAdd} from "./card-list-add.component.tsx";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {ListNoData} from "../../cards/card-list-no-data.component.tsx";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";
import {useCardNavigateHook} from "../../../../../components/utils/useCardNavigate.hook.tsx";

export type TCardListProps = {
	collectionId?: string
}

export const CardList: React.FC<TCardListProps> = ({collectionId}) => {

	const {restorePosition} = useCardNavigateHook(collectionId!, '');

	useEffect(() => {
		restorePosition();
	}, [restorePosition]);

	const cardIds = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards?.map(card => card.id)));

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const currentStyle = useSettingsStore((state) => state.cardListStyle);


	if (!cardIds || cardIds.length === 0) {
		return <ListNoData
			caption={'No cards to display, yet.'}
			addButton={<CardListAdd collectionId={collectionId}/>}/>;
	}

	if (currentStyle === 'table') {
		// table style uses separate component
		return <>
			<CardTable collectionId={collectionId}/>
			<CardListAdd collectionId={collectionId}/>
		</>;
	}

	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${currentStyle}`}>
		{cardIds.map((cardId, idx) => {
			return <CardListItem
				key={cardId}
				collectionId={collectionId}
				cardId={cardId}
				sides={sides}
				number={currentStyle === 'cards' ? -1 : idx + 1}
				currentStyle={currentStyle}
				count={cardIds.length}
			/>
		})}
		<CardListAdd collectionId={collectionId}/>
	</div>;
};
