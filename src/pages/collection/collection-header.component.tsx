import {CollectionScene} from "../../components/3d/collection-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {getCollection} from "../../store/data/collections-store.selectors.ts";

export const CollectionHeader: React.FC = () => {
	const params = useParams();
	const collectionId = params.collectionId;
	const isNew = collectionId === 'new';
	const collection = isNew ? null : getCollection(collectionId);

	if (!isNew && !collection) {
		return null;
	}

	return <PageHeader
		hasBack={true}
		title={collection?.title || 'New collection'}
		image={<CollectionScene/>}
	/>
}
