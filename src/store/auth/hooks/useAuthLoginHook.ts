import {useMutation} from "@tanstack/react-query";
import {supabase} from "../../supabase.ts";
import {queryClient} from "../../query-client.ts";

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
