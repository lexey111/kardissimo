import React, {useCallback} from "react";
import {IoIosAddCircle} from "react-icons/io";
import {useNavigate} from "react-router-dom";

export const CollectionListAdd: React.FC = () => {
	const navigate = useNavigate();

	const handleAdd = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);

	const handleEnter = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleAdd();
		}
	}, []);

	return <div className={'collection-list-add'}>
		<div className={'item-create'} onClick={handleAdd}
		     onKeyDown={handleEnter}
		     tabIndex={0}>

			<IoIosAddCircle/>
		</div>
	</div>;
};
