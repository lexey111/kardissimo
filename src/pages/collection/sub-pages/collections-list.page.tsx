import React from "react";
import {CollectionList} from "../../../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../../../components/collection/collection-add.component.tsx";
import {CollectionScene} from "../../../components/scene/collection-scene.component.tsx";
import {countCollections} from "../../../store/data/collections-store.selectors.ts";
import {AppSecondaryPageHeader} from "../../../components/app-secondary-page-header.component.tsx";
import {AppPage} from "../../../components/app-page.component.tsx";

export const CollectionsListPage: React.FC = () => {
	const count = countCollections();

	return <AppPage title={'Collections page'}>
		<AppSecondaryPageHeader
			title={<>Collections <span className={'badge badge-white'}>{count > 0 ? count.toFixed() : ''}</span></>}
			image={<CollectionScene/>}
		/>
		<div className={'page'}>
			<CollectionList/>

			<AddNewCollection/>
		</div>
	</AppPage>;
};
