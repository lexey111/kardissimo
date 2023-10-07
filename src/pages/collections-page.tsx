import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionList} from "../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../components/collection/collection-add.component.tsx";
import {CollectionCount} from "../components/collection/collection-count.component.tsx";
import {NavLink} from "react-router-dom";

export const CollectionsPage: React.FC = () => {
	return <AppPage title={'Collections page'}>
		<h1>Collections of cards</h1>
		<h3>Store collections</h3>
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
