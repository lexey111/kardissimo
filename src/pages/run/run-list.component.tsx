import React, {useCallback, useRef, useState} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {PageError} from "../../types.ts";
import {RunCollectionCard} from "./run-collection.card.tsx";
import {TCollection} from "../../store/data/types.ts";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {Header} from "../../components/utils/header.component.tsx";
import {RunListDialog} from "./run-list.dialog.tsx";
import {useNavigate} from "react-router-dom";

const selector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0);

export const RunList: React.FC = () => {
	const navigate = useNavigate();
	const collections = useCollectionStore(useShallow(selector));
	const [open, setOpen] = useState(false);

	const currentCollection = useRef<TCollection>();

	const handleRun = useCallback((data: {
		order: 'random' | 'linear',
		piece: 'random' | 'exact',
		side: number,
		from: number,
		to: number
	}) => {
		setOpen(false);
		navigate(`/session/${currentCollection.current?.id}?order=${data.order}&piece=${data.piece}&side=${data.side}&from=${data.from}&to=${data.to}`);
	}, [open]);

	const handleOpen = useCallback((id: string) => {
		currentCollection.current = collections.find(c => c.id === id);
		setOpen(true);
	}, [open]);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, [open]);


	if (!collections || collections.length === 0) {
		throw new PageError('Unfortunately, there are no collections ready for launch. Please go to the Collections page and fill out at least one.', 'Oops');
	}

	return <div className={'run-list'}>
		<Header
			hasBack={false}
			noBg={true}
			title={<>Select a collection to run <span className={'badge badge-white'}>{collections.length}</span></>}
			image={<CollectionScene/>}
		/>

		<div className={'run-collections'}>
			{collections.map(collection => {
				return <RunCollectionCard key={collection.id} collection={collection} onRun={handleOpen}/>
			})}
		</div>

		{currentCollection.current && <RunListDialog
			isOpen={open}
			handleRun={handleRun}
			handleClose={handleClose}
			currentCollection={currentCollection.current}/>}
	</div>;
};
