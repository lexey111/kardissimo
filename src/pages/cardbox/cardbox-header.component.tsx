import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {getCardbox} from "../../store/data/cardboxes-store.selectors.ts";

export const CardboxHeader: React.FC = () => {
	const params = useParams();
	const cardboxId = params.cardboxId;
	const isNew = cardboxId === 'new';
	const cardbox = isNew ? null : getCardbox(cardboxId);

	if (!isNew && !cardbox) {
		return null;
	}

	return <PageHeader
		hasBack={true}
		title={cardbox?.title || 'New cardbox'}
		image={<CardboxScene/>}
	/>
}
