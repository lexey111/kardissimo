import React, {useEffect, useState} from "react";
import {matchRoutes} from "react-router";
import {AppRoutes} from "../routes.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {IAuthState, useAuthStore} from "../store/auth/auth-store.ts";
import {getSessionAndUser} from "../store/auth/auth-store.actions.ts";
import {WaitCredentials} from "./wait-credentials.component.tsx";

export type TAppPageProps = {
	title?: string
	authOnly?: boolean
	children: any
}

const userSelector = (state: IAuthState) => state;
export const AppPage: React.FC<TAppPageProps> = ({title, authOnly = true, children}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentRouteTitle = (matchRoutes(AppRoutes, location)?.pop() as any)?.route?.['handle'];
	const user = useAuthStore(userSelector);
	const [authChecked, setAuthChecked] = useState(!authOnly || !!user.loginData.id);

	useEffect(() => {
		if (!user.loginData.id && authOnly && authChecked) {
			navigate('/home');
		}
	}, [user.loginData, authChecked]);

	useEffect(() => {

		if (authOnly && !authChecked) {
			(async () => {
				await getSessionAndUser();
				setAuthChecked(true);
			})();
		}
	}, []);

	if (title) {
		window.document.title = title + (currentRouteTitle ? ' | ' + currentRouteTitle : '');
	} else {
		window.document.title = 'My Cool App';
	}

	return <div className='app-page-wrapper'>
		{!authChecked && <WaitCredentials/>}
		<div className={'app-page-content'}>
			{authChecked && children}
		</div>
	</div>;
};
