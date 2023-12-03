import {SupabaseClient} from "@supabase/supabase-js";
import {defaultAppState, TSettingsState} from "../settings-types.ts";
import {getSettingsByUser} from "./get-settings-by-user.ts";

export async function updateSettings(
	client: SupabaseClient,
	params: {
		userId: string,
		data: Partial<TSettingsState>;
	}
) {
	let currentSettingsFromServer;
	let currentSettings;
	try {
		currentSettingsFromServer = await getSettingsByUser(client);
		currentSettings = JSON.parse(currentSettingsFromServer.data.data);
	} catch (e) {
		currentSettings = {};
	}

	const newSettings = {...defaultAppState, ...currentSettings, ...params.data};

	return client
		.from('settings')
		.upsert({data: JSON.stringify(newSettings)})
		.eq('id', params.userId)
		.throwOnError();
}
