import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {BigAddButton} from "../../../../components/utils/big-add-button.component.tsx";

export const CollectionListAddItem: React.FC = () => {
	const navigate = useNavigate();

	const addCollection = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, [navigate]);

	return <div className={'collection-item create-collection'}>
		<div className={'collection-item-content-wrapper'}>
			<div className={'collection-item-content'}>
				<BigAddButton onClick={addCollection}/>
			</div>
		</div>
	</div>;
};
