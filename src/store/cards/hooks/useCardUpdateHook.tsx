import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TUser} from "../../auth/auth-types.ts";
import {updateOrCreateCard} from "../queries/update-card.ts";
import {TSCard} from "../types-card.ts";

export const useCardUpdate = (cardboxId: number) => {
	const client = useSupabase();
	const queryClient = useQueryClient();
	const user: TUser = queryClient.getQueryData(['auth']) as TUser;

	const mutationFn = async (data: TSCard) => {
		if (!user?.id) {
			return null;
		}

		return updateOrCreateCard(client, {cardboxId, data}).then(
			(result) => {
				void queryClient.cancelQueries({queryKey: ['cards', cardboxId]});
				void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});

				return result.data;
			}
		);
	};

	return useMutation({
		mutationFn,
		onMutate: async (state) => {
			await queryClient.cancelQueries({queryKey: ['cards', cardboxId]});

			const snapshot = queryClient.getQueryData(['cards', cardboxId]);

			queryClient.setQueryData(['cards', cardboxId], (old: TSCard[]) => {
				if (old.find(c => c.id === state.id)) {
					return old.map(c => c.id === state.id ? state : c);
				}
				return [...old, state];
			});

			return {snapshot};
		},
		onSettled: () => {
			// update individual query?
		},
		onError: () => {
			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		}
	});
}
