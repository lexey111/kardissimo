import React from "react";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";
import {CollectionDetailsData} from "./collection-details.data.tsx";

export const CollectionDetailsSubpage: React.FC = () => {
	return <AppSubPage>
		<CollectionDetailsData/>
	</AppSubPage>;
};
