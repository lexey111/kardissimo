import React, {useCallback} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {getCollection} from "../../store/data/collections-store.selectors.ts";

export const CardPage: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams()
	const collection = getCollection(params.id);

	const navigateToCards = useCallback(() => {
		navigate(`/collections/${params.id}/cards`);
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	return <AppPage title={'Cards | ' + collection?.title}>
		<AppSecondaryPageHeader
			title={'Card of ' + collection?.title}
			onBack={navigateToCards}
		/>

		<div className={'page'}>
			Card editor here
		</div>
	</AppPage>
		;
};
