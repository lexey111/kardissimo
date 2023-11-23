import React, {useEffect, useState} from "react";
import {RunList} from "./run/run-list.component.tsx";
import {AppPage} from "../components/app-page.component.tsx";
import {useSearchParams} from "react-router-dom";
import {ICollectionState, useCollectionStore} from "../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {toast} from 'react-toastify';

const selector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0);

export const RunPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams?.get('id');
	const collections = useCollectionStore(useShallow(selector));
	const [openDialogWith, setOpenDialogWith] = useState('');

	useEffect(() => {
		if (!id || id === 'null') {
			return;
		}
		const targetCollection = collections.find(c => c.id === id);

		if (!targetCollection || (targetCollection.cards?.length || 0) < 2) {
			// reset parameters
			toast('Collection not found or not ready to run', {
				position: 'top-center',
				type: 'error',
				autoClose: 3000,
			});
		} else {
			setOpenDialogWith(id);
		}
		window.history.replaceState({}, document.title, '/run');
	}, [id]);

	return <AppPage title={'Run'}>
		<div className={'page-32'}>
			<RunList preOpenId={openDialogWith}/>
		</div>
	</AppPage>;
};
