import React from "react";
import {CardListModeSelector} from "./card-list-mode-selector.component.tsx";
import {ICollectionState, useCollectionStore} from "../../../store/data/collections-store.ts";
import {useSettingsStore} from "../../../store/settings/settings-store.ts";
import {useShallow} from "zustand/react/shallow";

export type TCardListHeaderProps = {
	collectionId?: string
}

export const CardListHeader: React.FC<TCardListHeaderProps> = ({collectionId}) => {
	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const currentStyle = useSettingsStore((state) => state.cardListStyle);
	const showSideNames = currentStyle === 'list';

	if (!sides || sides.length < 2) {
		return null;
	}

	return <div className={'card-list'}>
		<div className={'card-sides-header'}>
			{showSideNames && sides?.map((sideName, idx) => {
				return <div className={'card-side-name'} key={sideName + idx.toString()}>
					{sideName}
				</div>
			})}

			<CardListModeSelector sides={sides}/>
		</div>
	</div>;
}
