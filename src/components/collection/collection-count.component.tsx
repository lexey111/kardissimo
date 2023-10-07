import React from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";

const selector = (state: ICollectionState) => state.collections.length;
export const CollectionCount: React.FC = () => {
	const count = useCollectionStore(selector);

	console.log('[COUNT]');
	return <div className={'collection-count'}>
		{count}
	</div>;
};
