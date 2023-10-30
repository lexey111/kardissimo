import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../components/utils/useExclusive.hook.tsx";
import {getCollection} from "../store/data/collections-store.selectors.ts";
import {PageError} from "../types.ts";
import {SessionStage} from "./session/session-stage.tsx";
import {BackToRunButton} from "./run/back-to-run.button.component.tsx";
import {SceneInfoButton} from "./run/scene-info.button.component.tsx";
import {TCardSide, TCollectionSide, TPreparedCard, TPreparedCards} from "../store/data/types.ts";

function getDirectOrder(id: string, sides: Array<TCardSide>, collectionSides: Array<TCollectionSide>): TPreparedCard {
	const result = [];
	// as is, 0 is the first
	for (let i = 0; i < sides.length; i++) {
		result.push({id, ...sides[i], ...collectionSides[i]})
	}
	return result;
}

function getReverseOrder(id: string, sides: Array<TCardSide>, collectionSides: Array<TCollectionSide>): TPreparedCard {
	const result = [];
	// as is, 0 is the first
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

export const SessionPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const params = useParams();
	const collection = getCollection(params.collectionId);
	const from = Number(searchParams?.get('from'));
	const to = Number(searchParams?.get('to'));
	const order = searchParams?.get('order');
	const piece = searchParams?.get('piece');
	const side = Number(searchParams?.get('side'));

	useExclusiveHook(); // hide menu

	if (searchParams.size === 0) {
		setTimeout(() => {
			navigate('/run'); // error by navigate, prevent throttling
		}, 200);
		return;
	}

	console.log('collection', params.collectionId);
	console.log('from', from, 'to', to, 'number', to - from + 1);
	console.log('side', side);
	console.log('order', order);
	console.log('piece', piece);

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

	if (piece !== 'random' && piece !== 'exact') {
		throw new PageError('Bad chunk type. Please, correct and run again.', 'Error');
	}

	const cards: TPreparedCards = [];
	for (let i = from; i <= to; i++) {
		// TODO: random chunk, solid chunks for simple and advanced modes
		cards.push(swapAndEnrichSides(collection.cards[i].id, collection.cards[i].sides!, collection.sides, side));
	}
	// SessionPage: input check, prepare working set of cards, entire page object with navigation
	// SessionStage: holds set of cards, navigate left-right, card rotation control
	// SessionScene: displays the current 3D card, translate side-change callback back to Stage
	console.log('cards', cards.length)
	console.log(cards)

	return <AppPage title={'Run'}>
		<div className={'sub-page'}>
			<div className={'scene-wrapper'}>
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
						side={side}
						cards={cards}/>
				</div>
			</div>
		</div>
	</AppPage>;
};
