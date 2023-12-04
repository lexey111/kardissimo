import {SupabaseClient} from "@supabase/supabase-js";

export async function deleteCardbox(
	client: SupabaseClient,
	params: {
		cardboxId: number;
	}
) {
	return client
		.from('cardboxes')
		.delete()
		.eq('id', params.cardboxId)
		.throwOnError();
}
