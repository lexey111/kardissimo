import React, {useCallback} from "react";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {countCards} from "../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {customAlphabet, urlAlphabet} from "nanoid";
import {IoIosAddCircle} from "react-icons/io";

const nanoid = customAlphabet(urlAlphabet, 16);

export type TCardAddProps = {
	collectionId?: string
}

export const CardAddFloating: React.FC<TCardAddProps> = ({collectionId}) => {
	const navigate = useNavigate();
	const cardCounter = countCards(collectionId);

	const handleAdd = useCallback(() => {
		const newId = nanoid();
		createCard(collectionId!, newId);
		navigate(`/collections/${collectionId}/cards/${newId}?new`);
	}, []);

	if (cardCounter < 3) {
		return null;
	}

	return <div className={'add-card-floating'} onClick={handleAdd}>
		<IoIosAddCircle/>
	</div>;

};
