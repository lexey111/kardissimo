import useSupabase from "../store/useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {getCardboxById} from "../store/queries/get-cardbox-by-id.ts";

function useOrganizationQuery(cardboxId: number) {
	const client = useSupabase();
	const queryKey = ['cardbox', cardboxId];

	const queryFn = async () => {
		return getCardboxById(client, cardboxId).then(
			(result) => result.data
		);
	};

	return useQuery({ queryKey, queryFn });
}

export default useOrganizationQuery;
