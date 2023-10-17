import React from "react";
import {useParams} from "react-router-dom";
import {CardEditor} from "../../../../components/card-editor/card-editor.component.tsx";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";

export const CollectionCardEdit: React.FC = () => {
	const params = useParams()
	return <AppSubPage>
		<div className={'page'}>
			<CardEditor collectionId={params.id} cardId={params.cardId}/>
		</div>
	</AppSubPage>;
};
