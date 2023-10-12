import React, {useCallback} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {useCollectionStore} from "../../store/data/collections-store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CardList} from "../../components/card-editor/cards-component.tsx";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";

export const CardsPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = useCollectionStore((state) => state.collections.find(c => c.id === params.id));

	const handleBack = useCallback(() => {
		navigate('/collections');
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppPage title={'Cards: ' + collection?.title}>
		<AppSecondaryPageHeader
			title={'Cards: ' + collection?.title}
			subtitle={'Fill the deck'}
			onBack={handleBack}
		/>
		<CardList collectionId={collection?.id}/>
	</AppPage>;
};
