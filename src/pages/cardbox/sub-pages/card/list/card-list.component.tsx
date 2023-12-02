import React, {useCallback, useLayoutEffect, useState} from "react";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {moveCardTo} from "../../../../../store/data/cardboxes-store.selectors.ts";
import {TCardbox} from "../../../../../store/data/types.ts";
import {useSettingsQuery} from "../../../../../components/hooks/useSettingsHook.tsx";

export type TCardListProps = {
	cardbox: TCardbox
}

export const CardList: React.FC<TCardListProps> = ({cardbox}) => {
	const {isLoading, error, data: appState} = useSettingsQuery();

	const [scrollPos, setScrollPos] = useState<number | undefined>(0);

	const cardIds = cardbox.cards?.map(card => card.id);

	const sides = cardbox.sides;

	const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
		setScrollPos(() => document.scrollingElement?.scrollTop || 0);
		moveCardTo(cardbox!.id!, dragIndex, hoverIndex);
	}, []);

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

	if (isLoading || error || !appState) {
		return null;
	}

	if (!cardIds || cardIds.length === 0) {
		return null;
	}

	if (appState.cardListStyle === 'table') {
		// table style uses separate component
		return <CardTable cardboxId={cardbox.id}/>;
	}

	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${appState.cardListStyle}`}>
		<DndProvider backend={HTML5Backend}>
			{cardIds.map((cardId, idx) => {
				return <CardListItem
					key={cardId}
					index={idx}
					cardboxId={cardbox.id}
					handleMove={handleMove}
					cardId={cardId}
					sides={sides}
					currentStyle={appState.cardListStyle}
				/>
			})}
		</DndProvider>
	</div>;
};
