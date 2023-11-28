import React from "react";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";
import {CardboxDetailsData} from "./cardbox-details.data.tsx";

export const CardboxDetailsSubpage: React.FC = () => {
	return <AppSubPage>
		<CardboxDetailsData/>
	</AppSubPage>;
};
