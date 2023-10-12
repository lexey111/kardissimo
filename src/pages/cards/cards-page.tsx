import React, {useCallback} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {getCollection} from "../../store/data/collections-store.selectors.ts";
import {CardAddFloating} from "../../components/card-editor/card-add-floating.component.tsx";
import {CardList} from "../../components/card-editor/card-list.component.tsx";

export const CardsPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = getCollection(params.id);

	const handleBack = useCallback(() => {
		navigate('/collections');
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppPage title={'Cards: ' + collection?.title}
	                float={<CardAddFloating collectionId={collection.id}/>}>

		<AppSecondaryPageHeader
			title={'Cards: ' + collection?.title}
			onBack={handleBack}
		/>

		<div className={'page'}>
			<CardList collectionId={collection.id}/>
		</div>
	</AppPage>;
};
