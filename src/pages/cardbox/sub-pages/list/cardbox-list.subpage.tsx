import React, {useCallback} from "react";
import {CardboxList} from "./cardbox-list.component.tsx";
import {AppPage} from "../../../../components/app-page.component.tsx";
import {BigAddFloatingButton} from "../../../../components/utils/big-add-floating-button.component.tsx";
import {useNavigate} from "react-router-dom";
import {PageHeader} from "../../../../components/utils/page-header.component.tsx";
import {CardboxScene} from "../../../../components/3d/cardbox-scene.component.tsx";

export const CardboxesListSubpage: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/cardboxes/new/details', {preventScrollReset: true});
	}, []);


	return <AppPage title={'Cardboxes page'}>
		<div className={'page-32'}>
			<PageHeader
				hasBack={false}
				noBg={true}
				title={'Card boxes'}
				image={<CardboxScene/>}
			/>
			<CardboxList/>
		</div>

		<BigAddFloatingButton onClick={handleAdd} extraHeight={300}/>
	</AppPage>;
};
