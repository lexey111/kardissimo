import {SupabaseClient} from "@supabase/supabase-js";
import {TSCardbox} from "../types.ts";

export async function updateOrCreateCardbox(
	client: SupabaseClient,
	params: {
		userId: string,
		data: TSCardbox;
	}
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const {created_at, ...rest} = params.data;
	if (params.data.id === 0) {
		(rest as Partial<TSCardbox>).created_at = new Date();
	}

	rest.changed_at = new Date();

	return client
		.from('cardboxes')
		.upsert({...rest, owner: params.userId})
		.throwOnError();
}
