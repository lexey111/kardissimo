import {SupabaseClient} from "@supabase/supabase-js";

export async function deleteAllCards(
	client: SupabaseClient,
	params: {
		cardboxId: number
	}
) {
	return client
		.from('cards')
		.delete()
		.eq('box_id', params.cardboxId)
		.throwOnError();
}
