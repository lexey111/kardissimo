import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {BigAddButton} from "../../../../components/utils/big-add-button.component.tsx";

export const CardboxListAddItem: React.FC = () => {
	const navigate = useNavigate();

	const addCardbox = useCallback(() => {
		navigate('/cardboxes/new/details', {preventScrollReset: true});
	}, [navigate]);

	return <div className={'cardbox-item create-cardbox'}>
		<div className={'cardbox-item-content-wrapper'}>
			<div className={'cardbox-item-content'}>
				<BigAddButton onClick={addCardbox}/>
			</div>
		</div>
	</div>;
};
