import useSupabase from "./useSupabase.tsx";
import {useQuery} from "@tanstack/react-query";
import {getSettingsByUser} from "../queries/get-settings-by-user.ts";
import {defaultAppState, TSettingsState} from "../../store/settings/settings-types.ts";
import {useAuthQuery} from "./useAuthHook.tsx";

export const useSettingsQuery = () => {
	const client = useSupabase();
	const queryKey = ['settings', 'data'];
	const {data: userData} = useAuthQuery();
	const queryFn = async () => {
		if (!userData?.id) {
			return {...defaultAppState};
		}

		return getSettingsByUser(client)
			.then(
				(result: any) => {
					return {...defaultAppState, ...JSON.parse(result.data.data)};
				}
			)
			.catch((err: any) => {
				console.log('Error', err);
				return {...defaultAppState};
			});
	};

	return useQuery<TSettingsState, any>({queryKey, queryFn, enabled: !!userData?.id});
}
