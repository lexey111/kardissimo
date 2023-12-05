import useSupabase from "../../useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {TSCard} from "../types-card.ts";
import {getCardById} from "../queries/get-card-by-id.ts";
import {getDefaultSCard} from "../cards-utils.ts";

export const useCard = (cardboxId: number, cardId: number) => {
	const client = useSupabase();
	const queryFn = async () => {
		if (cardId === -1) {
			// new box
			console.log('fetched NEW card...')
			return {...getDefaultSCard(cardboxId)}
		}
		return getCardById(client, cardId)
			.then(
				(result: any) => {
					console.log('fetched card...')
					console.log(result)
					return result?.data;
				}
			);
	};

	return useQuery<TSCard>({
		queryKey: ['card', cardboxId, cardId],
		queryFn,
		staleTime: 0,
		refetchOnMount: 'always'
	});
}
