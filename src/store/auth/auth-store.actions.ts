import {createClient} from "@supabase/supabase-js";
import {useAuthStore} from "./auth-store.ts";

// Create a single supabase client for interacting with your database
const supabase = createClient(
	import.meta.env.VITE_SUPABASE_APP,
	import.meta.env.VITE_SUPABASE_KEY
);

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

	return user;
}
