import {SupabaseClient} from "@supabase/supabase-js";

export function getAllCardboxesByUser(
	client: SupabaseClient,
	userId: string
) {
	return client
		.from('cardboxes')
		.select('')
		.eq('owner', userId)
		.throwOnError();
}
