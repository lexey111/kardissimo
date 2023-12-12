import React, {useEffect, useState} from "react";
import {RunList} from "./run/run-list.component.tsx";
import {AppPage} from "../components/app-page.component.tsx";
import {useSearchParams} from "react-router-dom";
import {toast} from 'react-toastify';
import {useCardboxes} from "../store/cardboxes/hooks/useCardboxesHook.tsx";
import {WaitGlobal} from "../components/utils/wait-global.component.tsx";


export const RunPage: React.FC = () => {
	const [searchParams] = useSearchParams();
	const id = searchParams?.get('id');
	const cardboxId = parseInt(id || '', 10);
	const {data: cardboxes, isLoading} = useCardboxes();
	const [openDialogWith, setOpenDialogWith] = useState(-1);

	useEffect(() => {
		if (!id || id === 'null') {
			return;
		}
		const targetCardbox = cardboxes?.find(c => c.id === cardboxId);

		if (!targetCardbox || (targetCardbox.cards_count || 0) < 2) {
			// reset parameters
			toast('Card box not found or not ready to run', {
				type: 'error',
				autoClose: 3000,
			});
		} else {
			setOpenDialogWith(cardboxId);
		}
		window.history.replaceState({}, document.title, '/run');
	}, [id]);

	if (isLoading) {
		return <WaitGlobal text={'Loading data...'}/>;
	}

	return <AppPage title={'Run'}>
		<div className={'page-32'}>
			<RunList preOpenId={openDialogWith}/>
		</div>
	</AppPage>;
};
