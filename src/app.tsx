import React, {useEffect, useState} from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {WaitCredentials} from "./components/utils/wait-credentials.component.tsx";
import {Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSettingsQuery} from "./components/hooks/useSettingsHook.tsx";
import {Appearances} from "./resources/appearance.ts";
import {assignGlobalStyles} from "./store/settings/settings-utils.ts";
import {useAuthQuery} from "./components/hooks/useAuthHook.tsx";

let lastTheme = localStorage.getItem('lastUsedTheme');
if (!lastTheme || !Appearances.find(ap => ap.id === lastTheme)) {
	lastTheme = 'default';
}
assignGlobalStyles(lastTheme);

export const App: React.FC = () => {
	const [busy, setBusy] = useState(true);
	const {data: appState} = useSettingsQuery();
	const {isLoading: userLoading, data: userData} = useAuthQuery();

	useEffect(() => {
		console.log('User loading', userLoading)
		console.log('User data', userData)
		if (!userLoading) {
			setBusy(false);
		}
	}, [userLoading, userData]);

	// useEffect(() => {
	// 	try {
	// 		void getSessionAndUser();
	// 		setBusy(false);
	// 	} catch (e) {
	// 		resetSession();
	// 		setBusy(false);
	// 	}
	// }, []);

	useEffect(() => {
		if (!busy) {
			document.body.classList.add('ready');
		}
	}, [busy]);

	if (busy) {
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
		<ToastContainer
			position="top-center"
			autoClose={3000}
			hideProgressBar={true}
			newestOnTop={false}
			transition={Slide}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme={appState?.currentAppearance === 'grey' || appState?.currentAppearance === 'dark' ? 'dark' : 'light'}
		/>
	</>;
};
