import React from "react";
import {useParams} from "react-router-dom";
import {CardEditorData} from "../card/card-editor.data.tsx";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";

export const CollectionCardSubpage: React.FC = () => {
	const params = useParams();
	const isNew = params.cardId === 'new';

	return <AppSubPage>
		<CardEditorData
			collectionId={params.collectionId}
			isNew={isNew}
			cardId={params.cardId}/>
	</AppSubPage>;
};
