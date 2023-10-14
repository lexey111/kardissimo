import React, {useCallback} from "react";
import {IoIosAddCircle} from "react-icons/io";
import {useSettingsStore} from "../../../store/settings/settings-store.ts";
import {createCard} from "../../../store/data/collections-store.actions.ts";
import {useNavigate} from "react-router-dom";
import {customAlphabet, urlAlphabet} from "nanoid";
import {ICollectionState, useCollectionStore} from "../../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardListAddProps = {
	collectionId?: string
}

export const CardListAdd: React.FC<TCardListAddProps> = ({collectionId}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	const navigate = useNavigate();

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const handleAdd = useCallback(() => {
		const newId = nanoid();

		createCard(collectionId!, newId);
		navigate(`/collections/${collectionId}/cards/${newId}?new`);
	}, []);

	return <div className={`card-list-add-${currentStyle}`}>
		<div className={'card-item add'}>
			<div className={'card-sides'} onClick={handleAdd}>
				{sides?.map((_, idx) => {
					if (currentStyle === 'cards' && idx > 0) {
						return null
					}
					return <div key={'new' + idx.toString()} className={'card-side-content'}></div>;
				})}
			</div>

			<div className={'card-item-create'}>
				<IoIosAddCircle/>
			</div>
		</div>
	</div>;
};
