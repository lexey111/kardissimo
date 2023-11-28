import React, {useCallback, useEffect} from "react";
import {ICardboxState, useCardboxStore} from "../../../../../store/data/cardboxes-store.ts";
import {useShallow} from "zustand/react/shallow";
import {CardListAdd} from "./card-list-add.component.tsx";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {CardsNoData} from "../../cards/card-list-no-data.component.tsx";
import {CardListItem} from "./card-list-item.component.tsx";
import {CardTable} from "../table/card-table.component.tsx";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {moveCardTo} from "../../../../../store/data/cardboxes-store.selectors.ts";

export type TCardListProps = {
	cardboxId?: string
}

export const CardList: React.FC<TCardListProps> = ({cardboxId}) => {

	const {restorePosition} = useCardNavigateHook(cardboxId!, '');

	useEffect(() => {
		restorePosition();
	}, [restorePosition]);

	const cardIds = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.cards?.map(card => card.id)));

	const sides = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.sides));

	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	const handleMove = useCallback((dragIndex: number, hoverIndex: number) => {
		moveCardTo(cardboxId!, dragIndex, hoverIndex);
	}, []);

	if (!cardIds || cardIds.length === 0) {
		return <CardsNoData
			addButton={<CardListAdd cardboxId={cardboxId}/>}/>;
	}

	if (currentStyle === 'table') {
		// table style uses separate component
		return <>
			<CardTable cardboxId={cardboxId}/>
			<CardListAdd cardboxId={cardboxId}/>
		</>;
	}

	// list and card styles are serviced by CSS
	return <div className={`card-list list-style-${currentStyle}`}>
		<DndProvider backend={HTML5Backend}>
			{cardIds.map((cardId, idx) => {
				return <CardListItem
					key={cardId}
					index={idx}
					cardboxId={cardboxId}
					handleMove={handleMove}
					cardId={cardId}
					sides={sides}
					number={currentStyle === 'cards' ? -1 : idx + 1}
					currentStyle={currentStyle}
					count={cardIds.length}
				/>
			})}
		</DndProvider>
		<CardListAdd cardboxId={cardboxId}/>
	</div>;
};
