import React from "react";
import {removeCard} from "../../store/data/collections-store.actions.ts";
import {FaTrashCan} from "react-icons/fa6";

export type TCardRemoveProps = {
	collectionId?: string
	cardId: string
}

export const CardRemove: React.FC<TCardRemoveProps> = ({collectionId, cardId}) => {
	return <div onClick={() => removeCard(collectionId, cardId)}><FaTrashCan/></div>;
};
