import useSupabase from "../../useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {TSCardbox} from "../types-cardbox.ts";
import {getCardbox} from "../queries/get-cardbox.ts";
import {getDefaultSCardbox} from "../cardboxes-utils.ts";

export const useCardbox = (cardboxId: number) => {
	const client = useSupabase();
	const queryFn = async () => {
		if (cardboxId === -1) {
			// new box
			console.log('fetched NEW cardbox...')
			return {...getDefaultSCardbox()}
		}
		return getCardbox(client, cardboxId)
			.then(
				(result: any) => {
					console.log('fetched cardbox...', cardboxId)
					console.log(result)
					return result?.data;
				}
			);
	};

	return useQuery<TSCardbox>({
		queryKey: ['cardbox', cardboxId],
		queryFn,
		staleTime: 0,
		refetchOnMount: 'always'
	});
}
