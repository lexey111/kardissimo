import React, {useCallback} from "react";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {ICardboxState, useCardboxStore} from "../../../../../store/data/cardboxes-store.ts";
import {useShallow} from "zustand/react/shallow";
import {useCardNavigateHook} from "../../../../../components/hooks/useCardNavigate.hook.tsx";
import {BigAddButton} from "../../../../../components/utils/big-add-button.component.tsx";

export type TCardListAddProps = {
	cardboxId?: string
}

export const CardListAdd: React.FC<TCardListAddProps> = ({cardboxId}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	const {goCard} = useCardNavigateHook(cardboxId!, 'new');

	const sides = useCardboxStore(useShallow((state: ICardboxState) => state.cardboxes
		.find(c => c.id === cardboxId)?.sides));

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