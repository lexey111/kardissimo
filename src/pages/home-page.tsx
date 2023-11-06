import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Header} from "../components/utils/header.component.tsx";
import {CollectionScene} from "../components/3d/collection-scene.component.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'}>
		<Header
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
		<CollectionScene/>
	</AppPage>;
};
