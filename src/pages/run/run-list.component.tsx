import React, {useCallback, useEffect, useRef, useState} from "react";
import {ICardboxState, useCardboxStore} from "../../store/data/cardboxes-store.ts";
import {useShallow} from "zustand/react/shallow";
import {RunCardboxCard} from "./run-cardbox.card.tsx";
import {TCardbox} from "../../store/data/types.ts";
import {CardboxScene} from "../../components/3d/cardbox-scene.component.tsx";
import {PageHeader} from "../../components/utils/page-header.component.tsx";
import {RunListDialog} from "./run-list.dialog.tsx";
import {useNavigate} from "react-router-dom";
import {RunNoData} from "./run-no-data.component.tsx";

const selector = (state: ICardboxState) => state.cardboxes.filter(c => c.cards && c.cards?.length > 0);

export type TRunListProps = {
	preOpenId?: string;
}

export const RunList: React.FC<TRunListProps> = ({preOpenId}) => {
	const navigate = useNavigate();
	const cardboxes = useCardboxStore(useShallow(selector));
	const [open, setOpen] = useState(false);

	const currentCardbox = useRef<TCardbox>();

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

	const handleOpen = useCallback((id: string) => {
		currentCardbox.current = cardboxes.find(c => c.id === id);
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
