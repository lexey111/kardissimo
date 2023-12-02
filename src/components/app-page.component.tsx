import React, {useEffect} from "react";
import {matchRoutes} from "react-router";
import {AppRoutes} from "../routes.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthQuery} from "./hooks/useAuthHook.ts";

export type TAppPageProps = {
	title?: string
	authOnly?: boolean
	children: any
}

export const AppPage: React.FC<TAppPageProps> = ({title, authOnly = true, children}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentRouteTitle = (matchRoutes(AppRoutes, location)?.pop() as any)?.route?.['handle'];
	const {data: userData} = useAuthQuery();

	useEffect(() => {
		if (!userData.id && authOnly) {
			navigate('/home');
		}
	}, [userData]);

	if (title) {
		window.document.title = title + (currentRouteTitle ? ' | ' + currentRouteTitle : '');
	} else {
		window.document.title = 'Kardissimo';
	}

	return <div className='app-page-wrapper'>
		<div className={'app-page-content'}>
			{children}
		</div>
	</div>;
};
