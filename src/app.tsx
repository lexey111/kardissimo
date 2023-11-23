import React, {useEffect} from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {AppMenu} from "./components/app-menu.component.tsx";
import {AppFooter} from "./components/app-footer.component.tsx";
import {getSessionAndUser, resetSession} from "./store/auth/auth-store.actions.ts";
import {useSettingsStore} from "./store/settings/settings-store.ts";
import {WaitCredentials} from "./components/utils/wait-credentials.component.tsx";
import {Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
	const isBusy = useSettingsStore((state) => state?.busy);
	const currentStyle = useSettingsStore((state) => state.currentAppearance);

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
			theme={currentStyle === 'grey' || currentStyle === 'dark' ? 'dark' : 'light'}
		/>
	</>;
};
