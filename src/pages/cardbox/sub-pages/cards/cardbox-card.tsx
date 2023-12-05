import React from "react";
import {useParams} from "react-router-dom";
import {CardEditorData} from "../card/card-editor.data.tsx";

export const CardboxCard: React.FC = () => {
	const params = useParams();
	const isNew = params.cardId === 'new';
	const cardboxId = isNaN(parseInt(params.cardboxId || '', 10)) ? -1 : parseInt(params.cardboxId || '', 10);
	const cardId = isNaN(parseInt(params.cardId || '', 10)) ? -1 : parseInt(params.cardId || '', 10);

	return <CardEditorData
		cardboxId={cardboxId}
		isNew={isNew}
		cardId={cardId}/>;
};
