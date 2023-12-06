import {useQueryClient} from "@tanstack/react-query";

export const useCardsForceRefresh = (cardboxId: number) => {
	const queryClient = useQueryClient();

	return () => {
		console.log('Refresh cards...', cardboxId);
		void queryClient.cancelQueries({queryKey: ['cards', cardboxId]});
		void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
	}
}
