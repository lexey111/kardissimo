import React, {useCallback, useEffect} from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Button} from "../components/utils/button.component.tsx";
import {FaFacebookSquare, FaGoogle} from "react-icons/fa";
import {IAuthState, useAuthStore} from "../store/auth/auth-store.ts";
import {useNavigate} from "react-router-dom";
import {tryLoginWithFB, tryLoginWithGoogle} from "../store/auth/auth-store.actions.ts";

const userSelector = (state: IAuthState) => state;

export const LoginPage: React.FC = () => {
	const user = useAuthStore(userSelector);
	const navigate = useNavigate();

	const handleGoogle = useCallback(() => {
		void tryLoginWithGoogle();
	}, []);

	const handleFB = useCallback(() => {
		void tryLoginWithFB();
	}, []);

	useEffect(() => {
		if (user.loginData.id) {
			navigate('/home');
		}
	}, [user.loginData]);

	return <AppPage title={'About page'} authOnly={false}>
		<div className={'login-buttons'}>
			{user.fetching && <span>Retrieving data...</span>}

			{!user.fetching && !user.loginData.id && <><h1>Login with social network account</h1>
				<div>
					<Button type={'primary'} onClick={handleGoogle} icon={<FaGoogle/>}>Login with Google</Button>
					<Button type={'primary'} onClick={handleFB} icon={<FaFacebookSquare/>}>Login with Facebook</Button>
				</div>
			</>}

			{!user.fetching && user.loginData.error && <><h1>Error</h1>
				<p>{user.loginData.error}</p>
			</>}
		</div>

	</AppPage>;
};
