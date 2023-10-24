import React from "react";
import {AppPage} from "../components/app-page.component.tsx";
import {RunList} from "./run/run-list.component.tsx";

export const RunPage: React.FC = () => {
	return <AppPage title={'Run'}>
		<div className={'page page-1200'}>
			<RunList/>
		</div>
	</AppPage>;
};
