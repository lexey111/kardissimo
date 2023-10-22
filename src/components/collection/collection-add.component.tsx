import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {countCollections} from "../../store/data/collections-store.selectors.ts";
import {IoIosAddCircle} from "react-icons/io";

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();
	const count = countCollections();

	const addCollection = useCallback(() => {
		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);

	if (count === 0) {
		return null;
	}

	return <div className={'add-new-collection'}>
		<button onClick={addCollection}
		        className={'pure-button pure-button-primary'}>
			<IoIosAddCircle/> New collection...
		</button>
	</div>;
};
