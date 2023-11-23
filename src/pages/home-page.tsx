import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Header} from "../components/utils/header.component.tsx";
import {KardissimoScene} from "../components/presentation/kardissimo-scene.tsx";

export const HomePage: React.FC = () => {
	return <AppPage title={'Home page'} authOnly={false}>
		<div className={'jumbo-logo'}>
			<KardissimoScene/>
		</div>

		<Header
			title={'Home'}
			subtitle={'Welcome here! How do you do?'}
		/>
		<div className={'page-32'}>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, adipisci cum dolore exercitationem
				inventore minus quaerat quam quis tempora voluptate. Et nostrum perferendis tempora temporibus? Corporis
				illum magni provident quidem.</p>
		</div>
	</AppPage>;
};
