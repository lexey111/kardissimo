import {SupabaseClient} from "@supabase/supabase-js";

export function getCardboxById(
	client: SupabaseClient,
	cardboxId: number
) {
	return client
		.from('cardboxes')
		.select()
		.eq('id', cardboxId)
		.throwOnError()
		.single();
}
