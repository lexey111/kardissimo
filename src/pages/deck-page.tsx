import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {CollectionScene} from "../components/scene/collection-scene.component.tsx";

export const DeckPage: React.FC = () => {
	return <AppPage title={'Home page'}>
		<h1>Decks of cards</h1>
		<div className={'collections'}>
			<div className={'collection-test-1'}>
				<CollectionScene/>
			</div>
			<div className={'collection-test-2'}>
				<CollectionScene/>
			</div>
		</div>
	</AppPage>;
};
