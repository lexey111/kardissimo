import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {BigAddButton} from "../../../../components/utils/big-add-button.component.tsx";

export const EmptyCollectionListAdd: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);

	return <div className={'collection-list-add'}>
		<BigAddButton onClick={handleAdd}/>
	</div>;
};
