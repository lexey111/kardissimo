import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Header} from "../components/utils/header.component.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'} authOnly={false}>
		<Header
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
	</AppPage>;
};
