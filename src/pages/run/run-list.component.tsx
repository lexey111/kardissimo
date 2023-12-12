import React, {useCallback, useEffect, useRef, useState} from "react";
import {RunCardboxCard} from "./run-cardbox.card.tsx";
import {TSCardbox} from "../../store/cardboxes/types-cardbox.ts";
import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import {RunListDialog} from "./run-list.dialog.tsx";
import {useNavigate} from "react-router-dom";
import {RunNoData} from "./run-no-data.component.tsx";
import {useCardboxes} from "../../store/cardboxes/hooks/useCardboxesHook.tsx";
import {WaitGlobal} from "../../components/utils/wait-global.component.tsx";


export type TRunListProps = {
	preOpenId?: number;
}
export const RunList: React.FC<TRunListProps> = ({preOpenId}) => {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const {data: cardboxes, isLoading} = useCardboxes();

	const currentCardbox = useRef<TSCardbox>();

	const handleRun = useCallback((data: {
		order: 'random' | 'linear',
		chunk: 'random' | 'exact',
		side: number, // -1 === random
		from: number,
		to: number
	}) => {
		setOpen(false);
		navigate(`/session/${currentCardbox.current?.id}?order=${data.order}&chunk=${data.chunk}&side=${data.side}&from=${data.from}&to=${data.to}`);
	}, [open]);

	const handleOpen = useCallback((id: number) => {
		currentCardbox.current = cardboxes?.find(c => c.id === id);
		if (currentCardbox.current) {
			setOpen(true);
		}
	}, [open]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [open]);

	useEffect(() => {
		if (preOpenId) {
			handleOpen(preOpenId);
		}
	}, [preOpenId]);

	if (isLoading) {
		return <WaitGlobal text={'Loading data...'}/>;
	}

	if (!cardboxes || cardboxes.length === 0) {
		return <RunNoData/>;
	}

	return <div className={'run-list'}>
		<PageHeader
			hasBack={false}
			noBg={true}
			title={'Select a card box to run'}
			image={<CardboxScene type={'run'}/>}
		/>

		<div className={'run-cardboxes'}>
			{cardboxes.map(cardbox => {
				return <RunCardboxCard key={cardbox.id} cardbox={cardbox} onRun={handleOpen}/>
			})}
		</div>

		{currentCardbox.current && <RunListDialog
			isOpen={open}
			handleRun={handleRun}
			handleClose={handleClose}
			currentCardbox={currentCardbox.current}/>}
	</div>;
};
