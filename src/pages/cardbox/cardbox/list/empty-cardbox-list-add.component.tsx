import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {BigAddButton} from "../../../../components/utils/big-add-button.component.tsx";

export const EmptyCardboxListAdd: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/cardboxes/new/details', {preventScrollReset: true});
	}, []);

	return <div className={'cardbox-list-add'}>
		<BigAddButton onClick={handleAdd} center/>
	</div>;
};
