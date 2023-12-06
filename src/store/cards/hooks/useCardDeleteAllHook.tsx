import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {deleteAllCards} from "../queries/delete-all-card.ts";

export const useCardDeleteAll = (cardboxId: number) => {
	const client = useSupabase();
	const queryClient = useQueryClient();

	const mutationFn = async () => {
		return deleteAllCards(client, {cardboxId});
		// return queryClient.refetchQueries({queryKey: ['cardboxes']});
		// return await queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
	};

	return useMutation({
		mutationFn,
		onMutate: async () => {
			await queryClient.cancelQueries({queryKey: ['cards', cardboxId]});

			const snapshot = queryClient.getQueryData(['cards', cardboxId]);

			queryClient.setQueryData(['cards', cardboxId], () => {
				return [];
			});
			return {snapshot};
		},
		onError: (error) => {
			toast('Error on cleaning up cards: ' + error.message, {type: 'error'})
			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		}
	});
}
