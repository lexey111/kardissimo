import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Outlet, useParams} from "react-router-dom";
import {getCardbox} from "../store/data/cardboxes-store.selectors.ts";
import {useExclusiveHook} from "../hooks/useExclusive.hook.tsx";
import {CardboxHeader} from "./cardbox/cardbox-header.component.tsx";

export const CardboxPages: React.FC = () => {
	const params = useParams();
	const cardboxId = params.cardboxId;
	const isNew = cardboxId === 'new';

	const cardbox = isNew ? null : getCardbox(params.cardboxId);

	useExclusiveHook();

	if (!isNew && !cardbox) {
		throw new Error('Card Box not found');
	}

	if (params.cardId && params.cardId !== 'new') {
		const card = cardbox!.cards?.find(c => c.id === params.cardId);

		if (!card || !card.sides) {
			throw new Error('Card not found');
		}
	}

	// mostly - guard
	return <>
		<CardboxHeader/>
		<AppPage title={'Card Box'}>
			<Outlet/>
		</AppPage>
	</>;
};
