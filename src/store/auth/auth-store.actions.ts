import {createClient} from "@supabase/supabase-js";
import {useAuthStore} from "./auth-store.ts";

// Create a single supabase client for interacting with your database
const supabase = createClient(
	"https://ahdimeykyrsljwlwqvkb.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZGltZXlreXJzbGp3bHdxdmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyODQwMDMsImV4cCI6MjAxNDg2MDAwM30.V8goUsJSZLZ36CtXBDOQISPzCMbOfWCqk16Fe_5R5ck"
);

export const tryLoginWithGoogle = async () => {
	resetSession();

	const {error} = await supabase.auth.signInWithOAuth({provider: 'google'});

	if (error) {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: error}};
		})
	} else {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: null}};
		})
	}
}
export const tryLoginWithFB = async () => {
	resetSession();

	const {error} = await supabase.auth.signInWithOAuth({provider: 'facebook'});

	if (error) {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: error}};
		})
	} else {
		useAuthStore.setState(() => {
			return {fetching: false, loginData: {error: null}};
		})
	}
}

export const resetSession = () => {
	useAuthStore.setState(() => {
		return {
			fetching: false,
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
		console.log('no user')
		return resetSession();
	}
	console.log('update state')
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
