import React from "react";

import {AboutPage} from "./pages/about-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {ScenePage} from "./pages/scene-page.tsx";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {AnimationLayout} from "./components/animation-layout.component.tsx";
import {AppMenu} from "./components/app-menu.component.tsx";
import {CollectionsPage} from "./pages/collection/collections-page.tsx";
import {CollectionNewPage} from "./pages/collection/collection-new-page.tsx";
import {CollectionEditorPage} from "./pages/collection/collection-editor.page.tsx";
import {CardsPage} from "./pages/cards/cards-page.tsx";
import {CardPage} from "./pages/cards/card-page.tsx";

export const App: React.FC = () => {
	return <BrowserRouter>
		<div className={'app-page'}>
			<AppMenu/>
			<Routes>
				<Route element={<AnimationLayout/>}>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/collections" element={<CollectionsPage/>}/>
				</Route>

				<Route path="/collections/new" element={<CollectionNewPage/>}/>
				<Route path="/collections/:id" element={<CollectionEditorPage/>}/>
				<Route path="/collections/:id/cards" element={<CardsPage/>}/>
				<Route path="/collections/:id/cards/:cardId" element={<CardPage/>}/>

				<Route element={<AnimationLayout/>}>
					<Route path="/about" element={<AboutPage/>}/>
					<Route path="/scene" element={<ScenePage/>}/>
				</Route>
			</Routes>
		</div>
	</BrowserRouter>;
};
