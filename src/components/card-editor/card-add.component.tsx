import React, {useCallback} from "react";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {AiFillEdit} from "react-icons/ai";
import {customAlphabet, urlAlphabet} from "nanoid";
import {useNavigate} from "react-router-dom";

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardRemoveProps = {
	collectionId?: string
}

export const CardAdd: React.FC<TCardRemoveProps> = ({collectionId}) => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		const newId = nanoid();
		createCard(collectionId!, newId);
		navigate(`/collections/${collectionId}/cards/${newId}?new`);
	}, []);

	return <div onClick={handleAdd}><AiFillEdit/></div>;
};
