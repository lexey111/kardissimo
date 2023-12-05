import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {useCardbox} from "../../store/cardboxes/hooks/useCardboxHook.tsx";
import {getSideColorsBySchema} from "../../store/cardboxes/cardboxes-utils.ts";

type TSubPageMode = 'stand' | 'cards' | 'card';

export const CardboxHeader: React.FC = () => {
	const params = useParams();
	const cardboxId = isNaN(parseInt(params.cardboxId || '', 10)) ? -1 : parseInt(params.cardboxId || '', 10);

	const {data: cardbox, error: cardboxError, isLoading: isCardboxLoading} = useCardbox(cardboxId);

	const isNew = params.cardboxId === 'new';

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

	if (isCardboxLoading || cardboxError) {
		return null;
	}

	if (!isNew && !cardbox) {
		return null;
	}

	const schema1 = getSideColorsBySchema(cardbox?.side1schema);
	const schema2 = getSideColorsBySchema(cardbox?.side2schema);

	const color1 = schema1.textColor;
	const color2 = schema2.textColor;

	const background1 = schema1.color;
	const background2 = schema2.color;

	const text1 = 'English';
	const text2 = 'Español';

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
