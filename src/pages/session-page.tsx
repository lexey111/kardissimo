import React, {useCallback, useEffect, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../hooks/useExclusive.hook.tsx";
import {PageError} from "../types.ts";
import {SessionStage} from "./session/session-stage.tsx";
import {BackToRunButton} from "./run/back-to-run.button.component.tsx";
import {SceneInfoButton} from "./run/scene-info.button.component.tsx";
import {Fonts} from "../resources/fonts.ts";

function getDirectOrder(id: string, sides: Array<TCardSide>, cardboxSides: Array<TCardboxSide>): TPreparedCard {
	const result = [];
	for (let i = 0; i < sides.length; i++) {
		result.push({id, ...sides[i], ...cardboxSides[i]})
	}
	return result;
}

function getReverseOrder(id: string, sides: Array<TCardSide>, cardboxSides: Array<TCardboxSide>): TPreparedCard {
	const result = [];
	for (let i = sides.length - 1; i >= 0; i--) {
		result.push({id, ...sides[i], ...cardboxSides[i]})
	}
	return result;
}

function swapAndEnrichSides(id: string, sides: Array<TCardSide>, cardboxSides: Array<TCardboxSide>, side: number): TPreparedCard {
	if (side === 0) {
		return getDirectOrder(id, sides, cardboxSides);
	}

	if (side === 1) {
		return getReverseOrder(id, sides, cardboxSides);
	}

	return Math.random() > 0.5
		? getDirectOrder(id, sides, cardboxSides)
		: getReverseOrder(id, sides, cardboxSides);
}

function getCardDesign(cardbox: TCardbox, cardIdx: number) {
	let design: any = [...cardbox.sides!];

	if (cardbox.cards![cardIdx].ownDesign) {
		design = cardbox.cards![cardIdx].sides!.map((side, idx) => {
			if (side.appearance) {
				return {
					name: cardbox.sides?.[idx]?.name,
					color: side.appearance.color || cardbox.sides?.[idx]?.color || '#FDBA66',
					textColor: side.appearance.textColor || cardbox.sides?.[idx]?.textColor || '#2b3b62',
					fontSize: side.appearance.fontSize || cardbox.sides?.[idx]?.fontSize || 'M',
					fontName: side.appearance.fontName || cardbox.sides?.[idx]?.fontName || Object.keys(Fonts)[0],
				}
			}
			return cardbox.sides![idx];
		});
	}
	return design;
}

function getExactChunk(cardbox: TCardbox, from: number, to: number, side: number) {
	const result = [];

	for (let i = from; i <= to; i++) {
		const design = getCardDesign(cardbox, i);
		result.push(swapAndEnrichSides(cardbox.cards![i].id, cardbox.cards![i].sides!, design, side));
	}

	return result;
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomChunk(cardbox: TCardbox, amount: number, side: number) {
	const result = [];
	const usedIdx: Array<number> = [];
	const max = cardbox.cards!.length;

	if (amount > max) {
		throw new PageError('Invalid random chunk params', 'Oops');
	}

	while (result.length < amount) {
		const idx = getRandomInt(0, max);
		if (usedIdx.includes(idx)) {
			continue;
		}
		usedIdx.push(idx);
		const design = getCardDesign(cardbox, idx);
		result.push(swapAndEnrichSides(cardbox.cards![idx].id, cardbox.cards![idx].sides!, design, side));
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
	const cardbox = getCardbox(params.cardboxId);
	const from = Number(searchParams?.get('from'));
	const to = Number(searchParams?.get('to'));
	const order = searchParams?.get('order');
	const chunkType = searchParams?.get('chunk');
	const side = Number(searchParams?.get('side'));

	console.log('cardbox', params.cardboxId);
	console.log('from', from, 'to', to, 'number', to - from + 1);
	console.log('side', side);
	console.log('order', order);
	console.log('chunk', chunkType);

	useExclusiveHook(); // hide menu

	const [cards, setCards] = useState<TPreparedCards>([]);

	const handleDone = useCallback(() => {
		navigate('/run'); // error by navigate, prevent throttling
	}, []);

	useEffect(() => {
		if (!cardbox) {
			return;
		}

		let chunk: TPreparedCards = [];
		if (chunkType === 'exact') {
			chunk = getExactChunk(cardbox!, from, to, side);
			if (order === 'random') {
				chunk = shuffle(chunk);
			}
		}

		if (chunkType === 'random') {
			chunk = getRandomChunk(cardbox!, to - from + 1, side);
		}

		setCards(chunk);
	}, [cardbox, from, chunkType, side, to]);

	if (searchParams.size === 0) {
		setTimeout(() => {
			navigate('/run'); // error by navigate, prevent throttling
		}, 200);
		return;
	} else {
		if (!cardbox) {
			throw new PageError('Unfortunately, there is no cardbox with given ID.', 'Oops');
		}
		if (!cardbox.cards) {
			throw new PageError('Unfortunately, card box is not ready to start yet.', 'Empty cardbox');
		}
		if (!cardbox.sides) {
			throw new PageError('Unfortunately, card box is not ready to start yet.', 'Wrong Sides');
		}

		if (isNaN(from) || isNaN(to) || isNaN(side) || from > to || from < 0 || to < 0 || to >= cardbox.cards!.length) {
			// console.log('isNaN(from)', isNaN(from))
			// console.log('isNaN(to)', isNaN(to))
			// console.log('isNaN(side)', isNaN(side))
			// console.log('from > to', from > to)
			// console.log('from < 0', from < 0)
			// console.log('to < 1', to < 1)
			// console.log('to >= cardbox.cards!.length', to >= cardbox.cards!.length)
			throw new PageError('Bad parameters. Please, correct and run again.', 'Error');
		}

		if (side < -1 || side >= cardbox.sides!.length) {
			throw new PageError('Bad side. Please, correct and run again.', 'Error');
		}

		if (order !== 'random' && order !== 'linear') {
			throw new PageError('Bad order. Please, correct and run again.', 'Error');
		}

		if (chunkType !== 'random' && chunkType !== 'exact') {
			throw new PageError('Bad chunk type. Please, correct and run again.', 'Error');
		}
	}

	return <AppPage title={'Run'}>
		<div className={'page-32'}>
			{cards && cards.length > 0 && <div className={'scene-wrapper'}>
				<BackToRunButton/>
				<SceneInfoButton info={<div>
					<h3>Session Info</h3>
					<p>
						<b>Cardbox:</b> {cardbox.title}
						{cardbox.author && ' by ' + cardbox.author}
					</p>
					<p>
						<b>Cards: </b> {from + 1}..{to + 1} ({cards.length})
					</p>
					<p>
						<b>Primary side:</b> {side === -1 ? 'random' : cardbox.sides[side].name}
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
