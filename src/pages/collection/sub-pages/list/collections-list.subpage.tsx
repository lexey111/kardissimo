import React from "react";
import {CollectionList} from "./collection-list.component.tsx";
import {AppPage} from "../../../../components/app-page.component.tsx";

export const CollectionsListSubpage: React.FC = () => {
	return <AppPage title={'Collections page'}>
		<div className={'page page-1200'}>
			<CollectionList/>
		</div>
	</AppPage>;
};
