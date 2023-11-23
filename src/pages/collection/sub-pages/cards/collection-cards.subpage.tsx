import React, {useCallback} from "react";
import {useParams} from "react-router-dom";
import {PageNotFound} from "../../../../components/utils/page-not-found.component.tsx";
import {getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {CardList} from "../card/list/card-list.component.tsx";
import {CardListHeader} from "../card/list/card-list-header.component.tsx";
import {useCardNavigateHook} from "../../../../components/hooks/useCardNavigate.hook.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";

export const CollectionCardsSubpage: React.FC = () => {
	const params = useParams();
	const collection = getCollection(params.collectionId);
	const {goCard} = useCardNavigateHook(collection!.id!, 'new');

	const handleAdd = useCallback(() => {
		goCard();
	}, [goCard]);

	if (!collection || !collection.sides) {
		return <PageNotFound/>;
	}

	return <div className={'page-32'}>
		<CardListHeader collectionId={collection.id}/>
		<CardList collectionId={collection.id}/>
		<BigAddFloatingButton onClick={handleAdd} extraHeight={50}/>
	</div>;
};
