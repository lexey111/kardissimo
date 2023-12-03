import {useMutation} from "@tanstack/react-query";
import {supabase} from "../../supabase.ts";
import {queryClient} from "../../query-client.ts";
import {assignGlobalStyles} from "../../settings/settings-utils.ts";

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

			localStorage.removeItem('lastUsedTheme');
			assignGlobalStyles('default');
		},
		onMutate: () => {
		},
		onError: async () => {
			await queryClient.invalidateQueries({queryKey: ['auth']});
			await queryClient.invalidateQueries({queryKey: ['settings']});
		},
	});
};
