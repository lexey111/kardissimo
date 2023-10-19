import {CollectionScene} from "./scene/collection-scene.component.tsx";
import {Header} from "./header.component.tsx";
import React from "react";
import {useParams} from "react-router-dom";
import {getCollection} from "../store/data/collections-store.selectors.ts";

export const AppHeader: React.FC = () => {
	const params = useParams();
	const collection = getCollection(params.id);
	if (!params.id || !collection) {
		return null;
	}

	return <Header
		hasBack={true}
		title={collection.title!}
		image={<CollectionScene/>}
	/>
}
