import React from "react";
import {CardListModeSelector} from "./card-list-mode-selector.component.tsx";
import {ICardboxState, useCardboxStore} from "../../../../../store/data/cardboxes-store.ts";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {useShallow} from "zustand/react/shallow";
import {getCardbox} from "../../../../../store/data/cardboxes-store.selectors.ts";

export type TCardListHeaderProps = {
	cardboxId?: string
}

export const CardListHeader: React.FC<TCardListHeaderProps> = ({cardboxId}) => {
	const sides = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.sides));

	const currentStyle = useSettingsStore((state) => state.cardListStyle);
	const showSideNames = currentStyle === 'list';
	const cardbox = getCardbox(cardboxId);

	if (!sides || sides.length < 2) {
		return null;
	}

	if ((cardbox?.cards?.length || 0) === 0) {
		return null;
	}

	return <div className={'card-list'}>
		<div className={'card-sides-header'}>
			{showSideNames && sides?.map((side, idx) => {
				return <div className={'card-side-name'} key={side.name + idx.toString()}>
					{side.name}
				</div>
			})}

			<CardListModeSelector sides={sides}/>
		</div>
	</div>;
};
