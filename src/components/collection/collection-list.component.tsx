import React from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {CollectionItem} from "./collection-item.component.tsx";
import {CollectionActions} from "./collection-actions.component.tsx";
import {useShallow} from "zustand/react/shallow";

const selector = (state: ICollectionState) => state.collections.map(c => c.id);

export const CollectionList: React.FC = () => {
	const collectionIds = useCollectionStore(useShallow(selector));

	return <div className={'collection-list'}>
		{collectionIds.map(collectionId => {
			return <div key={collectionId} className={'collection-item'}>
				<CollectionItem id={collectionId!}/>
				<CollectionActions id={collectionId!}/>
			</div>;
		})}
	</div>;
};
