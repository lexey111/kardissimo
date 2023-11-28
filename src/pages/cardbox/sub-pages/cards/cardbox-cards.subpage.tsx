import React, {useCallback} from "react";
import {useParams} from "react-router-dom";
import {PageNotFound} from "../../../../components/utils/page-not-found.component.tsx";
import {getCardbox} from "../../../../store/data/cardboxes-store.selectors.ts";
import {CardList} from "../card/list/card-list.component.tsx";
import {CardListHeader} from "../card/list/card-list-header.component.tsx";
import {useCardNavigateHook} from "../../../../components/hooks/useCardNavigate.hook.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";

export const CardboxCardsSubpage: React.FC = () => {
	const params = useParams();
	const cardbox = getCardbox(params.cardboxId);
	const {goCard} = useCardNavigateHook(cardbox!.id!, 'new');

	const handleAdd = useCallback(() => {
		goCard();
	}, [goCard]);

	if (!cardbox || !cardbox.sides) {
		return <PageNotFound/>;
	}

	return <div className={'page-32'}>
		<CardListHeader cardboxId={cardbox.id}/>
		{cardbox && (cardbox.cards?.length || 0) > 1 && <p className={'tip'}>
			You can drag and drop cards to reorder.
		</p>}
		<CardList cardboxId={cardbox.id}/>
		{(cardbox?.cards?.length || 0) > 5 && <BigAddFloatingButton onClick={handleAdd} extraHeight={50}/>}
	</div>;
};
