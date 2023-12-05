import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCard} from "../queries/delete-card.ts";
import {TSCard} from "../types-card.ts";

export const useCardDelete = (cardboxId: number) => {
	const client = useSupabase();
	const queryClient = useQueryClient();

	const mutationFn = async (cardId: number) => {
		return deleteCard(client, {cardId}).then(
			(result) => result.data
		);
	};

	return useMutation({
		mutationFn,
		onMutate: async (cardId) => {
			await queryClient.cancelQueries({queryKey: ['cards', cardboxId]});

			const snapshot = queryClient.getQueryData(['cards', cardboxId]);

			queryClient.setQueryData(['cards', cardboxId], (old: Array<TSCard>) => {
				return old.filter(c => c.id !== cardId);
			});
			return {snapshot};
		},
		onError: () => {
			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		}
	});
}
