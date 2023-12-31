import React, {useCallback, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {CardEditorForm} from "./card-editor-form.component.tsx";
import {useCardbox} from "../../../../store/cardboxes/hooks/useCardboxHook.tsx";
import {useCard} from "../../../../store/cards/hooks/useCardHook.tsx";
import {PageNotFound} from "../../../../components/utils/page-not-found.component.tsx";
import {TSCard} from "../../../../store/cards/types-card.ts";
import {useCardUpdate} from "../../../../store/cards/hooks/useCardUpdateHook.tsx";
import {useCards} from "../../../../store/cards/hooks/useCardsHook.tsx";
import {WaitGlobal} from "../../../../components/utils/wait-global.component.tsx";

export type TCardEditorProps = {
	cardboxId: number
	cardId: number
	isNew: boolean
}

export const CardEditorData: React.FC<TCardEditorProps> = ({cardboxId, cardId, isNew = false}) => {
	const navigate = useNavigate();

	const {data: cardbox, isLoading: isCardboxLoading} = useCardbox(cardboxId);
	const {data: cards, isLoading: isCardsLoading} = useCards(cardboxId);
	const {data: cardData, isLoading} = useCard(cardboxId, cardId);

	const cardMutation = useCardUpdate(cardboxId);

	const handleBack = useCallback(() => {
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

	const handleSubmit = useCallback((data: TSCard) => {
		if (data.id === 0) {
			const maxIndex = cards!.reduce((prev, current) => Math.max(prev, current.cards_order), 0);
			data.cards_order = maxIndex + 1;
		}

		cardMutation.mutate(data);
		navigate(`/cardboxes/${cardboxId}/cards`);
	}, [cardboxId, isNew, navigate]);

	if (isLoading || isCardboxLoading || isCardsLoading) {
		return <WaitGlobal text={'Loading data...'}/>;
	}

	if (!cardbox) {
		return <PageNotFound message={`Card box #${cardboxId} not found`}/>;
	}

	if (!cardData || !cards) {
		return <PageNotFound message={`Card #${cardId} not found`}/>;
	}

	return <CardEditorForm
		cardbox={cardbox}
		initialState={cardData}
		onCancel={handleBack}
		isNew={isNew}
		onSubmit={handleSubmit}/>
};
