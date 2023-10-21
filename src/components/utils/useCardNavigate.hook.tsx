import {useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";

export const useCardNavigateHook = (collectionId?: string, cardId?: string) => {
	const navigate = useNavigate();
	const destroying = useRef(false);

	useEffect(() => {
		return () => {
			destroying.current = true;
		}
	}, []);

	const key = '_pos_cards_' + collectionId;
	const goCard = (_cardId?: string) => {
		const position = window.document.scrollingElement?.scrollTop;

		let targetId = cardId || _cardId;

		if (position) {
			localStorage.setItem(key, position.toFixed());
		}

		if (cardId === 'new') {
			navigate(`/collections/${collectionId}/cards/new`, {preventScrollReset: true});
			return;
		}

		navigate(`/collections/${collectionId}/cards/${targetId}`, {preventScrollReset: true});
	};

	const resetPosition = () => {
		localStorage.removeItem(key);
	}

	const restorePosition = () => {
		setTimeout(() => {
			if (destroying.current) {
				return;
			}
			const position = Number(localStorage.getItem(key));

			if (isNaN(position)) {
				return;
			}

			const scrollContainer: any = window.document.scrollingElement;
			if (scrollContainer || position > 0) {
				scrollContainer.scrollTop = position;
			}

		}, 200); // magic number because of animation :(
	}

	return {
		goCard,
		restorePosition,
		resetPosition
	}
};
