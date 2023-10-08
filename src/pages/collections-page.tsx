import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionList} from "../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../components/collection/collection-add.component.tsx";
import {CollectionCount} from "../components/collection/collection-count.component.tsx";
import {NavLink} from "react-router-dom";
import {AppPageHeader} from "../components/app-page-header.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";

export const CollectionsPage: React.FC = () => {
	return <AppPage title={'Collections page'}>
		<AppPageHeader
			title={'Collections'}
			subtitle={'Decks of cards'}
			image={<CollectionScene/>}
		/>
		<CollectionList/>
		<hr/>
		<AddNewCollection/>
		<hr/>
		<CollectionCount/>
		<div>
			<h4>Add new collection</h4>
			<NavLink to={'/collections/new'}>Create collection...</NavLink>
		</div>
	</AppPage>;
};
