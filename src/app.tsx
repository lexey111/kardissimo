import React, {useEffect} from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {getSessionAndUser, resetSession} from "./store/auth/auth-store.actions.ts";

export const App: React.FC = () => {
	useEffect(() => {
		try {
			void getSessionAndUser();
		} catch (e) {
			resetSession();
		}
	}, []);

	return <>
		<AppMenu/>
		<div className="app-page" style={{display: 'flex', width: '100%', height: '100%'}}>
			<Outlet/>
		</div>

		<ScrollRestoration
			getKey={(location) => {
				return location.pathname;
			}}
		/>
		<AppFooter/>
	</>;
};
