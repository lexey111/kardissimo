import React from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {nanoid} from "nanoid";

const selector = (state: ICollectionState) => state.add;
export const AddNewCollection: React.FC = () => {
	const add = useCollectionStore(selector);
	const addCollection = () => add({
		title: 'AAA' + nanoid(8),
		isLocal: true,
		author: 'Someone'
	});

	console.log('[AddNewCollection]');
	return <button onClick={addCollection}>Create collection</button>;
};
