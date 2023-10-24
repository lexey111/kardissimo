import React from "react";
import {AppSubPage} from "../../../../components/app-subpage.component.tsx";
import {CollectionDetailsData} from "./collection-details.data.tsx";

export const CollectionDetails: React.FC = () => {
	return <AppSubPage>
		<CollectionDetailsData/>
	</AppSubPage>;
};
