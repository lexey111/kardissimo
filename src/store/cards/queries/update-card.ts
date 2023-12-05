import {SupabaseClient} from "@supabase/supabase-js";
import {TSCard} from "../types-card.ts";

export async function updateOrCreateCard(
	client: SupabaseClient,
	params: {
		cardboxId: number,
		data: TSCard;
	}
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {created_at, box_id, id, ...rest} = params.data;
	if (params.data.id === 0 || params.data.id === -1) {
		(rest as Partial<TSCard>).created_at = new Date();
	} else {
		// @ts-ignore
		rest.id = params.data.id;
	}

	rest.changed_at = new Date();

	return client
		.from('cards')
		.upsert({...rest, box_id: params.cardboxId})
		.throwOnError();
}
