import useSupabase from "../../useSupabase.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {TSCard} from "../types-card.ts";
import {toast} from "react-toastify";
import {decreaseOrders, increaseOrders, updateCardOrder} from "../queries/move-cards.ts";

export type TMoveData = {
	fromId: number
	toId: number
	fromOrder: number
	toOrder: number
}

export const useCardMove = (cardboxId: number) => {
	const client = useSupabase();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (params: TMoveData) => {
			if (params.fromOrder < params.toOrder) {
				// move right
				await decreaseOrders(client, {cardboxId, fromOrder: params.fromOrder, toOrder: params.toOrder});
				await updateCardOrder(client, {cardId: params.fromId, cardsOrder: params.toOrder});
			} else {
				// move left
				await increaseOrders(client, {cardboxId, fromOrder: params.fromOrder, toOrder: params.toOrder});
				await updateCardOrder(client, {cardId: params.fromId, cardsOrder: params.toOrder});
			}

			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
			return null;
		},
		onMutate: async (params) => {
			await queryClient.cancelQueries({queryKey: ['cards', cardboxId]});

			const snapshot = queryClient.getQueryData(['cards', cardboxId]);

			queryClient.setQueryData(['cards', cardboxId], (old: Array<TSCard>) => {
				const min = Math.min(params.fromOrder, params.toOrder);
				const max = Math.max(params.fromOrder, params.toOrder);

				return old.map(c => {
					return {...c, unstable: c.cards_order >= min && c.cards_order <= max};
				});
			});
			return {snapshot};
		},
		onError: (error) => {
			toast('Error on moving the card: ' + error.message, {type: 'error'})
			void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		}
	});
}
