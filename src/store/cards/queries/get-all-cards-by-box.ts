import {SupabaseClient} from "@supabase/supabase-js";

export function getAllCardsByBox(
	client: SupabaseClient,
	cardboxId: number
) {

	return client
		.from('cards')
		.select()
		.eq('box_id', cardboxId)
		.order('cards_order', {ascending: true})
		.throwOnError();
}
