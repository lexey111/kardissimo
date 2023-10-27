import React from "react";
import {RunList} from "./run/run-list.component.tsx";
import {AppSubPage} from "../components/app-subpage.component.tsx";

export const RunPage: React.FC = () => {
	return <AppSubPage>
		<div className={'page page-1200'}>
			<RunList/>
		</div>
	</AppSubPage>;
};
