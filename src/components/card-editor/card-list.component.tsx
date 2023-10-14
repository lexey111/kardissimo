import React, {useCallback} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {CardSide} from "./card-side.component.tsx";
import {useShallow} from "zustand/react/shallow";
import {CardRemove} from "./card-remove.component.tsx";
import {useNavigate} from "react-router-dom";
import {CardListAdd} from "./card-list-add.component.tsx";
import {IoIosAddCircle} from "react-icons/io";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {customAlphabet, urlAlphabet} from "nanoid";
import {CardListHeader} from "./card-list-header.component.tsx";
import {useSettingsStore} from "../../store/settings/settings-store.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardListProps = {
	collectionId?: string
}

export const CardList: React.FC<TCardListProps> = ({collectionId}) => {
	const navigate = useNavigate();

	const cardIds = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.cards?.map(card => card.id)));

	const sides = useCollectionStore(useShallow((state: ICollectionState) => state.collections
		.find(c => c.id === collectionId)?.sides));

	const handleAdd = useCallback(() => {
		const newId = nanoid();

		createCard(collectionId!, newId);
		navigate(`/collections/${collectionId}/cards/${newId}?new`);
	}, []);

	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	if (!cardIds || cardIds.length === 0) {
		return <div className={'margin-center empty-list'}>
			<CardListAdd sides={sides} onClick={handleAdd}/>
			<p className={'center'}>
				No cards to display, yet. Please, use the button <IoIosAddCircle/> above to create the first one.
			</p>
		</div>;
	}

	return <div>
		<CardListHeader sides={sides} listMode={currentStyle === 'list'}/>

		<div className={`card-list list-style-${currentStyle}`}>
			{cardIds.map((cardId, idx) => {
				return <div key={cardId} className={'card-item'}>
					{currentStyle === 'list' && <div className={'card-number'}>{idx + 1}
						{idx % 2 === 0 && <span>of {cardIds.length}</span>}
					</div>}

					<div className={'card-sides'}>
						{sides?.map((_, idx) => {
							if (currentStyle === 'cards' && idx > 0) {
								return null
							}
							return <CardSide
								collectionId={collectionId}
								cardId={cardId}
								sideIdx={idx}
								key={cardId + idx.toString()}/>
						})}
					</div>

					<div className={'card-actions'}>
						{/*<CardAdd collectionId={collectionId}/>*/}
						<CardRemove collectionId={collectionId} cardId={cardId}/>
					</div>
				</div>;
			})}
			{currentStyle === 'cards' && <CardListAdd sides={sides} onClick={handleAdd} showHeader={false}/>}
		</div>
		{currentStyle === 'list' && <CardListAdd sides={sides} onClick={handleAdd} showHeader={false}/>}
	</div>;
};
