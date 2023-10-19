import React from "react";
import {matchRoutes} from "react-router";
import {AppRoutes} from "../routes.tsx";
import {useLocation} from "react-router-dom";

export type TAppPageProps = {
	title?: string
	children: any
	header?: JSX.Element
}

export const AppPage: React.FC<TAppPageProps> = ({title, children}) => {
	const location = useLocation();
	const currentRouteTitle = (matchRoutes(AppRoutes, location)?.pop() as any)?.route?.['handle'];

	if (title) {
		window.document.title = title + (currentRouteTitle ? ' | ' + currentRouteTitle : '');
	} else {
		window.document.title = 'My Cool App';
	}

	return <div className='app-page-wrapper'>
		<div className={'app-page-content'}>
			{children}
		</div>
	</div>;
};
