import {useQuery} from "@tanstack/react-query";
import {supabase} from "../../supabase.ts";
import {noUserData, TUser} from "../auth-types.ts";

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
