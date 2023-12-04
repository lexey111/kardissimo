import useSupabase from "../../useSupabase.tsx";
import {TSettingsState} from "../settings-types.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateSettings} from "../queries/update-settings.ts";
import {TUser} from "../../auth/auth-types.ts";

export const useSettingsUpdate = () => {
	const client = useSupabase();
	const queryClient = useQueryClient();
	const user: TUser = queryClient.getQueryData(['auth']) as TUser;

	const mutationFn = async (settings: Partial<TSettingsState>) => {
		if (!user?.id) {
			return null;
		}

		await queryClient.cancelQueries({queryKey: ['settings']});

		queryClient.setQueryData(['settings'], (old: TSettingsState) => {
			return {...old, updating: false};
		});

		return updateSettings(client, {userId: user.id, data: settings}).then(
			(result) => result.data
		);
	};

	return useMutation({
		mutationFn,
		onMutate: async (state) => {
			await queryClient.cancelQueries({queryKey: ['settings']});

			const snapshot = queryClient.getQueryData(['settings']);

			queryClient.setQueryData(['settings'], (old: TSettingsState) => {
				return {...old, ...state, updating: false};
			});
			return {snapshot};
		},
		onSettled: () => {
			void queryClient.refetchQueries({queryKey: ['settings']});
		}
	});
}