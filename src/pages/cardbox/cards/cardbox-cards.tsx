import React, {useCallback} from "react";
import {useParams} from "react-router-dom";
import {PageNotFound} from "../../../components/utils/page-not-found.component.tsx";
import {CardList} from "./card-list.component.tsx";
import {CardListHeader} from "./card-list-header.component.tsx";
import {useCardNavigateHook} from "../../../hooks/useCardNavigate.hook.tsx";
import {BigAddFloatingButton} from "../../../components/utils/big-add-floating-button.component.tsx";
import {CardsNoData} from "./cards-no-data.component.tsx";
import {useCards} from "../../../store/cards/hooks/useCardsHook.tsx";
import {WaitInline} from "../../../components/utils/wait-inline.component.tsx";
import {useCardbox} from "../../../store/cardboxes/hooks/useCardboxHook.tsx";
import {CardsImport} from "./import/cards-import.component.tsx";
import {CardRemove} from "./card-remove.component.tsx";

export const CardboxCards: React.FC = () => {
	const params = useParams();
	const cardboxId = isNaN(parseInt(params.cardboxId || '', 10)) ? -1 : parseInt(params.cardboxId || '', 10);

	const {data: cardboxData, error: cardboxError, isLoading: isCardboxLoading} = useCardbox(cardboxId);
	const {data: cardsData, isLoading} = useCards(cardboxId);

	const {goCard} = useCardNavigateHook(cardboxId, 'new');

	const handleAdd = useCallback((toBottom: boolean = false) => {
		if (toBottom) {
			localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollHeight || 0).toString());
		} else {
			localStorage.setItem('_lastCardsScrollPos', (document.scrollingElement?.scrollTop || 0).toString());
		}
		goCard();
	}, [goCard]);

	if (isLoading || isCardboxLoading) {
		return <WaitInline text={'Loading data...'}/>;
	}

	if (cardboxError || !cardboxData) {
		return <PageNotFound message={`Card box #${cardboxId} not found`}/>;
	}

	if (!cardsData || !cardboxData) {
		return <PageNotFound/>;
	}

	if (cardsData.length === 0) {
		return <CardsNoData onCreate={handleAdd} cardboxId={cardboxId}/>;
	}

	return <div className={'page-32'}>
		<CardListHeader cardbox={cardboxData}/>
		{cardsData.length > 1 && <p className={'tip'}>
			You can drag and drop cards to reorder them.
		</p>}


		{/* dispatch table/list */}
		<CardList cardbox={cardboxData} onAdd={handleAdd}/>

		{/* event handler for imports */}
		<CardsImport cardboxId={cardboxId}/>

		{/* event handler for delete */}
		<CardRemove cardboxId={cardboxId}/>

		{/* floating add button */}
		{cardsData.length > 5 && <BigAddFloatingButton onClick={() => handleAdd(true)} extraHeight={50}/>}
	</div>;
};
