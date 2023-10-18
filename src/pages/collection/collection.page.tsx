import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {Outlet, useParams, useSearchParams} from "react-router-dom";
import {getCollection} from "../../store/data/collections-store.selectors.ts";
import {PageNotFound} from "../../components/utils/page-not-found.component.tsx";
import {CollectionMenu} from "./sub-pages/collection-menu.component.tsx";
import {createPortal} from "react-dom";
import {Header} from "../../components/header.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";

export const CollectionPage: React.FC = () => {
	const params = useParams()
	const collection = getCollection(params.id)

	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	if (!collection) {
		return <PageNotFound/>;
	}

	if (params.cardId) {
		const card = collection!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			return <PageNotFound/>;
		}
	}

	return <AppPage title={'Collection - '}
	                header={<Header
		                hasBack={true}
		                title={collection.title!}
		                image={<CollectionScene/>}
	                />}
	                sideTransition={true}>
		{createPortal(<CollectionMenu exclusiveLock={isNew}/>, document.getElementById('root')!)}

		<div className={'sub-page'}>
			<Outlet/>
		</div>
	</AppPage>;
};
