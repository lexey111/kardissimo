import React, {useCallback} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {CardboxDetailsForm} from "./cardbox-details-form.component.tsx";
import {TSCardbox} from "../../../../store/cardboxes/types-cardbox.ts";
import {getDefaultSCardbox} from "../../../../store/cardboxes/cardboxes-utils.ts";
import {useCardboxUpdate} from "../../../../store/cardboxes/hooks/useCardboxUpdateHook.tsx";
import {useCardboxes} from "../../../../store/cardboxes/hooks/useCardboxesHook.tsx";
import {WaitInline} from "../../../../components/utils/wait-inline.component.tsx";
import {PageError} from "../../../../types.ts";

export const CardboxDetails: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const isNew = params.cardboxId === 'new';
	const cardboxId = parseInt(params.cardboxId || '', 10);

	const updateCardboxMutation = useCardboxUpdate();
	const {data, isLoading} = useCardboxes();

	const state = isNew
		? getDefaultSCardbox()
		: data?.find(c => c.id === cardboxId);

	const goCardboxes = () => {
		navigate('/cardboxes');
	}

	const handleSubmit = useCallback((values: TSCardbox) => {
		updateCardboxMutation.mutate(values);

		navigate('/cardboxes');
	}, [isNew, navigate]);

	const handleGoCards = useCallback((values: TSCardbox) => {
		updateCardboxMutation.mutate(values);

		navigate(`/cardboxes/${cardboxId}/cards`);
	}, [cardboxId, isNew, navigate]);

	if (isLoading) {
		return <WaitInline text={'Loading data...'}/>;
	}

	if (!state) {
		throw new PageError('CardBox not found', 'Oops!');
	}

	return <CardboxDetailsForm
		initialState={state}
		onSubmit={handleSubmit}
		onCancel={goCardboxes}
		goCards={handleGoCards}
		isNew={isNew}/>;
};
