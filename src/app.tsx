import React, {useEffect} from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {getSessionAndUser, resetSession} from "./store/auth/auth-store.actions.ts";
import {useSettingsStore} from "./store/settings/settings-store.ts";
import {WaitCredentials} from "./components/utils/wait-credentials.component.tsx";

export const App: React.FC = () => {
	const isBusy = useSettingsStore((state) => state?.busy);

	useEffect(() => {
		try {
			void getSessionAndUser();
		} catch (e) {
			resetSession();
		}
	}, []);

	useEffect(() => {
		if (!isBusy) {
			document.body.classList.add('ready');
		}
	}, [isBusy]);

	if (isBusy) {
		return <WaitCredentials/>;
	}

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
