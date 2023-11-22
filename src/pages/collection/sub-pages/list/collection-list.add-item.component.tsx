import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {IoIosAddCircle} from "react-icons/io";


export const CollectionListAddItem: React.FC = () => {
	const navigate = useNavigate();

	const addCollection = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, [navigate]);

	return <div className={'collection-item create-collection'} onClick={addCollection}>
		<div className={'collection-item-content-wrapper'}>
			<div className={'collection-item-content'}>
				<div className={'collection-item-create'}>
					<IoIosAddCircle/>
				</div>
			</div>
		</div>
	</div>;
};
