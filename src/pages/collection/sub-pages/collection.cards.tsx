import React from "react";
import {useParams} from "react-router-dom";
import {PageNotFound} from "../../../components/utils/page-not-found.component.tsx";
import {getCollection} from "../../../store/data/collections-store.selectors.ts";
import {CardAddFloating} from "../../../components/card-editor/card-add-floating.component.tsx";
import {CardList} from "../../../components/card-editor/list/card-list.component.tsx";
import {CardListHeader} from "../../../components/card-editor/list/card-list-header.component.tsx";
import {AppSubPage} from "../../../components/app-subpage.component.tsx";

export const CollectionCards: React.FC = () => {
	const params = useParams();
	const collection = getCollection(params.collectionId);

	if (!collection || !collection.sides) {
		return <PageNotFound/>;
	}

	return <AppSubPage float={<CardAddFloating collectionId={collection.id}/>}>

		<div className={'page'}>
			<CardListHeader collectionId={collection.id}/>
			<CardList collectionId={collection.id}/>
		</div>
	</AppSubPage>;
};
