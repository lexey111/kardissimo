import React, {useCallback, useEffect} from "react";
import {getCard, getCardbox} from "../../../../store/data/cardboxes-store.selectors.ts";
import {useNavigate} from "react-router-dom";
import {TCard} from "../../../../store/cardboxes/types.ts";
import {CardEditorForm} from "./card-editor-form.component.tsx";
import {createCard, getDefaultCard, removeCard, updateCard} from "../../../../store/data/cardboxes-store.actions.ts";

export type TCardEditorProps = {
	cardboxId?: string
	cardId?: string
	isNew: boolean
}

export const CardEditorData: React.FC<TCardEditorProps> = ({cardboxId, cardId, isNew = false}) => {
	const navigate = useNavigate();
	const cardData = isNew ? getDefaultCard(cardboxId) : getCard(cardboxId, cardId);
	const cardbox = getCardbox(cardboxId);

	const handleBack = useCallback(() => {
		if (isNew) {
			// delete the card first
			removeCard(cardboxId, cardId);
			navigate(`/cardboxes/${cardboxId}/cards`);
			return;
		}

		navigate(`/cardboxes/${cardboxId}/cards`);
	}, [cardId, cardboxId, isNew, navigate]);

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
			createCard(cardboxId!, {
				id: data.id,
				ownDesign: data.ownDesign,
				sides: data.sides
			});

			navigate(`/cardboxes/${cardboxId}/cards`);
		}
		// to filter ['names']
		updateCard(cardboxId, {
			id: data.id,
			ownDesign: data.ownDesign,
			sides: data.sides
		});
		navigate(`/cardboxes/${cardboxId}/cards`);
	}, [cardboxId, isNew, navigate]);

	if (!cardData) {
		return null;
	}

	return <CardEditorForm
		cardbox={cardbox}
		initialState={cardData!}
		onCancel={handleBack}
		isNew={isNew}
		onSubmit={handleSubmit}/>
};
