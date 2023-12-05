import {SupabaseClient} from "@supabase/supabase-js";

export async function deleteCard(
	client: SupabaseClient,
	params: {
		cardId: number;
	}
) {
	return client
		.from('cards')
		.delete()
		.eq('id', params.cardId)
		.throwOnError();
}
