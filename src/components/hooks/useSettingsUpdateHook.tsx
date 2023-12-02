import useSupabase from "./useSupabase.tsx";
import {TSettingsState} from "../../store/settings/settings-types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSettings} from "../queries/update-settings.ts";
import {useAuthQuery} from "./useAuthHook.ts";

export const useUpdateSettingsMutation = () => {
	const client = useSupabase();
	const queryClient = useQueryClient();
	const {data: userData} = useAuthQuery();

	const mutationFn = async (settings: Partial<TSettingsState>) => {
		if (!userData?.id) {
			return null;
		}
		return updateSettings(client, {userId: userData.id, data: settings}).then(
			(result) => result.data
		);
	};

	return useMutation({
		mutationFn,
		onMutate: async (state) => {
			// Cancel any outgoing refetches
			await queryClient.cancelQueries({queryKey: ['settings']});

			// Snapshot the previous value
			const snapshot = queryClient.getQueryData(['settings']);

			// Optimistically update to the new value
			queryClient.setQueryData(['settings'], (old: TSettingsState) => {
				return {...old, ...state};
			});

			// Return a context object with the snapshotted value
			return {snapshot};
		},
		onSettled: () => {
			void queryClient.refetchQueries({queryKey: ['settings']});
		}
	});
}
