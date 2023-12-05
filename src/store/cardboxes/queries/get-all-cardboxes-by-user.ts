import {SupabaseClient} from "@supabase/supabase-js";

export function getAllCardboxesByUser(
	client: SupabaseClient,
	userId: string
) {
	return client
		.from('cardboxes_count')
		.select()
		.eq('owner', userId)
		.throwOnError();
}
