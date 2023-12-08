import {SupabaseClient} from "@supabase/supabase-js";

export async function updateCardOrder(
	client: SupabaseClient,
	params: {
		cardId: number,
		cardsOrder: number,
	}
) {
	console.log('update card', params.cardId, 'set order', params.cardsOrder);
	return client
		.from('cards')
		.update({cards_order: params.cardsOrder})
		.eq('id', params.cardId)
		.throwOnError();
}

export async function decreaseOrders(
	client: SupabaseClient,
	params: {
		cardboxId: number,
		fromOrder: number,
		toOrder: number,
	}
) {
	const min = Math.min(params.fromOrder, params.toOrder);
	const max = Math.max(params.fromOrder, params.toOrder);

	return client
		.rpc('decrease_orders', {cardbox: params.cardboxId, order_from: min, order_to: max})
		.throwOnError();
}

export async function increaseOrders(
	client: SupabaseClient,
	params: {
		cardboxId: number,
		fromOrder: number,
		toOrder: number,
	}
) {
	const min = Math.min(params.fromOrder, params.toOrder);
	const max = Math.max(params.fromOrder, params.toOrder);

	return client
		.rpc('increase_orders', {cardbox: params.cardboxId, order_from: min, order_to: max})
		.throwOnError();
}
