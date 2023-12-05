import useSupabase from "../../useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllCardsByBox} from "../queries/get-all-cards-by-box.ts";
import {TSCard} from "../types-card.ts";

export const useCards = (cardboxId: number) => {
	const client = useSupabase();
	const queryFn = async () => {
		return getAllCardsByBox(client, cardboxId)
			.then(
				(result: any) => {
					console.log('fetched cards...')
					console.log(result)
					return result?.data || [];
				}
			);
	};

	return useQuery<Array<TSCard>, any>({
		queryKey: ['cards', cardboxId],
		queryFn,
		// staleTime: 0,
		// refetchOnMount: 'always'
	});
}
