import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionList} from "../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../components/collection/collection-add.component.tsx";
import {AppPageHeader} from "../components/app-page-header.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";
import {ICollectionState, useCollectionStore} from "../store/data/collections-store.ts";

const selector = (state: ICollectionState) => state.collections.length;
export const CollectionsPage: React.FC = () => {
	const count = useCollectionStore(selector);

	return <AppPage title={'Collections page'}>
		<AppPageHeader
			title={'Collections'}
			count={count > 0 ? count.toFixed() : ''}
			subtitle={'Decks of cards'}
			image={<CollectionScene/>}
		/>
		<CollectionList/>

		<div>
			<AddNewCollection/>
		</div>
	</AppPage>;
};
