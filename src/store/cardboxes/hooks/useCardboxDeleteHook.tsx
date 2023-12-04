import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TSCardbox} from "../types.ts";
import {deleteCardbox} from "../queries/delete-cardbox.ts";

export const useCardboxDelete = () => {
	const client = useSupabase();
	const queryClient = useQueryClient();

	const mutationFn = async (cardboxId: number) => {
		return deleteCardbox(client, {cardboxId}).then(
			(result) => result.data
		);
	};

	return useMutation({
		mutationFn,
		onMutate: async (cardboxId) => {
			await queryClient.cancelQueries({queryKey: ['cardboxes']});

			const snapshot = queryClient.getQueryData(['cardboxes']);

			queryClient.setQueryData(['cardboxes'], (old: Array<TSCardbox>) => {
				return old.filter(c => c.id !== cardboxId);
			});
			return {snapshot};
		},
		onError: () => {
			void queryClient.refetchQueries({queryKey: ['cardboxes']});
		}
	});
}