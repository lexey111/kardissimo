import React from "react";

import {AboutPage} from "./pages/about-page.tsx";
import {HomePage} from "./pages/home-page.tsx";
import {ScenePage} from "./pages/scene-page.tsx";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";

export const App: React.FC = () => {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<HomePage/>}/>
			<Route path="/about" element={<AboutPage/>}/>
			<Route path="/scene" element={<ScenePage/>}/>
		</Routes>
	</BrowserRouter>;
};
