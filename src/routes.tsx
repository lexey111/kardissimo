import {HomePage} from "./pages/home-page.tsx";
import {AboutPage} from "./pages/about-page.tsx";
import {ScenePage} from "./pages/scene-page.tsx";
import {CollectionsListPage} from "./pages/collection/sub-pages/collections-list.page.tsx";
import {CollectionPage} from "./pages/collection/collection.page.tsx";
import {CollectionOverview} from "./pages/collection/sub-pages/collection.overview.tsx";
import {CollectionDetails} from "./pages/collection/sub-pages/collection.details.tsx";
import {CollectionStat} from "./pages/collection/sub-pages/collection.stat.tsx";
import {CollectionCards} from "./pages/collection/sub-pages/collection.cards.tsx";
import {CollectionCardEdit} from "./pages/collection/sub-pages/cards/collection-card.edit.tsx";
import {App} from "./app.tsx";
import {useRouteError} from "react-router";
import {PageNotFound} from "./components/utils/page-not-found.component.tsx";
import React from "react";

const ErrorBoundary: React.FC = () => {
	const error = useRouteError();
	console.log('ERROR');
	console.error(error);

	return <PageNotFound/>;
}

export const AppRoutes = [

	{
		path: '/',
		element: <App/>,
		errorElement: <ErrorBoundary/>,
		children: [
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
				path: '/scene',
				element: <ScenePage/>
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
						path: ':id/overview',
						handle: 'Overview',
						element: <CollectionOverview/>
					},
					{
						path: ':id/details',
						handle: 'Details',
						element: <CollectionDetails/>
					},
					{
						path: ':id/stat',
						handle: 'Stats',
						element: <CollectionStat/>
					},
					{
						path: ':id/cards',
						handle: 'Cards',
						element: <CollectionCards/>
					},
					{
						path: ':id/cards/:cardId',
						handle: 'Card',
						element: <CollectionCardEdit/>
					},
				]
			}
		]
	}
];
