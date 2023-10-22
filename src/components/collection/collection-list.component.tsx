import React from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {CollectionListItem} from "./collection-list.item.component.tsx";
import {useShallow} from "zustand/react/shallow";
import {ListNoData} from "../utils/card-list-no-data.component.tsx";
import {CollectionListAdd} from "./collections-list-add.component.tsx";

const selector = (state: ICollectionState) => state.collections.map(c => c.id);

export const CollectionList: React.FC = () => {
	const collectionIds = useCollectionStore(useShallow(selector));

	if (!collectionIds || collectionIds.length === 0) {
		return <div className={'collection-list empty'}>
			<ListNoData caption={'There are no yet collection to display.'}
			            addButton={<CollectionListAdd/>}/>
		</div>;

	}

	return <div className={'collection-list'}>
		{collectionIds.map(collectionId => {
			return <div key={collectionId} className={'collection-item'}>
				<CollectionListItem id={collectionId!}/>
			</div>;
		})}
		{/*<CardAddFloating collectionId={'123'}/>*/}
	</div>;
};
