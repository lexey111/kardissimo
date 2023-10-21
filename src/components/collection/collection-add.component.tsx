import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();

	const addCollection = useCallback(() => {
		// const id = createDefaultCollection();

		navigate('/collections/new/details', {preventScrollReset: true});
	}, []);

	return <button onClick={addCollection}
	               className={'pure-button pure-button-primary'}>New collection...</button>;
};
