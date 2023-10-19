import React from "react";
import {AppSubPage} from "../../../components/app-subpage.component.tsx";
import {useParams} from "react-router-dom";
import {useCardNavigateHook} from "../../../components/utils/useCardNavigate.hook.tsx";

export const CollectionStat: React.FC = () => {
	const params = useParams();
	const {resetPosition} = useCardNavigateHook(params.id, '');
	resetPosition();

	return <AppSubPage>
		<p>Stat</p>
	</AppSubPage>;
};
