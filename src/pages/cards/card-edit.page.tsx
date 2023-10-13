import React, {useCallback} from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {NavLink, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {AppSecondaryPageHeader} from "../../components/app-secondary-page-header.component.tsx";
import {CollectionNotFound} from "../../components/utils/collection-not-found.component.tsx";
import {getCollection} from "../../store/data/collections-store.selectors.ts";
import {CardEditor} from "../../components/card-editor/card-editor.component.tsx";
import {CardNotFound} from "../../components/utils/card-not-found.component.tsx";

export const CardEditPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const isNew = searchParams.get('new') !== null;

	const params = useParams()
	const collection = getCollection(params.id);

	const navigateToCards = useCallback(() => {
		navigate(`/collections/${params.id}/cards`);
	}, []);

	if (!collection || !collection.sides) {
		return <CollectionNotFound/>;
	}

	const card = collection.cards?.find(c => c.id === params.cardId);

	if (!card || !card.sides) {
		return <CardNotFound collectionId={params.id}/>;
	}

	return <AppPage title={'Cards | ' + collection?.title}>
		<AppSecondaryPageHeader
			title={<div>
				<NavLink to={'/collections'}>Collections</NavLink>
				<i>|</i>
				<NavLink to={`/collections/${collection.id}/cards`}>Cards of {collection?.title}</NavLink>
				<i>|</i>
				<b className={isNew ? 'info' : ''}>{isNew ? 'New card' : 'Card'}</b>
			</div>}
			onBack={navigateToCards}
		/>

		<div className={'page'}>
			<CardEditor collectionId={collection.id} cardId={card.id} isNew={isNew}/>
		</div>
	</AppPage>;
};
