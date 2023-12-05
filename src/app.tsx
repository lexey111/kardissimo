import React, {useEffect, useState} from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {WaitGlobal} from "./components/utils/wait-global.component.tsx";
import {Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSettingsQuery} from "./store/settings/hooks/useSettingsHook.tsx";
import {useAuthQuery} from "./store/auth/hooks/useAuthHook.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {assignGlobalStyles} from "./store/settings/settings-utils.ts";
import {defaultAppState} from "./store/settings/types-settings.ts";


export const App: React.FC = () => {
	const [busy, setBusy] = useState(true);
	const {isLoading: userLoading, data: userData} = useAuthQuery();
	const {isLoading: settingsLoading, data: settingsData} = useSettingsQuery();

	useEffect(() => {
		if (!userLoading && !settingsLoading) {
			setBusy(false);
		}
	}, [userLoading, userData, settingsLoading, settingsData]);

	useEffect(() => {
		if (!busy) {
			document.body.classList.add('ready');
		}
	}, [busy]);


	const loggedIn = !userLoading && !!userData?.id;

	useEffect(() => {
		if (!settingsData || !loggedIn) {
			return;
		}
		assignGlobalStyles(settingsData?.currentAppearance || defaultAppState.currentAppearance);
	}, [settingsData]);


	if (busy) {
		return <WaitGlobal/>;
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
			theme={settingsData?.currentAppearance === 'grey' || settingsData?.currentAppearance === 'dark' ? 'dark' : 'light'}
		/>
		<ReactQueryDevtools/>
	</>;
};
