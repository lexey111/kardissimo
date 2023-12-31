import useSupabase from "../../useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {getSettingsByUser} from "../queries/get-settings-by-user.ts";
import {defaultAppState, TSettingsState} from "../types-settings.ts";
import {queryClient} from "../../query-client.ts";
import {TUser} from "../../auth/auth-types.ts";

export const useSettingsQuery = () => {
	const client = useSupabase();
	const queryFn = async () => {
		const user: TUser = queryClient.getQueryData(['auth']) as TUser;
		if (!user?.id) {
			return {...defaultAppState};
		}

		return getSettingsByUser(client)
			.then(
				(result: any) => {
					console.log('fetch settings...')
					return {...defaultAppState, ...JSON.parse(result.data.data)};
				}
			)
			.catch((err: any) => {
				console.error('Error', err); // may be no settings yet
				return {...defaultAppState};
			});
	};

	return useQuery<TSettingsState, any>({
		queryKey: ['settings'],
		queryFn,
	});
}
