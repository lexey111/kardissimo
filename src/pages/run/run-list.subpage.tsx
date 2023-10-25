import React from "react";
import {RunList} from "./run-list.component.tsx";
import {AppSubPage} from "../../components/app-subpage.component.tsx";

export const RunListSubpage: React.FC = () => {
	return <AppSubPage>
		<div className={'page page-1200'}>
			<RunList/>
		</div>
	</AppSubPage>;
};
