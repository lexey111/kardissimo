import React from "react";
import {Scene} from "../components/scene/scene-component.tsx";
import {AppPage} from "../components/app-page.component.tsx";

export const ScenePage: React.FC = () => {
	return <AppPage title={'Scene page'}>
		<div className='scenes'>
			<div>
				<Scene/>
			</div>
			<div>
				<Scene/>
			</div>
			<div>
				<Scene/>
			</div>
		</div>
	</AppPage>;
};
