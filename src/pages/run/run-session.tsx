import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useExclusiveHook} from "../../components/utils/useExclusive.hook.tsx";
import {getCollection} from "../../store/data/collections-store.selectors.ts";
import {PageError} from "../../types.ts";
import {Scene} from "../../components/3d/scene-component.tsx";
import {BackToRunButton} from "./back-to-run.button.component.tsx";

export const RunSession: React.FC = () => {
	const navigate = useNavigate();
	let [searchParams] = useSearchParams();
	const params = useParams();
	const collection = getCollection(params.collectionId);
	useExclusiveHook();

	if (searchParams.size === 0) {
		setTimeout(() => {
			navigate('/run'); // error by navigate, prevent throttling
		}, 200);
		return;
	}

	if (!collection) {
		throw new PageError('Unfortunately, there is no collection with given ID.', 'Oops');
	}
	if (!collection.cards) {
		throw new PageError('Unfortunately, collection is not ready to start yet.', 'Empty collection');
	}
	if (!collection.sides) {
		throw new PageError('Unfortunately, collection is not ready to start yet.', 'Wrong Sides');
	}

	const from = Number(searchParams?.get('from'));
	const to = Number(searchParams?.get('to'));
	const order = searchParams?.get('order');
	const piece = searchParams?.get('piece');
	const side = Number(searchParams?.get('side'));

	if (isNaN(from) || isNaN(to) || isNaN(side) || from > to || from < 0 || to < 1 || to >= collection.cards!.length) {
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

	const facesData = {
		id: 'none', sides: [
			{
				header: collection.cards?.[0].sides?.[0]?.header || '',
				word: collection.cards?.[0].sides?.[0]?.word || '',
				footer: collection.cards?.[0].sides?.[0]?.footer || '',
			},
			{
				header: collection.cards?.[0].sides?.[1]?.header || '',
				word: collection.cards?.[0].sides?.[1]?.word || '',
				footer: collection.cards?.[0].sides?.[1]?.footer || '',
			},
		],
		collectionSides: collection.sides
	};

	return <AppPage title={'Run'}>
		<div className={'sub-page'}>
			<div className={'scene-wrapper'}>
				<BackToRunButton/>
				<div className={'scene-content'}>
					<div className={'scene-main'}>
						<Scene card={facesData} side={side}/>
					</div>
				</div>
			</div>
		</div>
	</AppPage>;
};
