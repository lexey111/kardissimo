import React, {useCallback} from "react";
import {CollectionList} from "./collection-list.component.tsx";
import {AppPage} from "../../../../components/app-page.component.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";
import {useNavigate} from "react-router-dom";

export const CollectionsListSubpage: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);


	return <AppPage title={'Collections page'}>
		<div className={'page-32'}>
			<CollectionList/>
		</div>

		<BigAddFloatingButton onClick={handleAdd} extraHeight={300}/>
	</AppPage>;
};
