import {SupabaseClient} from "@supabase/supabase-js";

export function getSettingsByUser(
	client: SupabaseClient,
): any {
	return client
		.from('settings')
		.select()
		.throwOnError()
		.single();
}
