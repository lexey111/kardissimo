import React from "react";

import {HomePage} from "./pages/home-page.tsx";
import {FaqPage} from "./pages/faq-page.tsx";
import {CardboxesListSubpage} from "./pages/cardbox/sub-pages/list/cardbox-list.subpage.tsx";
import {CardboxPages} from "./pages/cardbox-pages.tsx";
import {CardboxCardsSubpage} from "./pages/cardbox/sub-pages/cards/cardbox-cards.subpage.tsx";
import {CardboxCardSubpage} from "./pages/cardbox/sub-pages/cards/cardbox-card.subpage.tsx";
import {App} from "./app.tsx";
import {useRouteError} from "react-router";
import {PageNotFound} from "./components/utils/page-not-found.component.tsx";
import {RunPage} from "./pages/run-page.tsx";
import {SessionPage} from "./pages/session-page.tsx";
import {LoginPage} from "./pages/login-page.tsx";
import {CardboxDetailsData} from "./pages/cardbox/sub-pages/cardbox/cardbox-details.data.tsx";

const ErrorBoundary: React.FC = () => {
	const error = useRouteError();
	console.log(error);
	// @ts-ignore
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
					path: 'faq',
					element: <FaqPage/>
				},
				{
					path: 'login',
					handle: 'Login',
					element: <LoginPage/>
				},
				{
					path: 'run',
					handle: 'Run',
					element: <RunPage/>,
				},
				{
					path: 'session/:cardboxId',
					handle: 'Session',
					element: <SessionPage/>,
				},
				{
					path: '/cardboxes',
					handle: 'List',
					element: <CardboxesListSubpage/>,
				},
				{
					path: '/cardboxes/*',
					element: <CardboxPages/>,
					children: [
						{
							path: ':cardboxId/details',
							handle: 'Details',
							element: <CardboxDetailsData/>
						},
						{
							path: ':cardboxId/cards',
							handle: 'Cards',
							element: <CardboxCardsSubpage/>
						},
						{
							path: ':cardboxId/cards/:cardId',
							handle: 'Card',
							element: <CardboxCardSubpage/>
						},
					]
				}
			]
		}
	]
;
