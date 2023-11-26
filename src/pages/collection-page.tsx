import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Outlet, useParams} from "react-router-dom";
import {getCollection} from "../store/data/collections-store.selectors.ts";
import {useExclusiveHook} from "../components/hooks/useExclusive.hook.tsx";
import {CollectionHeader} from "./collection/collection-header.component.tsx";

export const CollectionPage: React.FC = () => {
	const params = useParams();
	const collectionId = params.collectionId;
	const isNew = collectionId === 'new';

	const collection = isNew ? null : getCollection(params.collectionId);

	useExclusiveHook();

	if (!isNew && !collection) {
		throw new Error('Collection not found');
	}

	if (params.cardId && params.cardId !== 'new') {
		const card = collection!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			throw new Error('Card not found');
		}
	}

	// mostly - guard
	return <>
		<CollectionHeader/>
		<AppPage title={'Collection'}>
			<Outlet/>
		</AppPage>
	</>;
};
