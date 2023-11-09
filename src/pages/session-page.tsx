import React, {useCallback, useEffect, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../components/hooks/useExclusive.hook.tsx";
import {getCollection} from "../store/data/collections-store.selectors.ts";
import {PageError} from "../types.ts";
import {SessionStage} from "./session/session-stage.tsx";
import {BackToRunButton} from "./run/back-to-run.button.component.tsx";
import {SceneInfoButton} from "./run/scene-info.button.component.tsx";
import {TCardSide, TCollection, TCollectionSide, TPreparedCard, TPreparedCards} from "../store/data/types.ts";
import {Fonts} from "../resources/fonts.ts";

function getDirectOrder(id: string, sides: Array<TCardSide>, collectionSides: Array<TCollectionSide>): TPreparedCard {
	const result = [];
	for (let i = 0; i < sides.length; i++) {
		result.push({id, ...sides[i], ...collectionSides[i]})
	}
	return result;
}

function getReverseOrder(id: string, sides: Array<TCardSide>, collectionSides: Array<TCollectionSide>): TPreparedCard {
	const result = [];
	for (let i = sides.length - 1; i >= 0; i--) {
		result.push({id, ...sides[i], ...collectionSides[i]})
	}
	return result;
}

function swapAndEnrichSides(id: string, sides: Array<TCardSide>, collectionSides: Array<TCollectionSide>, side: number): TPreparedCard {
	if (side === 0) {
		return getDirectOrder(id, sides, collectionSides);
	}

	if (side === 1) {
		return getReverseOrder(id, sides, collectionSides);
	}

	return Math.random() > 0.5
		? getDirectOrder(id, sides, collectionSides)
		: getReverseOrder(id, sides, collectionSides);
}

function getCardDesign(collection: TCollection, cardIdx: number) {
	let design: any = [...collection.sides!];

	if (collection.cards![cardIdx].ownDesign) {
		design = collection.cards![cardIdx].sides!.map((side, idx) => {
			if (side.appearance) {
				return {
					name: collection.sides?.[idx]?.name,
					color: side.appearance.color || collection.sides?.[idx]?.color || '#FDBA66',
					textColor: side.appearance.textColor || collection.sides?.[idx]?.textColor || '#2b3b62',
					fontSize: side.appearance.fontSize || collection.sides?.[idx]?.fontSize || 'M',
					fontName: side.appearance.fontName || collection.sides?.[idx]?.fontName || Object.keys(Fonts)[0],
				}
			}
			return collection.sides![idx];
		});
	}
	return design;
}

function getExactChunk(collection: TCollection, from: number, to: number, side: number) {
	const result = [];

	for (let i = from; i <= to; i++) {
		const design = getCardDesign(collection, i);
		result.push(swapAndEnrichSides(collection.cards![i].id, collection.cards![i].sides!, design, side));
	}

	return result;
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomChunk(collection: TCollection, amount: number, side: number) {
	const result = [];
	const usedIdx: Array<number> = [];
	const max = collection.cards!.length;

	if (amount > max - 1) {
		throw new PageError('Invalid random chunk params', 'Oops');
	}

	while (result.length < amount) {
		const idx = getRandomInt(0, max);
		if (usedIdx.includes(idx)) {
			continue;
		}
		usedIdx.push(idx);
		const design = getCardDesign(collection, idx);
		result.push(swapAndEnrichSides(collection.cards![idx].id, collection.cards![idx].sides!, design, side));
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
	const collection = getCollection(params.collectionId);
	const from = Number(searchParams?.get('from'));
	const to = Number(searchParams?.get('to'));
	const order = searchParams?.get('order');
	const chunkType = searchParams?.get('chunk');
	const side = Number(searchParams?.get('side'));

	console.log('collection', params.collectionId);
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
		if (!collection) {
			return;
		}

		let chunk: TPreparedCards = [];
		if (chunkType === 'exact') {
			chunk = getExactChunk(collection!, from, to, side);
			if (order === 'random') {
				chunk = shuffle(chunk);
			}
		}

		if (chunkType === 'random') {
			chunk = getRandomChunk(collection!, to - from + 1, side);
		}

		setCards(chunk);
	}, [collection, from, chunkType, side, to]);

	if (searchParams.size === 0) {
		setTimeout(() => {
			navigate('/run'); // error by navigate, prevent throttling
		}, 200);
		return;
	} else {
		if (!collection) {
			throw new PageError('Unfortunately, there is no collection with given ID.', 'Oops');
		}
		if (!collection.cards) {
			throw new PageError('Unfortunately, collection is not ready to start yet.', 'Empty collection');
		}
		if (!collection.sides) {
			throw new PageError('Unfortunately, collection is not ready to start yet.', 'Wrong Sides');
		}

		if (isNaN(from) || isNaN(to) || isNaN(side) || from > to || from < 0 || to < 0 || to >= collection.cards!.length) {
			// console.log('isNaN(from)', isNaN(from))
			// console.log('isNaN(to)', isNaN(to))
			// console.log('isNaN(side)', isNaN(side))
			// console.log('from > to', from > to)
			// console.log('from < 0', from < 0)
			// console.log('to < 1', to < 1)
			// console.log('to >= collection.cards!.length', to >= collection.cards!.length)
			throw new PageError('Bad parameters. Please, correct and run again.', 'Error');
		}

		if (side < -1 || side >= collection.sides!.length) {
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
		<div className={'sub-page'}>
			{cards && cards.length > 0 && <div className={'scene-wrapper'}>
				<BackToRunButton/>
				<SceneInfoButton info={<div>
					<h3>Session Info</h3>
					<p>
						<b>Collection:</b> {collection.title}
						{collection.author && ' by ' + collection.author}
					</p>
					<p>
						<b>Cards: </b> {from + 1}..{to + 1} ({cards.length})
					</p>
					<p>
						<b>Primary side:</b> {side === -1 ? 'random' : collection.sides[side].name}
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
