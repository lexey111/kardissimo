import {useAuthStore} from "./auth-store.ts";
import {supabase} from "../supabase.ts";
import {loadSettingsFromServer, resetSettings} from "../settings/settings-store.actions.ts";


export const tryLoginWithGoogle = async () => {
	resetSession(true);

	const {error} = await supabase.auth.signInWithOAuth({provider: 'google'});

	if (error) {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: error}};
		});
	} else {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: null}};
		});
		await getSessionAndUser();
	}
}
export const tryLoginWithFB = async () => {
	resetSession(true);

	const {error} = await supabase.auth.signInWithOAuth({provider: 'facebook'});

	if (error) {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: error}};
		});
	} else {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: null}};
		});
		await getSessionAndUser();
	}
}

export const resetSession = (fetching = false) => {
	useAuthStore.setState(() => {
		return {
			fetching: fetching,
			loginData: {
				id: '',
				name: '',
				provider: '',
				lastLogin: '',
				avatar: ''
			}
		}
	});

	resetSettings();
}

export const logout = async () => {
	resetSession(true);

	const {error} = await supabase.auth.signOut();

	if (error) {
		console.log(error);
	}

	resetSession();
}

export const getSessionAndUser = async () => {
	const {data, error} = await supabase.auth.getSession();
	if (error) {
		console.log('error')
		resetSession();
		return;
	}
	if (!data) {
		console.log('no data')
		return resetSession();
	}

	const {data: {user}} = await supabase.auth.getUser();

	if (!user) {
		return resetSession();
	}

	useAuthStore.setState(() => {
		return {
			fetching: false,
			loginData: {
				id: user?.id,
				name: user?.email,
				provider: user?.app_metadata?.provider,
				lastLogin: user?.last_sign_in_at,
				avatar: user?.user_metadata?.avatar_url
			}
		}
	});

	await loadSettingsFromServer();

	return user;
}
