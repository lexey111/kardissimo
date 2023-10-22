import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {countCollections} from "../../store/data/collections-store.selectors.ts";
import {IoIosAddCircle} from "react-icons/io";

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();
	const count = countCollections();

	const addCollection = useCallback(() => {
		// const id = createDefaultCollection();

		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);

	return <div className={'add-new-collection' + (count === 0 ? ' empty-collection-list' : '')}>
		{count > 0 && <button onClick={addCollection}
		                      className={'pure-button pure-button-primary'}>
			<IoIosAddCircle/> New collection...
		</button>}

		{count === 0 && <div>
			<div className={'add-card-floating'}
			     onClick={addCollection}>
				<IoIosAddCircle/>
			</div>

			<div className={'empty-message'}>
				<p>
					There are no collections here yet. Just create the first one!
				</p>
			</div>
		</div>}
	</div>;
};
