import React from "react";
import {removeCard} from "../../store/data/collections-store.actions.ts";

export type TCardRemoveProps = {
	collectionId?: string
	cardId: string
}

export const CardRemove: React.FC<TCardRemoveProps> = ({collectionId, cardId}) => {
	return <button onClick={() => removeCard(collectionId, cardId)}
	               className={'pure-button pure-button-danger'}>
		Remove
	</button>;
};
