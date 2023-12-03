import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../../supabase.ts";
import {noUserData, TUser} from "../auth-types.ts";
import {queryClient} from "../../query-client.ts";

export const useAuthQuery = () => {

	return useQuery<TUser, any>({
		queryKey: ['auth'],

		initialData: {...noUserData},

		queryFn: async () => {
			let result: any = {...noUserData};
			try {
				console.log('fetch user...')
				const {error, data} = await supabase.auth.getUser()
				if (error) {
					result = {...noUserData};
				} else {
					result = {data};
					if (result?.error?.__isAuthError) {
						return {...noUserData, error: '401 Unauthorized'};
					}
					if (!result || !result?.data?.user?.id || !result?.data?.user?.email) {
						return {...noUserData, error: '401 Unauthorized'};
					}

					return {
						id: result?.data?.user?.id,
						name: result?.data?.user?.email,
						provider: result?.data?.user?.app_metadata?.provider,
						lastLogin: result?.data?.user?.last_sign_in_at,
						avatar: result?.data?.user?.user_metadata?.avatar_url
					};
				}
			} catch (err) {
				console.error(err);
				result = {...noUserData};
			}
			return result;
		},
	});
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

	return {snapshot};
}

export const useAuthLogin = () => {
	return useMutation({
		mutationKey: ['auth'],
		mutationFn: async (provider: 'google' | 'facebook') => {
			console.log('login', provider)
			await queryClient.cancelQueries({queryKey: ['auth']});
			await supabase.auth.signInWithOAuth({provider: provider});
		},
		retry: 0,
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['auth']});
			await queryClient.invalidateQueries({queryKey: ['settings']});
		},
		onMutate: () => {
		},
		onError: async () => {
			await queryClient.invalidateQueries({queryKey: ['auth']});
			await queryClient.invalidateQueries({queryKey: ['settings']});
		},
	});
};

export const useAuthLogout = () => {
	return useMutation({
		mutationKey: ['auth'],
		mutationFn: async () => {
			console.log('fire')
			await queryClient.cancelQueries({queryKey: ['auth']});
			await supabase.auth.signOut();
		},
		retry: 0,
		onSuccess: async () => {
			await queryClient.invalidateQueries({queryKey: ['auth']});
			await queryClient.invalidateQueries({queryKey: ['settings']});
		},
		onMutate: () => {
		},
		onError: async () => {
			await queryClient.invalidateQueries({queryKey: ['auth']});
			await queryClient.invalidateQueries({queryKey: ['settings']});
		},
	});
};
