import React, {useCallback} from "react";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {ICollectionState, useCollectionStore} from "../../../../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {BigAddButton} from "../../../../../components/utils/big-add-button.component.tsx";

export type TCardListAddProps = {
	collectionId?: string
}

export const CardListAdd: React.FC<TCardListAddProps> = ({collectionId}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	const {goCard} = useCardNavigateHook(collectionId!, 'new');

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const handleAdd = useCallback(() => {
		goCard();
	}, [goCard]);

	return <div className={`card-list-add-${currentStyle}`}>
		<span></span>
		<div className={'card-item add'}>
			<div className={'card-sides'}>
				{sides?.map((_, idx) => {
					if (currentStyle === 'cards' && idx > 0) {
						return null
					}
					return <div key={'new' + idx.toString()} className={'card-side-content'}></div>;
				})}
			</div>
			<BigAddButton onClick={handleAdd}/>
		</div>
		<span></span>
	</div>;
};
