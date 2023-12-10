import {useQueryClient} from "@tanstack/react-query";

export const useCardsForceRefresh = (cardboxId: number) => {
	const queryClient = useQueryClient();

	return () => {
		console.log('Refresh cards and boxes...', cardboxId);
		void queryClient.cancelQueries({queryKey: ['cardboxes']});
		void queryClient.cancelQueries({queryKey: ['cards', cardboxId]});

		void queryClient.refetchQueries({queryKey: ['cards', cardboxId]});
		void queryClient.refetchQueries({queryKey: ['cardbox', cardboxId]});
		void queryClient.refetchQueries({queryKey: ['cardboxes']});
	}
}
