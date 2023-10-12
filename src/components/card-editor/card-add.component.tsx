import React, {useState} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {TCollection} from "../../store/data/types.ts";

export type TCardAddProps = {
	collectionId?: string
}

const selector = (state: ICollectionState) => state.addCard;

export const CardAdd: React.FC = () => {
	const addCard = useCollectionStore(selector);

	const createCard = () => {
		addCard();
	};

	return <button onClick={createCard}
	               className={'pure-button pure-button-primary'}>Add card...</button>;
};
