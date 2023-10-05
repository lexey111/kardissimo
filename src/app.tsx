import React from "react";

import "./styles.css";
import {Scene} from "./components/scene/scene-component.tsx";

// https://docs.pmnd.rs/react-three-fiber/api/canvas
export const App: React.FC = () => {
	return <div>
		<p>Elements</p>
		<Scene/>
	</div>;
};
