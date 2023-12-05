import {SupabaseClient} from "@supabase/supabase-js";

export function getCardbox(
	client: SupabaseClient,
	cardboxId: number
) {
	return client
		.from('cardboxes_count')
		.select()
		.eq('id', cardboxId)
		.single();
}
