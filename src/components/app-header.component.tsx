import {CollectionScene} from "./scene/collection-scene.component.tsx";
import {Header} from "./header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {getCollection} from "../store/data/collections-store.selectors.ts";

export const AppHeader: React.FC = () => {
	const params = useParams();
	const collectionId = params.collectionId;
	const isNew = collectionId === 'new';
	const collection = isNew ? null : getCollection(collectionId);

	if (!isNew && !collection) {
		return null;
	}

	return <Header
		hasBack={true}
		title={collection?.title || 'New collection'}
		image={<CollectionScene/>}
	/>
}
