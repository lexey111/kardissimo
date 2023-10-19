import React, {useCallback} from "react";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {useNavigate} from "react-router-dom";
import {customAlphabet, urlAlphabet} from "nanoid";
import {IoIosAddCircle} from "react-icons/io";
import {useHeight} from "../utils/useHeight.hook.tsx";

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardAddProps = {
	collectionId?: string
}


export const CardAddFloating: React.FC<TCardAddProps> = ({collectionId}) => {
	const navigate = useNavigate();

	const {needToShowScroll} = useHeight(50);

	const handleAdd = useCallback(() => {
		const newId = nanoid();
		createCard(collectionId!, newId);
		navigate(`/collections/${collectionId}/cards/${newId}?new`, {preventScrollReset: true});
	}, []);

	if (!needToShowScroll) {
		return null;
	}

	return <div className={'add-card-floating'} onClick={handleAdd}>
		<IoIosAddCircle/>
	</div>;

};
