import React from "react";
import {useParams} from "react-router-dom";
import {CardEditorData} from "../card/card-editor.data.tsx";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";

export const CardboxCardSubpage: React.FC = () => {
	const params = useParams();
	const isNew = params.cardId === 'new';

	return <AppSubPage>
		<CardEditorData
			cardboxId={params.cardboxId}
			isNew={isNew}
			cardId={params.cardId}/>
	</AppSubPage>;
};
