import React, {useCallback, useEffect} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Button} from "../components/utils/button.component.tsx";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {tryLoginWithFB, tryLoginWithGoogle} from "../store/auth/auth-store.actions.ts";
import {useAuthQuery} from "../components/hooks/useAuthHook.tsx";

export const LoginPage: React.FC = () => {
	const {isLoading: userLoading, data: userData} = useAuthQuery();
	const navigate = useNavigate();

	const handleGoogle = useCallback(() => {
		void tryLoginWithGoogle();
	}, []);

	const handleFB = useCallback(() => {
		void tryLoginWithFB();
	}, []);

	useEffect(() => {
		//setAuthState({error: ''});
	}, []);

	useEffect(() => {
		if (userLoading) {
			return;
		}

		if (userData?.id) {
			navigate('/home');
		}
	}, [userData, userLoading]);

	const showError = !userLoading && !!userData?.error && userData.error.indexOf('401') === -1;

	return <AppPage title={'About page'} authOnly={false}>
		<div className={'login-buttons'}>
			{userLoading && <span>Retrieving data...</span>}

			{!userLoading && !userData?.id && <>
				<h1>Login with social network | other service account</h1>
				<p>We will only receive your email address and avatar.</p>
				<p>No spam, no subscriptions, we promise.</p>
				<div className={'login-controls'}>
					<Button type={'primary'} onClick={handleGoogle} icon={<FaGoogle/>}>Use Google</Button>
					<Button type={'primary'} onClick={handleFB} icon={<FaFacebookSquare/>}>Use Facebook</Button>
				</div>
			</>}

			{showError && <><h1>Error</h1>
				<p>{userData?.error}</p>
			</>}
		</div>

	</AppPage>;
};
