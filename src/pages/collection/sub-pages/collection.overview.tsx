import React from "react";
import {AppSubPage} from "../../../components/app-subpage.component.tsx";
import {useCardNavigateHook} from "../../../components/utils/useCardNavigate.hook.tsx";
import {useParams} from "react-router-dom";

export const CollectionOverview: React.FC = () => {
	const params = useParams();
	const {resetPosition} = useCardNavigateHook(params.collectionId, '');
	resetPosition();

	return <AppSubPage>
		<p>Overview</p>
	</AppSubPage>;
};
