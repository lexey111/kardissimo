import React from "react";

import {AboutPage} from "./pages/about-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {ScenePage} from "./pages/scene-page.tsx";
import {useRoutes} from "react-router";
import {useLocation} from "react-router-dom";
import {CollectionCards} from "./pages/collection/sub-pages/cards/collection-cards.tsx";
import {CollectionCardEdit} from "./pages/collection/sub-pages/cards/collection-card.edit.tsx";
import {CollectionsListPage} from "./pages/collection/sub-pages/collections-list.page.tsx";
import {CollectionDetails} from "./pages/collection/sub-pages/collection.details.tsx";
import {CollectionOverview} from "./pages/collection/sub-pages/collection.overview.tsx";
import {CollectionPage} from "./pages/collection/collection.page.tsx";
import {CollectionStat} from "./pages/collection/sub-pages/collection.stat.tsx";
import {CollectionAppearance} from "./pages/collection/sub-pages/collection.appearance.tsx";
import {AnimatePresence} from "framer-motion";

export const App: React.FC = () => {
	const element = useRoutes([
		{
			path: '/',
			element: <HomePage/>
		},
		{
			path: '/about',
			element: <AboutPage/>
		},
		{
			path: '/scene',
			element: <ScenePage/>
		},
		{
			path: '/collections',
			element: <CollectionsListPage/>,
		},
		{
			path: '/collections',
			element: <CollectionPage/>,
			children: [
				{
					path: ':id/overview',
					//name: 'overview',
					element: <CollectionOverview/>
				},
				{
					path: ':id/details',
					element: <CollectionDetails/>
				},
				{
					path: ':id/appearance',
					element: <CollectionAppearance/>
				},
				{
					path: ':id/stat',
					element: <CollectionStat/>
				},
				{
					path: ':id/cards',
					element: <CollectionCards/>
				},
				{
					path: ':id/cards/:cardId',
					element: <CollectionCardEdit/>
				},
			]
		},
	]);

	const location = useLocation();
	if (!element) return null;

	return (
		<AnimatePresence mode='wait' initial={false}>
			{React.cloneElement(element, {key: location.pathname})}
		</AnimatePresence>
	);
};
