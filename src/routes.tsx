import React from "react";

import {HomePage} from "./pages/home-page.tsx";
import {AboutPage} from "./pages/about-page.tsx";
import {CollectionsListPage} from "./pages/collections-list.page.tsx";
import {CollectionPage} from "./pages/collection/collection.page.tsx";
import {CollectionDetails} from "./pages/collection/sub-pages/collection/collection.details.tsx";
import {CollectionCards} from "./pages/collection/sub-pages/cards/collection.cards.tsx";
import {CollectionCardEdit} from "./pages/collection/sub-pages/cards/collection-card.edit.tsx";
import {App} from "./app.tsx";
import {useRouteError} from "react-router";
import {PageNotFound} from "./components/utils/page-not-found.component.tsx";
import {RunPage} from "./pages/run.page.tsx";

const ErrorBoundary: React.FC = () => {
	const error: any = useRouteError();
	console.log('ERROR');
	console.error(error);

	if (error?.header) {
		console.log('HAS HEADER', error.header);
	}

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
				path: '/run',
				handle: 'Run',
				element: <RunPage/>,
			},
			{
				path: '/collections',
				handle: 'List',
				element: <CollectionsListPage/>,
			},
			{
				path: '/collections/*',
				element: <CollectionPage/>,
				children: [
					{
						path: ':collectionId/details',
						handle: 'Details',
						element: <CollectionDetails/>
					},
					{
						path: ':collectionId/cards',
						handle: 'Cards',
						element: <CollectionCards/>
					},
					{
						path: ':collectionId/cards/:cardId',
						handle: 'Card',
						element: <CollectionCardEdit/>
					},
				]
			}
		]
	}
];
