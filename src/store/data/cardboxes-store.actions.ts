import {customAlphabet, urlAlphabet} from 'nanoid';
import {TCard, TCardbox, TCardEnriched} from "../cardboxes/types-cardbox.ts";
import {useCardboxStore} from "./cardboxes-store.ts";
import {defaultSide, getCardbox} from "./cardboxes-store.selectors.ts";

const nanoid = customAlphabet(urlAlphabet, 16);

export const createCardbox = (newCardbox: TCardbox) => useCardboxStore.setState((state) => {
	const _cardbox = {...newCardbox};

	if (!newCardbox.id) {
		_cardbox.id = nanoid();
	}

	if (!newCardbox.title) {
		_cardbox.title = 'New cardbox';
	}
	_cardbox.stat = {changed_at: new Date(), created_at: new Date()};

	return {cardboxes: [...state.cardboxes, _cardbox]};
});

export const getDefaultCardbox = (): TCardbox => {
	const id = nanoid();

	return {
		id,
		title: 'New cardbox',
		author: '',
		isLocal: true,
		sides: [
			{
				...defaultSide,
				name: 'English',
			},
			{
				...defaultSide,
				name: 'Español'
			}]
	};
}

export const getDefaultCard = (cardboxId?: string): TCardEnriched | undefined => {
	const cardbox = getCardbox(cardboxId);

	if (!cardbox) {
		return undefined;
	}

	const id = nanoid();

	return {
		id,
		sides: cardbox.sides?.map(() => ({header: '', text: '', footer: ''})),
		cardboxSides: cardbox.sides
	};
}


export const createDefaultCardbox = (): string => {
	const id = nanoid();

	createCardbox({
		id,
		title: 'New cardbox',
		author: '',
		isLocal: true,
		sides: [{name: 'English'}, {name: 'Español'}]
	});

	return id;
}

export const removeCardbox = (id: string) => useCardboxStore.setState((state) => {
	return {
		cardboxes: state.cardboxes.filter(c => c.id !== id)
	};
});

export const updateCardbox = (data: TCardbox) => useCardboxStore.setState((state) => {
	const oldData = state.cardboxes.find(c => c.id === data?.id);
	if (!oldData) {
		return {...state.cardboxes};
	}
	return {
		cardboxes: state.cardboxes.map(c => c.id !== data.id
			? c
			: {...data})
	};
});

export const updateCardboxStat = (cardboxId?: string) => useCardboxStore.setState((state) => {
	const oldData = state.cardboxes.find(c => c.id === cardboxId);
	if (!oldData) {
		return {...state.cardboxes};
	}
	return {
		cardboxes: state.cardboxes.map(c => c.id !== cardboxId
			? c
			: {
				...c, stat: {created_at: c.stat?.created_at || new Date(), changed_at: new Date()}
			})
	};
});

export const createCard = (cardboxId?: string, data?: TCard) => useCardboxStore.setState((state) => {
	if (!cardboxId || !data) {
		console.error(`Cardbox "${cardboxId}" not found or no data provided!`);
		return {...state.cardboxes};
	}
	const cardbox = state.cardboxes.find(c => c.id === cardboxId);

	if (!cardbox) {
		console.error(`Cardbox "${cardboxId}" not found!`);
		return {...state.cardboxes};
	}

	if (!cardbox.cards) {
		cardbox.cards = [];
	}

	cardbox.cards.push(data);

	return {
		cardboxes: state.cardboxes
	};
});

export const removeAllCards = (cardboxId?: string) => useCardboxStore.setState((state) => {
	if (!cardboxId) {
		console.error(`Cardbox "${cardboxId}" not found or no data provided!`);
		return {...state.cardboxes};
	}
	const cardbox = state.cardboxes.find(c => c.id === cardboxId);

	if (!cardbox) {
		console.error(`Cardbox "${cardboxId}" not found!`);
		return {...state.cardboxes};
	}

	cardbox.cards = [];

	return {
		cardboxes: state.cardboxes
	};
});

export const isCardExists = (cardboxId?: string, text?: string) => {
	const cardbox = useCardboxStore.getState().cardboxes.find(c => c.id === cardboxId);
	if (!cardbox) {
		console.error(`Cardbox not found!`);
		return false;
	}

	if (!cardbox.cards || cardbox.cards.length === 0) {
		return false
	}

	return cardbox.cards.findIndex(c => c.sides?.[0].text === text) !== -1;
}

export const updateCard = (cardboxId?: string, data?: TCard) => useCardboxStore.setState((state) => {
	const cardbox = state.cardboxes.find(c => c.id === cardboxId);

	if (!cardbox) {
		return {...state.cardboxes}; // cardbox not found
	}

	const hasCard = cardbox.cards?.find(c => c.id === data?.id);

	if (!hasCard) {
		return {...state.cardboxes}; // card not found
	}

	cardbox.cards = cardbox!.cards!.map(c => c.id !== data!.id ? c : data!);

	return {
		cardboxes: state.cardboxes
	};
});

export const removeCard = (cardboxId?: string, cardId?: string) => useCardboxStore.setState((state) => {
	const cardbox = state.cardboxes.find(c => c.id === cardboxId);

	if (!cardbox) {
		return {...state.cardboxes};
	}

	return {
		cardboxes: state.cardboxes.map(c => c.id !== cardboxId
			? c
			: {
				...c, cards: cardbox.cards?.filter(c => c.id !== cardId)
			})
	};
});

// temp
createCardbox({
	id: '1234', //nanoid(),
	title: 'First Test cardbox',
	author: '',
	isLocal: true,
	sides: [{name: 'English'}, {name: 'Español'}]
});

createCardbox({
	id: '6789',// nanoid(),
	title: 'Second cardbox',
	author: 'John Doe',
	isLocal: true,
	sides: [
		{name: 'English', textColor: '#222', color: '#c5e2e3'},
		{name: 'Español', textColor: '#02326c', color: '#e7d3a8'}
	]
});

createCardbox({
	id: nanoid(),
	title: 'Dynamic cardbox',
	author: 'John Doe',
	isLocal: true,
	sides: [
		{name: 'Ukrainian', textColor: '#222', color: '#c4e8ec'},
		{name: 'English', textColor: '#02326c', color: '#ead1a4'}
	]
});

for (let i = 0; i < 100; i++) {
	const id = nanoid();

	createCard('6789', {
		id,
		sides: [
			{header: '', text: 'Hello, world #' + (i + 1), footer: (i + 1).toString() + 'A'},
			{header: '', text: '¡Hola, Mundo!', footer: (i + 1).toString() + 'B'}
		],
	});
}
