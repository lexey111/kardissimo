import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TSCardbox} from "../types-cardbox.ts";
import {deleteCardbox} from "../queries/delete-cardbox.ts";
import {toast} from "react-toastify";

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
		onError: (error) => {
			toast('Error on removing card box: ' + error.message, {type: 'error'})
			void queryClient.refetchQueries({queryKey: ['cardboxes']});
		}
	});
}
