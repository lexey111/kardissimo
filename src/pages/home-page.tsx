import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Collection} from "../components/scene/collection-component.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'}>
		<h1>Home page</h1>
		<div className={'collections'}>
			<div className={'collection-test-1'}>
				<Collection/>
			</div>
			<div className={'collection-test-2'}>
				<Collection/>
			</div>
		</div>
	</AppPage>;
};
