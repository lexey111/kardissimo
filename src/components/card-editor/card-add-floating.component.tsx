import React from "react";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {countCards} from "../../store/data/collections-store.selectors.ts";

export type TCardAddProps = {
	collectionId?: string
}

export const CardAddFloating: React.FC<TCardAddProps> = ({collectionId}) => {

	const cardCounter = countCards(collectionId);
	if (cardCounter === 0) {
		return null;
	}

	return <div className={'add-card-floating'}>
		<button onClick={() => createCard(collectionId)}
		        className={'pure-button pure-button-primary pure-button-floating'}>+
		</button>
	</div>;

};
