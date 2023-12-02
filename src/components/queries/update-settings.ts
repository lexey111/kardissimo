import {SupabaseClient} from "@supabase/supabase-js";
import {defaultAppState, TSettingsState} from "../../store/settings/settings-types.ts";
import {getSettingsByUser} from "./get-settings-by-user.ts";

export async function updateSettings(
	client: SupabaseClient,
	params: {
		userId: string,
		data: Partial<TSettingsState>;
	}
) {
	const currentSettingsFromServer = await getSettingsByUser(client);
	const currentSettings = JSON.parse(currentSettingsFromServer.data.data);

	const newSettings = {...defaultAppState, ...currentSettings, ...params.data};

	return client
		.from('settings')
		.upsert({data: JSON.stringify(newSettings)})
		.eq('id', params.userId)
		.throwOnError();
}
