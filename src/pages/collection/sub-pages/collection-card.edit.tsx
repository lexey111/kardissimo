import React from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {CardEditor} from "../../../components/card-editor/card-editor.component.tsx";
import {AppSubPage} from "../../../components/app-subpage.component.tsx";

export const CollectionCardEdit: React.FC = () => {
	const params = useParams();
	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	return <AppSubPage>
		<CardEditor collectionId={params.id}
		            isNew={isNew}
		            cardId={params.cardId}/>
	</AppSubPage>;
};
