import React from "react";

import {HomePage} from "./pages/home-page.tsx";
import {AboutPage} from "./pages/about-page.tsx";
import {CollectionsListSubpage} from "./pages/collection/sub-pages/list/collections-list.subpage.tsx";
import {CollectionPage} from "./pages/collection-page.tsx";
import {CollectionDetailsSubpage} from "./pages/collection/sub-pages/collection/collection-details.subpage.tsx";
import {CollectionCardsSubpage} from "./pages/collection/sub-pages/cards/collection-cards.subpage.tsx";
import {CollectionCardSubpage} from "./pages/collection/sub-pages/cards/collection-card.subpage.tsx";
import {App} from "./app.tsx";
import {useRouteError} from "react-router";
import {PageNotFound} from "./components/utils/page-not-found.component.tsx";
import {RunPage} from "./pages/run-page.tsx";
import {SessionPage} from "./pages/session-page.tsx";

const ErrorBoundary: React.FC = () => {
	const error: any = useRouteError();
	return <PageNotFound message={error.message} header={error.header}/>;
}

export const AppRoutes = [

		{
			path: '/',
			element: <App/>,
			errorElement: <ErrorBoundary/>,
			children: [
				{
					path: '',
					index: true,
					element: <HomePage/>
				},
				{
					path: 'home',
					index: true,
					element: <HomePage/>
				},
				{
					path: 'about',
					element: <AboutPage/>
				},
				{
					path: 'run',
					handle: 'Run',
					element: <RunPage/>,
				},
				{
					path: 'session/:collectionId',
					handle: 'Session',
					element: <SessionPage/>,
				},
				{
					path: '/collections',
					handle: 'List',
					element: <CollectionsListSubpage/>,
				},
				{
					path: '/collections/*',
					element: <CollectionPage/>,
					children: [
						{
							path: ':collectionId/details',
							handle: 'Details',
							element: <CollectionDetailsSubpage/>
						},
						{
							path: ':collectionId/cards',
							handle: 'Cards',
							element: <CollectionCardsSubpage/>
						},
						{
							path: ':collectionId/cards/:cardId',
							handle: 'Card',
							element: <CollectionCardSubpage/>
						},
					]
				}
			]
		}
	]
;
