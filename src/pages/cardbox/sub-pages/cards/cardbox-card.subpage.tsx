import React from "react";
import {useParams} from "react-router-dom";
import {CardEditorData} from "../card/card-editor.data.tsx";

export const CardboxCardSubpage: React.FC = () => {
	const params = useParams();
	const isNew = params.cardId === 'new';

	return <CardEditorData
		cardboxId={params.cardboxId}
		isNew={isNew}
		cardId={params.cardId}/>;
};
