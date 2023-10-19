import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {Outlet, useParams, useSearchParams} from "react-router-dom";
import {getCollection} from "../../store/data/collections-store.selectors.ts";

export const CollectionPage: React.FC = () => {
	const params = useParams();
	const collection = getCollection(params.id);

	const [searchParams] = useSearchParams();

	if (!collection) {
		throw new Error('Collection not found');
	}

	if (params.cardId) {
		const card = collection!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			const wasNew = searchParams.get('from-new') !== null;
			if (wasNew) {
				return null;
			}
			throw new Error('Card not found');
		}
	}

	return <AppPage title={'Collection'}>
		<div className={'sub-page'}>
			<Outlet/>
		</div>
	</AppPage>;
};
