import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {Outlet, useParams, useSearchParams} from "react-router-dom";
import {getCollection} from "../../store/data/collections-store.selectors.ts";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {CollectionMenu} from "./sub-pages/collection-menu.component.tsx";
import {createPortal} from "react-dom";
import {AppPageHeader} from "../../components/app-page-header.component.tsx";

export const CollectionPage: React.FC = () => {
	const params = useParams()
	const collection = getCollection(params.id)

	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	if (!collection) {
		return <CollectionNotFound/>;
	}

	if (params.cardId) {
		const card = collection!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			return <CollectionNotFound/>;
		}
	}


	return <AppPage title={'Collection page'} showMenu={false}>
		{createPortal(<CollectionMenu exclusiveLock={isNew}/>, document.getElementById('root')!)}
		{/*<h1>{collection.title}</h1>*/}
		<AppPageHeader
			title={collection.title!}
			subtitle={'Welcome here! How do you do?'}
		/>

		<div className={'sub-page'}>
			<Outlet/>
		</div>
	</AppPage>;
};
