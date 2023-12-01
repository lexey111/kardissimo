import React, {useCallback} from "react";
import {useParams} from "react-router-dom";
import {PageNotFound} from "../../../../components/utils/page-not-found.component.tsx";
import {CardList} from "../card/list/card-list.component.tsx";
import {CardListHeader} from "../card/list/card-list-header.component.tsx";
import {useCardNavigateHook} from "../../../../components/hooks/useCardNavigate.hook.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";
import {CardListAdd} from "../card/list/card-list-add.component.tsx";
import {CardsNoData} from "./card-list-no-data.component.tsx";
import {ICardboxState, useCardboxStore} from "../../../../store/data/cardboxes-store.ts";

export const CardboxCards: React.FC = () => {
	const params = useParams();
	//const cardbox = getCardbox(params.cardboxId);
	const cardbox = useCardboxStore((state: ICardboxState) => state.cardboxes
		.find(c => c.id === params.cardboxId));

	const {goCard} = useCardNavigateHook(cardbox?.id, 'new');

	const handleAdd = useCallback((toBottom: boolean = false) => {
		if (toBottom) {
			localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollHeight || 0).toString());
		} else {
			localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollTop || 0).toString());
		}
		goCard();
	}, [goCard]);

	if (!cardbox || !cardbox.sides) {
		return <PageNotFound/>;
	}

	if (!cardbox.cards || cardbox.cards.length === 0) {
		return <CardsNoData
			addButton={<CardListAdd cardboxId={cardbox.id} onClick={handleAdd}/>}/>;
	}

	return <div className={'page-32'}>
		<CardListHeader cardboxId={cardbox.id}/>
		{cardbox && (cardbox.cards?.length || 0) > 1 && <p className={'tip'}>
			You can drag and drop cards to reorder.
		</p>}

		<CardList cardboxId={cardbox.id}/>
		{/*default add button*/}
		<CardListAdd cardboxId={cardbox.id} onClick={handleAdd}/>
		{/*floating add button*/}
		{cardbox.cards.length > 5 && <BigAddFloatingButton onClick={() => handleAdd(true)} extraHeight={50}/>}
	</div>;
};
