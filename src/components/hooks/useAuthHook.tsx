import {useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../store/supabase.ts";
import {noUserData, TUser} from "../../store/auth/auth-store.ts";

const queryKey = ['auth'];

export const useAuthQuery = () => {
	const queryFn = async () => {
		const {data, error} = await supabase.auth.getSession();
		if (error) {
			console.error('Auth Error');
			return {...noUserData, error: error.message};
		}
		if (!data) {
			console.error('Auth: no data');
			return {...noUserData, error: 'Auth: no data!'};
		}

		return supabase.auth.getUser()
			.then(
				(response: any) => {
					if (response?.error?.__isAuthError) {
						return {...noUserData, error: '401 Unauthorized'};
					}
					if (!response || !response?.data?.user?.id || !response?.data?.user?.email) {
						console.error('Auth: invalid data');
						console.log(response);
						return {...noUserData, error: 'Auth: invalid data!'};
					}
					return {
						id: response?.data?.user?.id,
						name: response?.data?.user?.email,
						provider: response?.data?.user?.app_metadata?.provider,
						lastLogin: response?.data?.user?.last_sign_in_at,
						avatar: response?.data?.user?.user_metadata?.avatar_url
					};
				}
			)
			.catch((err: any) => {
				if (err?.error?.__isAuthError) {
					return {...noUserData, error: '401: Forbidden'};
				}
				console.error('Auth request', err);
				return {...noUserData, error: err.toString() || 'Auth: invalid data!'};
			});
	};

	return useQuery<TUser, any>({queryKey, queryFn});
}

export const setAuthState = async (state: TUser) => {
	const queryClient = useQueryClient();
	// Cancel any outgoing refetches
	await queryClient.cancelQueries({queryKey: ['auth']});

	// Snapshot the previous value
	const snapshot = queryClient.getQueryData(['auth']);
	console.log('snap', snapshot)

	// Optimistically update to the new value
	queryClient.setQueryData(['auth'], (old: TUser) => {
		console.log('update from', old)
		return {...old, ...state};
	});

	// Return a context object with the snapshotted value
	return {snapshot: snapshot};
}
