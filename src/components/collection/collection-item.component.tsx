import React from "react";
import {useCollectionStore} from "../../store/data/collections-store.ts";

export type TCollectionItemProps = {
	id: string
}

export const CollectionItem: React.FC<TCollectionItemProps> = React.memo(({id}) => {
	const collection = useCollectionStore((state) => state.collections.find(c => c.id === id));
	if (!collection) {
		return null;
	}

	console.log('[ITEM]', collection.id);

	return <div className={'collection-item-content'}>
		<div className={'collection-id'}>{collection.id}</div>
		<div className={'collection-is-local'}>{collection.isLocal ? 'Local' : 'Cloud'}</div>
		<div className={'collection-title'}>{collection.title}</div>
		<div className={'collection-author'}>{collection.author}</div>
	</div>;
}, () => true);
