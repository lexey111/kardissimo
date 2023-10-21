import React, {useCallback, useEffect} from "react";
import {getCard} from "../../store/data/collections-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {TCard} from "../../store/data/types.ts";
import {CardEditorForm} from "./card-editor-form.component.tsx";
import {createCard, getDefaultCard, removeCard, updateCard} from "../../store/data/collections-store.actions.ts";

export type TCardEditorProps = {
	collectionId?: string
	cardId?: string
	isNew: boolean
}

export const CardEditorData: React.FC<TCardEditorProps> = ({collectionId, cardId, isNew = false}) => {
	const navigate = useNavigate();
	const cardData = isNew ? getDefaultCard(collectionId) : getCard(collectionId, cardId);

	const handleBack = useCallback(() => {
		if (isNew) {
			// delete the card first
			removeCard(collectionId, cardId);
			navigate(`/collections/${collectionId}/cards?from-new`);
			return;
		}

		navigate(`/collections/${collectionId}/cards`);
	}, []);

	const handleEsc = useCallback((e: any) => {
		if (e.key !== 'Escape') {
			return;
		}
		handleBack();
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleEsc);
		return () => {
			window.removeEventListener('keydown', handleEsc);
		}
	}, []);

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
	}, []);

	if (!cardData) {
		return null;
	}

	return <CardEditorForm initialState={cardData!}
	                       onCancel={handleBack}
	                       isNew={isNew}
	                       onSubmit={handleSubmit}/>
};
