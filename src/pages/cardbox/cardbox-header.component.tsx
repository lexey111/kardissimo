import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {getCardbox} from "../../store/data/cardboxes-store.selectors.ts";

type TSubPageMode = 'stand' | 'cards' | 'card';

export const CardboxHeader: React.FC = () => {
	const params = useParams();
	const cardboxId = params.cardboxId;
	const isNew = cardboxId === 'new';
	const cardbox = isNew ? null : getCardbox(cardboxId);

	let mode: TSubPageMode = 'stand';
	if (params['*']?.indexOf('details') !== -1) {
		mode = 'stand';
	}
	if (params['*']?.indexOf('cards') !== -1) {
		mode = 'cards';
	}
	if (params.cardId) {
		mode = 'card';
	}

	if (!isNew && !cardbox) {
		return null;
	}
	const color1 = cardbox?.sides?.[0]?.textColor;
	const color2 = cardbox?.sides?.[1]?.textColor;
	const background1 = cardbox?.sides?.[0]?.color;
	const background2 = cardbox?.sides?.[1]?.color;
	const text1 = cardbox?.sides?.[0]?.name;
	const text2 = cardbox?.sides?.[1]?.name;

	return <PageHeader
		hasBack={true}
		returnTo={mode === 'card' ? `/cardboxes/${cardboxId}/cards` : '/cardboxes'}
		title={cardbox?.title || 'New Card box'}
		image={<CardboxScene
			type={mode}
			text1={text1}
			text2={text2}
			color1={color1} color2={color2}
			background1={background1} background2={background2}/>}
	/>
}
