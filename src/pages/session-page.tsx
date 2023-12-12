import React, {useCallback, useEffect, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../hooks/useExclusive.hook.tsx";
import {PageError} from "../types.ts";
import {SessionStage} from "./session/session-stage.tsx";
import {BackToRunButton} from "./run/back-to-run.button.component.tsx";
import {SceneInfoButton} from "./run/scene-info.button.component.tsx";
import {useCardbox} from "../store/cardboxes/hooks/useCardboxHook.tsx";
import {useCards} from "../store/cards/hooks/useCardsHook.tsx";
import {WaitInline} from "../components/utils/wait-inline.component.tsx";
import {PageNotFound} from "../components/utils/page-not-found.component.tsx";
import {TCardSide, TPreparedCard, TPreparedCards} from "./session/types-session.ts";
import {TSCardbox, TSCardboxKey} from "../store/cardboxes/types-cardbox.ts";
import {TSCard} from "../store/cards/types-card.ts";
import {getSideColorsBySchema} from "../store/cardboxes/cardboxes-utils.ts";
import {WaitGlobal} from "../components/utils/wait-global.component.tsx";

function getDirectOrder(id: number, sides: Array<TCardSide>): TPreparedCard {
	const result = [];
	for (let i = 0; i < sides.length; i++) {
		result.push({id, ...sides[i]})
	}
	return result as TPreparedCard;
}

function getReverseOrder(id: number, sides: Array<TCardSide>): TPreparedCard {
	const result = [];
	for (let i = sides.length - 1; i >= 0; i--) {
		result.push({id, ...sides[i]})
	}
	return result as TPreparedCard;
}

function swapAndEnrichSides(id: number, sides: Array<TCardSide>, side: number): TPreparedCard {
	if (side === 0) {
		return getDirectOrder(id, sides);
	}

	if (side === 1) {
		return getReverseOrder(id, sides);
	}

	return Math.random() > 0.5
		? getDirectOrder(id, sides)
		: getReverseOrder(id, sides);
}

function getCardSides(cardbox: TSCardbox, card: TSCard): Array<TCardSide> {
	const schema1 = getSideColorsBySchema(card.hasOwnDesign ? card.side1schema : cardbox.side1schema);
	const schema2 = getSideColorsBySchema(card.hasOwnDesign ? card.side2schema : cardbox.side2schema);

	return [
		{
			name: cardbox.side1title,
			header: card.side1header,
			text: card.side1text,
			footer: card.side1footer,
			appearance: {
				color: schema1.color,
				textColor: schema1.textColor,
				fontSize: card.hasOwnDesign ? card.side1fontSize : cardbox.side1fontSize,
				fontName: card.hasOwnDesign ? card.side1fontName : cardbox.side1fontName,
			}
		},
		{
			name: cardbox.side2title,
			header: card.side2header,
			text: card.side2text,
			footer: card.side2footer,
			appearance: {
				color: schema2.color,
				textColor: schema2.textColor,
				fontSize: card.hasOwnDesign ? card.side2fontSize : cardbox.side2fontSize,
				fontName: card.hasOwnDesign ? card.side2fontName : cardbox.side2fontName,
			}
		}
	];
}

function getExactChunk(cardbox: TSCardbox, cards: TSCard[], from: number, to: number, side: number) {
	const result = [];

	for (let i = from; i <= to; i++) {
		const cardSides = getCardSides(cardbox, cards[i]);

		result.push(swapAndEnrichSides(cards[i].id, cardSides, side));
	}

	return result;
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomChunk(cardbox: TSCardbox, cards: TSCard[], amount: number, side: number) {
	const result = [];
	const usedIdx: Array<number> = [];
	const max = cards.length;

	if (amount > max) {
		throw new PageError('Invalid random chunk params', 'Oops');
	}

	while (result.length < amount) {
		const idx = getRandomInt(0, max);
		if (usedIdx.includes(idx)) {
			continue;
		}
		usedIdx.push(idx);

		const cardSides = getCardSides(cardbox, cards[idx]);
		result.push(swapAndEnrichSides(cards[idx].id, cardSides, side));
	}

	return result;
}

function shuffle(array: Array<any>) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
	}

	return array;
}

