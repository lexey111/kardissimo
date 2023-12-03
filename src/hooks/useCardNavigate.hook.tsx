import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

export const useCardNavigateHook = (cardboxId?: string, cardId?: string) => {
	const navigate = useNavigate();
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	const goCard = (_cardId?: string) => {
		const targetId = cardId || _cardId;

		if (cardId === 'new') {
			navigate(`/cardboxes/${cardboxId}/cards/new`, {preventScrollReset: true});
			return;
		}

		navigate(`/cardboxes/${cardboxId}/cards/${targetId}`, {preventScrollReset: true});
	};

	return {
		goCard
	}
};
