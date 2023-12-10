import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TUser} from "../../auth/auth-types.ts";
import {updateOrCreateCard} from "../queries/update-card.ts";
import {TSCard} from "../types-card.ts";
import {toast} from "react-toastify";
import {TSCardbox} from "../../cardboxes/types-cardbox.ts";

export const useCardUpdate = (cardboxId: number, updateImmediately = true) => {
	const client = useSupabase();
	const queryClient = useQueryClient();
	const user: TUser = queryClient.getQueryData(['auth']) as TUser;

	const mutationFn = async (data: TSCard) => {
		if (!user?.id) {
			return null;
		}

		return updateOrCreateCard(client, {cardboxId, data}).then(
			(result) => {
				if (updateImmediately) {
					void queryClient.cancelQueries({queryKey: ['cards', cardboxId]});
					void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
					if (data.id === 0) {
						void queryClient.refetchQueries({queryKey: ['cardboxes']});
						void queryClient.refetchQueries({queryKey: ['cardbox', cardboxId]});
					}
				}
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
					return old.map(c => c.id === state.id ? {...state, unstable: true} : c);
				}
				return [...old, state];
			});

			queryClient.setQueryData(['cardboxes'], (old: TSCardbox[]) => {
				return old?.map(c => c.id === state.box_id ? {...state, changed_at: new Date()} : c);
			});

			return {snapshot};
		},
		onSettled: () => {
			// update individual query?
		},
		onError: (error) => {
			toast('Error on updating card: ' + error.message, {type: 'error'})
			void queryClient.refetchQueries({queryKey: ['cardboxes']});
			void queryClient.refetchQueries({queryKey: ['cardbox', cardboxId]});
			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		}
	});
}
