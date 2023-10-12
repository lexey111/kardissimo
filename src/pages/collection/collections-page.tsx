import React from "react";
import {AppPage} from "../../components/app-page.component.tsx";
import {CollectionList} from "../../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../../components/collection/collection-add.component.tsx";
import {AppPageHeader} from "../../components/app-page-header.component.tsx";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {countCollections} from "../../store/data/collections-store.selectors.ts";

export const CollectionsPage: React.FC = () => {
	const count = countCollections();

	return <AppPage title={'Collections page'}>
		<AppPageHeader
			title={'Collections'}
			count={count > 0 ? count.toFixed() : ''}
			subtitle={'Decks of cards'}
			image={<CollectionScene/>}
		/>
		<div className={'page'}>
			<CollectionList/>
			<AddNewCollection/>
		</div>
	</AppPage>;
};
