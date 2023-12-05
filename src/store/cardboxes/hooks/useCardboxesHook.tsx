import useSupabase from "../../useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {queryClient} from "../../query-client.ts";
import {TUser} from "../../auth/auth-types.ts";
import {getAllCardboxesByUser} from "../queries/get-all-cardboxes-by-user.ts";
import {TSCardbox} from "../types-cardbox.ts";

export const useCardboxes = () => {
	const client = useSupabase();
	const queryFn = async () => {
		const user: TUser = queryClient.getQueryData(['auth']) as TUser;
		if (!user?.id) {
			return [];
		}

		return getAllCardboxesByUser(client, user.id)
			.then(
				(result: any) => {
					console.log('fetched cardboxes...')
					console.log(result)
					return result?.data || [];
				}
			);
	};

	return useQuery<Array<TSCardbox>, any>({
		queryKey: ['cardboxes'],
		queryFn,
		// staleTime: 0,
		// refetchOnMount: 'always'
	});
}
