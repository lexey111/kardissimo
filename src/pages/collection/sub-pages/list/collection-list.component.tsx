import React from "react";
import {ICollectionState, useCollectionStore} from "../../../../store/data/collections-store.ts";
import {CollectionListItem} from "./collection-list.item.component.tsx";
import {useShallow} from "zustand/react/shallow";
import {EmptyCollectionListAdd} from "./empty-collections-list-add.component.tsx";
import {CollectionListAddItem} from "./collection-list.add-item.component.tsx";
import {IoIosAddCircle} from "react-icons/io";

const selector = (state: ICollectionState) => state.collections.map(c => c.id);

export const CollectionList: React.FC = () => {
	const collectionIds = useCollectionStore(useShallow(selector));

	if (!collectionIds || collectionIds.length === 0) {
		return <div className={'collection-list empty'}>
			<EmptyCollectionListAdd/>
			<p className={'no-data-text'}>
				<span className={'arrow-up'}></span>
				There are no yet collection to display. Please, use the button <IoIosAddCircle/> above to create the
				first one.
			</p>
		</div>;
	}

	return <div className={'collection-list'}>
		{collectionIds.map(collectionId => {
			return <div key={collectionId} className={'collection-item'}>
				<CollectionListItem id={collectionId!}/>
			</div>;
		})}
		<CollectionListAddItem/>
	</div>;
};
