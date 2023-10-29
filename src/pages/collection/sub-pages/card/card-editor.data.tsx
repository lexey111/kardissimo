import React, {useCallback, useEffect} from "react";
import {getCard, getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {TCard} from "../../../../store/data/types.ts";
import {CardEditorForm} from "./card-editor-form.component.tsx";
import {createCard, getDefaultCard, removeCard, updateCard} from "../../../../store/data/collections-store.actions.ts";

export type TCardEditorProps = {
	collectionId?: string
	cardId?: string
	isNew: boolean
}

export const CardEditorData: React.FC<TCardEditorProps> = ({collectionId, cardId, isNew = false}) => {
	const navigate = useNavigate();
	const cardData = isNew ? getDefaultCard(collectionId) : getCard(collectionId, cardId);
	const collection = getCollection(collectionId);

	const handleBack = useCallback(() => {
		if (isNew) {
			// delete the card first
			removeCard(collectionId, cardId);
			navigate(`/collections/${collectionId}/cards`);
			return;
		}

		navigate(`/collections/${collectionId}/cards`);
	}, [cardId, collectionId, isNew, navigate]);

	const handleEsc = useCallback((e: any) => {
		if (e.key !== 'Escape') {
			return;
		}
		handleBack();
	}, [handleBack]);

	useEffect(() => {
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		}
	}, [handleEsc]);

	const handleSubmit = useCallback((data: TCard) => {
		if (isNew) {
			createCard(collectionId!, {
				id: data.id,
				sides: data.sides
			});

			navigate(`/collections/${collectionId}/cards`);
		}
		// to filter ['names']
		updateCard(collectionId, {
			id: data.id,
			sides: data.sides
		});
		navigate(`/collections/${collectionId}/cards`);
	}, [collectionId, isNew, navigate]);

	if (!cardData) {
		return null;
	}

	return <CardEditorForm
		collection={collection}
		initialState={cardData!}
		onCancel={handleBack}
		isNew={isNew}
		onSubmit={handleSubmit}/>
};
