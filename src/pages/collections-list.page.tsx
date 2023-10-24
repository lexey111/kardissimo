import React from "react";
import {CollectionList} from "./collection/sub-pages/list/collection-list.component.tsx";
import {AddNewCollection} from "./collection/sub-pages/list/collection-add.component.tsx";
import {AppPage} from "../components/app-page.component.tsx";

export const CollectionsListPage: React.FC = () => {
	return <AppPage title={'Collections page'}>
		<div className={'page page-1200'}>
			<CollectionList/>
			<AddNewCollection/>
		</div>
	</AppPage>;
};
