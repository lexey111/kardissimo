import React, {useCallback, useEffect, useState} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Button} from "../components/utils/button.component.tsx";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useAuthLogin, useAuthQuery} from "../components/hooks/useAuthHook.ts";
import {WaitCredentials} from "../components/utils/wait-credentials.component.tsx";

export const LoginPage: React.FC = () => {
	const {isLoading: userLoading, data: userData} = useAuthQuery();
	const navigate = useNavigate();

	const {mutate: login} = useAuthLogin();
	const [inAttempt, setInAttempt] = useState(false);

	const handleGoogle = useCallback(() => {
		setInAttempt(true);
		setTimeout(() => {
			void login('google');
		}, 200);
	}, [setInAttempt]);

	const handleFB = useCallback(() => {
		setInAttempt(true);
		setTimeout(() => {
			void login('facebook');
		}, 200);
	}, [setInAttempt]);


	useEffect(() => {
		if (userLoading) {
			return;
		}
		setInAttempt(false);

		if (userData?.id) {
			navigate('/home');
		}
	}, [userData, userLoading]);

	if (inAttempt) {
		return <WaitCredentials text={'Login...'}/>;
	}

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
