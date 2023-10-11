import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {AppPageHeader} from "../components/app-page-header.component.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'}>
		<AppPageHeader
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
	</AppPage>;
};
