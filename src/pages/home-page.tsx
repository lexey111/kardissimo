import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionList} from "../components/collection/collection-list.component.tsx";
import {AddNewCollection} from "../components/collection/collection-add.component.tsx";
import {CollectionCount} from "../components/collection/collection-count.component.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'}>
		<h1>Home page</h1>
		<h3>Store collections</h3>
		<CollectionList/>
		<hr/>
		<AddNewCollection/>
		<hr/>
		<CollectionCount/>
	</AppPage>;
};
