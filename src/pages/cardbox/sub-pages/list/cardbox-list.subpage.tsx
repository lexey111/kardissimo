import React, {useCallback} from "react";
import {CardboxList} from "./cardbox-list.component.tsx";
import {AppPage} from "../../../../components/app-page.component.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";
import {useNavigate} from "react-router-dom";

export const CardboxesListSubpage: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/cardboxes/new/details', {preventScrollReset: true});
	}, []);


	return <AppPage title={'Cardboxes page'}>
		<div className={'page-32'}>
			<CardboxList/>
		</div>

		<BigAddFloatingButton onClick={handleAdd} extraHeight={300}/>
	</AppPage>;
};
