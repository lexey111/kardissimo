import React, {useEffect, useState} from "react";
import {RunList} from "./run/run-list.component.tsx";
import {AppPage} from "../components/app-page.component.tsx";
import {useSearchParams} from "react-router-dom";
import {ICollectionState, useCollectionStore} from "../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";

const selector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0);

export const RunPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const id = String(searchParams?.get('id'));
	const collections = useCollectionStore(useShallow(selector));
	const [openDialogWith, setOpenDialogWith] = useState('');

	useEffect(() => {
		if (!id) {
			return;
		}
		const targetCollection = collections.find(c => c.id === id);
		if (!targetCollection || (targetCollection.cards?.length || 0) < 2) {
			// reset parameters
			console.log('reset invalid parameter!');
			window.history.replaceState({}, document.title, '/run');
		} else {
			console.log('open dialog with', id);
			setOpenDialogWith(id);
		}
	}, [id]);

	return <AppPage title={'Run'}>
		<div className={'page page-1200'}>
			<RunList preOpenId={openDialogWith}/>
		</div>
	</AppPage>;
};
