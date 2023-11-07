import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Header} from "../components/utils/header.component.tsx";
import {KardissimoScene} from "./kardissimo-scene.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'} authOnly={false}>
		<div className={'jumbo-logo'}>
			<KardissimoScene/>
		</div>
		<Header
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
	</AppPage>;
};
