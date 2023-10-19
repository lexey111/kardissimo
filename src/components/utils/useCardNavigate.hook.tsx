import {useNavigate} from "react-router-dom";
import {customAlphabet, urlAlphabet} from "nanoid";
import {createCard} from "../../store/data/collections-store.actions.ts";
import {useEffect, useRef} from "react";

const nanoid = customAlphabet(urlAlphabet, 16);

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
			console.log('STORE', key, position.toFixed())
			localStorage.setItem(key, position.toFixed());
		}

		if (cardId === 'new') {
			const newId = nanoid();
			createCard(collectionId!, newId); // <- make route loader
			navigate(`/collections/${collectionId}/cards/${newId}?new`, {preventScrollReset: true});
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
