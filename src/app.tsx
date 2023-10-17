import React from "react";

import {AboutPage} from "./pages/about-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {ScenePage} from "./pages/scene-page.tsx";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {AnimationLayout} from "./components/animation-layout.component.tsx";
import {CollectionCards} from "./pages/collection/sub-pages/cards/collection-cards.tsx";
import {CollectionCardEdit} from "./pages/collection/sub-pages/cards/collection-card.edit.tsx";
import {CollectionsListPage} from "./pages/collection/sub-pages/collections-list.page.tsx";
import {CollectionDetails} from "./pages/collection/sub-pages/collection.details.tsx";
import {CollectionOverview} from "./pages/collection/sub-pages/collection.overview.tsx";
import {CollectionPage} from "./pages/collection/collection.page.tsx";
import {CollectionStat} from "./pages/collection/sub-pages/collection.stat.tsx";
import {CollectionAppearance} from "./pages/collection/sub-pages/collection.appearance.tsx";

export const App: React.FC = () => {
	return <BrowserRouter>
		<div className={'app-page'}>
			<Routes>
				<Route element={<AnimationLayout/>}>
					<Route path="/" element={<HomePage/>}/>

					<Route path="collections" element={<CollectionsListPage/>}/>
				</Route>

				<Route path="collections" element={<CollectionPage/>}>
					<Route element={<AnimationLayout/>}>
						<Route path=":id/overview" element={<CollectionOverview/>}/>
						<Route path=":id/details" element={<CollectionDetails/>}/>
						<Route path=":id/appearance" element={<CollectionAppearance/>}/>
						<Route path=":id/stat" element={<CollectionStat/>}/>
						<Route path=":id/cards" element={<CollectionCards/>}/>
						<Route path=":id/cards/:cardId" element={<CollectionCardEdit/>}/>
					</Route>
				</Route>

				<Route element={<AnimationLayout/>}>
					<Route path="/about" element={<AboutPage/>}/>
					<Route path="/scene" element={<ScenePage/>}/>
				</Route>
			</Routes>
		</div>
	</BrowserRouter>;
};
