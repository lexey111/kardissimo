import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TUser} from "../../auth/auth-types.ts";
import {TSCardbox} from "../types-cardbox.ts";
import {updateOrCreateCardbox} from "../queries/update-cardbox.ts";

export const useCardboxUpdate = () => {
	const client = useSupabase();
	const queryClient = useQueryClient();
	const user: TUser = queryClient.getQueryData(['auth']) as TUser;

	const mutationFn = async (cardbox: TSCardbox) => {
		if (!user?.id) {
			return null;
		}

		return updateOrCreateCardbox(client, {userId: user.id, data: cardbox})
			.then(
				(result) => {
					if (cardbox.id === -1 || cardbox.id === 0) {
						void queryClient.cancelQueries({queryKey: ['cardboxes']});
						void queryClient.refetchQueries({queryKey: ['cardboxes']});
					}
					return result.data;
				}
			);
	};

	return useMutation({
		mutationFn,
		onMutate: async (state) => {
			await queryClient.cancelQueries({queryKey: ['cardboxes']});
			const snapshot = queryClient.getQueryData(['cardboxes']);

			queryClient.setQueryData(['cardboxes'], (old: Array<TSCardbox>) => {
				if (old.find(c => c.id === state.id)) {
					return old.map(c => c.id === state.id ? state : c);
				}
				return [...old, state];
			});

			return {snapshot};
		},
		onSuccess: () => {
		},
		onError: () => {
			void queryClient.refetchQueries({queryKey: ['cardboxes']});
		}
	});
}
