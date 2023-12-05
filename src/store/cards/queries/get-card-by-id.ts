import {SupabaseClient} from "@supabase/supabase-js";

export function getCardById(
	client: SupabaseClient,
	cardId: number
) {

	return client
		.from('cards')
		.select()
		.eq('id', cardId)
		.single();
}
