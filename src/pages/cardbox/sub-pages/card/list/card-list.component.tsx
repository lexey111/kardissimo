import React, {useCallback, useLayoutEffect, useState} from "react";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TSCardbox} from "../../../../../store/cardboxes/types-cardbox.ts";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {useCards} from "../../../../../store/cards/hooks/useCardsHook.tsx";
import {WaitInline} from "../../../../../components/utils/wait-inline.component.tsx";
import {PageNotFound} from "../../../../../components/utils/page-not-found.component.tsx";
import {toast} from "react-toastify";
import {useCardMove} from "../../../../../store/cards/hooks/useCardMoveHook.tsx";

export type TCardListProps = {
	cardbox: TSCardbox
}

export const CardList: React.FC<TCardListProps> = ({cardbox}) => {
	const {data: appState, isLoading} = useSettingsQuery();
	const {data: cards, isLoading: isCardsLoading} = useCards(cardbox.id);

	const [scrollPos, setScrollPos] = useState<number | undefined>(0);

	const moveMutation = useCardMove(cardbox.id);

	const handleMove = useCallback(async (dragId: number, targetId: number) => {
		setScrollPos(() => document.scrollingElement?.scrollTop || 0);
		console.log('move', dragId, '->', targetId);
		const from = cards?.find(c => c.id === dragId);
		const to = cards?.find(c => c.id === targetId);

		if (!from || !to) {
			toast('Error on moving the card: card not found', {type: 'error'})
			return;
		}

		await moveMutation.mutateAsync({
			fromId: from.id,
			fromOrder: from.cards_order,
			toId: to.id,
			toOrder: to.cards_order
		});
	}, [cards]);

	useLayoutEffect(() => {
		if (scrollPos && scrollPos !== 0 && document.scrollingElement) {

			setTimeout(() => {
				document.scrollingElement!.scrollTop = scrollPos;
				setScrollPos(undefined); // next render
			}, 0);
		}
	}, [scrollPos]);

	useLayoutEffect(() => {
		const storedPos = parseInt(localStorage.getItem('_lastCardsScrollPos') || '', 10);
		localStorage.setItem('_lastCardsScrollPos', '-1');

		if (!isNaN(storedPos) && storedPos !== -1) {
			setScrollPos(storedPos);
		}

	}, []);

	if (isLoading || isCardsLoading) {
		return <WaitInline text={'Loading data...'}/>;
	}

	if (!cards) {
		return <PageNotFound message={`Cards for box #${cardbox.id} not found`}/>;
	}

	if (appState?.cardListStyle === 'table') {
		// table style uses separate component
		return <CardTable
			cardboxId={cardbox.id}
			sides={[cardbox.side1title, cardbox.side2title]}
			cards={cards}/>;
	}

	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${appState?.cardListStyle || 'cards'}`}>
		<DndProvider backend={HTML5Backend}>
			{cards.map((card, idx) => {
				return <CardListItem
					card={card}
					cardbox={cardbox}
					key={card.id}
					index={idx}
					handleMove={handleMove}
					currentStyle={appState?.cardListStyle || 'cards'}
				/>
			})}
		</DndProvider>
	</div>;
};
