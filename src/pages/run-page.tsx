import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {Outlet} from "react-router-dom";

export const RunPage: React.FC = () => {
	// mostly - guard
	return <AppPage title={'Run'}>
		<div className={'sub-page'}>
			<Outlet/>
		</div>
	</AppPage>;
};
