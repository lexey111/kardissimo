import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {Outlet, useParams} from "react-router-dom";
import {getCollection} from "../../store/data/collections-store.selectors.ts";

export const CollectionPage: React.FC = () => {
	const params = useParams();
	const collectionId = params.id;
	const isNew = collectionId === 'new';

	const collection = isNew ? null : getCollection(params.id);

	if (!isNew && !collection) {
		throw new Error('Collection not found');
	}

	if (params.cardId && params.cardId !== 'new') {
		const card = collection!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			// const wasNew = searchParams.get('from-new') !== null;
			// if (wasNew) {
			// 	return null;
			// }
			throw new Error('Card not found');
		}
	}
	// mostly - guard
	return <AppPage title={'Collection'}>
		<div className={'sub-page'}>
			<Outlet/>
		</div>
	</AppPage>;
};
