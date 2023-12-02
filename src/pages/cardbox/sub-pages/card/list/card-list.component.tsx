import React, {useCallback, useLayoutEffect, useState} from "react";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {moveCardTo} from "../../../../../store/data/cardboxes-store.selectors.ts";
import {TCardbox} from "../../../../../store/data/types.ts";

export type TCardListProps = {
	cardbox: TCardbox
}

export const CardList: React.FC<TCardListProps> = ({cardbox}) => {

	const [scrollPos, setScrollPos] = useState<number | undefined>(0);

	const cardIds = cardbox.cards?.map(card => card.id);

	const sides = cardbox.sides;

	const currentStyle = useSettingsStore((state) => state.cardListStyle);

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

	if (!cardIds || cardIds.length === 0) {
		return null;
	}

	if (currentStyle === 'table') {
		// table style uses separate component
		return <CardTable cardboxId={cardbox.id}/>;
	}

	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${currentStyle}`}>
		<DndProvider backend={HTML5Backend}>
			{cardIds.map((cardId, idx) => {
				return <CardListItem
					key={cardId}
					index={idx}
					cardboxId={cardbox.id}
					handleMove={handleMove}
					cardId={cardId}
					sides={sides}
					currentStyle={currentStyle}
				/>
			})}
		</DndProvider>
	</div>;
};
