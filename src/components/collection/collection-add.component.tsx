import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {createCollection} from "../../store/data/collections-store.actions.ts";
import {customAlphabet, urlAlphabet} from "nanoid";

const nanoid = customAlphabet(urlAlphabet, 16);

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();

	const addCollection = useCallback(() => {
		const id = nanoid();
		createCollection({
			id,
			title: 'New collection',
			author: '',
			isLocal: true,
			sides: ['English', 'Español']
		});
		navigate(`/collections/${id}/details?new`, {preventScrollReset: true});
	}, []);

	return <button onClick={addCollection}
	               className={'pure-button pure-button-primary'}>New collection...</button>;
};
