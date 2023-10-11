import React from "react";
import {useNavigate} from "react-router-dom";

export const AddNewCollection: React.FC = () => {
	const navigate = useNavigate();
	const addCollection = () => navigate('/collections/new');

	return <button onClick={addCollection}
	               className={'pure-button pure-button-primary'}>New collection...</button>;
};
