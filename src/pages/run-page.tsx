import React, {useEffect, useState} from "react";
import {RunList} from "./run/run-list.component.tsx";
import {AppPage} from "../components/app-page.component.tsx";
import {useSearchParams} from "react-router-dom";
import {ICardboxState, useCardboxStore} from "../store/data/cardboxes-store.ts";
import {useShallow} from "zustand/react/shallow";
import {toast} from 'react-toastify';

const selector = (state: ICardboxState) => state.cardboxes.filter(c => c.cards && c.cards?.length > 0);

export const RunPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams?.get('id');
	const cardboxes = useCardboxStore(useShallow(selector));
	const [openDialogWith, setOpenDialogWith] = useState('');

	useEffect(() => {
		if (!id || id === 'null') {
			return;
		}
		const targetCardbox = cardboxes.find(c => c.id === id);

		if (!targetCardbox || (targetCardbox.cards?.length || 0) < 2) {
			// reset parameters
			toast('Cardbox not found or not ready to run', {
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
