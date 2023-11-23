import React from "react";
import {CollectionList} from "./collection-list.component.tsx";
import {AppPage} from "../../../../components/app-page.component.tsx";

export const CollectionsListSubpage: React.FC = () => {
	return <AppPage title={'Collections page'}>
		<CollectionList/>
	</AppPage>;
};
