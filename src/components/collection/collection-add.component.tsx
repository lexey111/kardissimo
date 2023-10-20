import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {createDefaultCollection} from "../../store/data/collections-store.actions.ts";

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();

	const addCollection = useCallback(() => {
		const id = createDefaultCollection();

		navigate(`/collections/${id}/details?new`, {preventScrollReset: true});
	}, []);

	return <button onClick={addCollection}
	               className={'pure-button pure-button-primary'}>New collection...</button>;
};