export const SessionPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const params = useParams();
	const cardboxId = isNaN(parseInt(params.cardboxId || '', 10)) ? -1 : parseInt(params.cardboxId || '', 10);

	const {data: cardbox, error: cardboxError, isLoading: isCardboxLoading} = useCardbox(cardboxId);
	const {data: cardsData, error: cardsError, isLoading} = useCards(cardboxId);

	const from = Number(searchParams?.get('from'));
	const to = Number(searchParams?.get('to'));
	const order = searchParams?.get('order');
	const chunkType = searchParams?.get('chunk');
	const side = Number(searchParams?.get('side'));

	useExclusiveHook(); // hide menu

	const [cards, setCards] = useState<TPreparedCards>([]);

	const handleDone = useCallback(() => {
		navigate('/run'); // error by navigate, prevent throttling
	}, []);

	useEffect(() => {
		if (!cardbox || !cardsData) {
			return;
		}

		let chunk: TPreparedCards = [];
		if (chunkType === 'exact') {
			chunk = getExactChunk(cardbox, cardsData, from, to, side);
			console.log('=== get exact chunk', from, to)
			if (order === 'random') {
				console.log('+random order')
				chunk = shuffle(chunk);
			}
		}

		if (chunkType === 'random') {
			console.log('=== get random chunk', from, to)
			chunk = getRandomChunk(cardbox, cardsData, to - from + 1, side);
		}

		setCards(chunk);
	}, [cardbox, cardsData, from, chunkType, side, to]);

	if (searchParams.size === 0) {
		setTimeout(() => {
			navigate('/run'); // error by navigate, prevent throttling
		}, 200);
		return;
	}

	if (isLoading || isCardboxLoading) {
		return <WaitGlobal text={'Loading data...'}/>;
	}

	if (cardboxError || !cardbox) {
		return <PageNotFound message={`Card box #${cardboxId} not found`}/>;
	}

	if (cardsError || !cardsData) {
		return <PageNotFound message={`Card box #${cardboxId} not found`}/>;
	}

	if (cardsData.length === 0) {
		return <PageNotFound message={`Card box #${cardboxId} has no cards`}/>;
	}

	if (isNaN(from) || isNaN(to) || isNaN(side) || from > to || from < 0 || to < 0 || to >= cardsData.length) {
		// console.log('isNaN(from)', isNaN(from))
		// console.log('isNaN(to)', isNaN(to))
		// console.log('isNaN(side)', isNaN(side))
		// console.log('from > to', from > to)
		// console.log('from < 0', from < 0)
		// console.log('to < 1', to < 1)
		// console.log('to >= cardbox.cards!.length', to >= cardbox.cards!.length)
		throw new PageError('Bad parameters. Please, correct and run again.', 'Error');
	}

	if (side < -1 || side >= 2) {
		throw new PageError('Bad side. Please, correct and run again.', 'Error');
	}

	if (order !== 'random' && order !== 'linear') {
		throw new PageError('Bad order. Please, correct and run again.', 'Error');
	}

	if (chunkType !== 'random' && chunkType !== 'exact') {
		throw new PageError('Bad chunk type. Please, correct and run again.', 'Error');
	}

	if (!cards || cards.length === 0) {
		return <WaitInline text={'Preparing data...'}/>;
	}

	console.log('cardbox', params.cardboxId);
	console.log('from', from, 'to', to, 'number', to - from + 1);
	console.log('side', side);
	console.log('order', order);
	console.log('chunk', chunkType);
	console.log('data', cards);

	return <AppPage title={'Run'}>
		<div className={'page-32'}>
			{cards && cards.length > 0 && <div className={'scene-wrapper'}>
				<BackToRunButton/>
				<SceneInfoButton info={<div>
					<h3>Session Info</h3>
					<p>
						<b>Card Box:</b> {cardbox.title}
						{cardbox.author && ' by ' + cardbox.author}
					</p>
					<p>
						<b>Cards: </b> {from + 1}..{to + 1} ({cards.length})
					</p>
					<p>
						<b>Primary
							side:</b> {side === -1 ? 'random' : cardbox[`side${side + 1}title` as TSCardboxKey] as string}
					</p>
					<p>
						<b>Order:</b> {order}
					</p>
				</div>}/>

				<div className={'scene-content'}>
					<SessionStage
						onDone={handleDone}
						side={side}
						cards={cards}/>
				</div>
			</div>}
		</div>
	</AppPage>;
};
