import {SupabaseClient} from "@supabase/supabase-js";
import {TSCardbox} from "../types-cardbox.ts";

export async function updateOrCreateCardbox(
	client: SupabaseClient,
	params: {
		userId: string,
		data: TSCardbox;
	}
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {created_at, cards_count, id, ...rest} = params.data;
	if (params.data.id === 0 || params.data.id === -1) {
		(rest as Partial<TSCardbox>).created_at = new Date();
	} else {
		// @ts-ignore
		rest.id = params.data.id;
	}

	return client
		.from('cardboxes')
		.upsert({...rest, owner: params.userId})
		.throwOnError();
}
