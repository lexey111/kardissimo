import React, {useCallback} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {CardboxDetailsForm} from "./cardbox-details-form.component.tsx";
import {TCardbox} from "../../../../store/data/types.ts";
import {getCardbox} from "../../../../store/data/cardboxes-store.selectors.ts";
import {createCardbox, getDefaultCardbox, updateCardbox} from "../../../../store/data/cardboxes-store.actions.ts";

export const CardboxDetails: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const cardboxId = params.cardboxId;
	const isNew = params.cardboxId === 'new';

	const state: TCardbox = isNew ? getDefaultCardbox() : getCardbox(cardboxId)!;

	const goCardboxes = () => {
		navigate('/cardboxes');
	}

	const handleSubmit = useCallback((values: TCardbox) => {
		if (isNew) {
			createCardbox(values);
		} else {
			updateCardbox(values);
		}
		navigate('/cardboxes');
	}, [isNew, navigate]);

	const handleGoCards = useCallback((values: TCardbox) => {
		if (isNew) {
			createCardbox(values);
		} else {
			updateCardbox(values);
		}
		navigate(`/cardboxes/${cardboxId}/cards`);
	}, [cardboxId, isNew, navigate]);

	return <CardboxDetailsForm
		initialState={state}
		onSubmit={handleSubmit}
		onCancel={goCardboxes}
		goCards={handleGoCards}
		isNew={isNew}/>;
};
