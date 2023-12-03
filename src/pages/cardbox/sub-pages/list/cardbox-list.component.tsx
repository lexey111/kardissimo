import React from "react";
import {ICardboxState, useCardboxStore} from "../../../../store/data/cardboxes-store.ts";
import {CardboxListItem} from "./cardbox-list.item.component.tsx";
import {useShallow} from "zustand/react/shallow";
import {EmptyCardboxListAdd} from "./empty-cardbox-list-add.component.tsx";
import {CardboxListAddItem} from "./cardbox-list.add-item.component.tsx";
import {IoIosAddCircle} from "react-icons/io";

const selector = (state: ICardboxState) => state.cardboxes.map(c => c.id);

export const CardboxList: React.FC = () => {
	const cardboxIds = useCardboxStore(useShallow(selector));

	if (!cardboxIds || cardboxIds.length === 0) {
		return <div className={'cardbox-list empty'}>
			<EmptyCardboxListAdd/>
			<p className={'no-data-text'}>
				<span className={'arrow-up'}></span>
				There are no yet card boxes to display. Please, use the button <IoIosAddCircle/> above to create the
				first one.
			</p>
		</div>;
	}

	return <div className={'cardbox-list'}>
		{cardboxIds.map(cardboxId => {
			return <div key={cardboxId} className={'cardbox-item'}>
				<CardboxListItem id={cardboxId!}/>
			</div>;
		})}
		<CardboxListAddItem/>
	</div>;
};
