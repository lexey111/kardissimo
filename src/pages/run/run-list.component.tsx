import React, {useCallback, useRef, useState} from "react";
import {ICollectionState, useCollectionStore} from "../../store/data/collections-store.ts";
import {useShallow} from "zustand/react/shallow";
import {PageError} from "../../types.ts";
import {RunCollectionCard} from "./run-collection-card.tsx";
import {Button} from "../../components/utils/button.component.tsx";
import {Modal} from "../../components/utils/modal-component.tsx";
import {FaPlayCircle} from "react-icons/fa";
import {TCollection} from "../../store/data/types.ts";
import {CollectionScene} from "../../components/scene/collection-scene.component.tsx";
import {Header} from "../../components/utils/header.component.tsx";
import {RadioGroup} from "@headlessui/react";
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";

const selector = (state: ICollectionState) => state.collections.filter(c => c.cards && c.cards?.length > 0);

const OrderTypes: Record<string, string> = {
	'random': 'Shuffle (random)',
	'linear': 'Consequential (one by one)'
}

const SideTypes: Record<string, string> = {
	'0': 'first',
	'1': 'second',
	'-1': 'random'
}

const Amounts = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

export const RunList: React.FC = () => {
	const collections = useCollectionStore(useShallow(selector));
	const [open, setOpen] = useState(false);

	const [order, setOrder] = useState<string>('random');
	const [side, setSide] = useState(0);
	const [numOfCards, setNumOfCards] = useState(10);

	const currentCollection = useRef<TCollection>();

	const handleRun = useCallback(() => {
		setOpen(false);
		console.log('redirect to run!')
	}, [open]);

	const handleOpen = useCallback((id: string) => {
		currentCollection.current = collections.find(c => c.id === id);
		if (currentCollection.current && currentCollection.current?.cards) {
			if (currentCollection.current.cards.length < numOfCards) {
				setNumOfCards(() => (currentCollection.current?.cards && currentCollection.current?.cards?.length >= 5 ? 5 : -1));
			}
		}
		setOpen(true);
	}, [open]);


	if (!collections || collections.length === 0) {
		throw new PageError('Unfortunately, there are no collections ready for launch. Please go to the Collections page and fill out at least one.', 'Oops');
	}

	return <div className={'run-list'}>
		<Header
			hasBack={false}
			title={<>Select a collection to run <span className={'badge badge-white'}>{collections.length}</span></>}
			image={<CollectionScene/>}
		/>

		<div className={'run-collections'}>
			{collections.map(collection => {
				return <RunCollectionCard key={collection.id} collection={collection} onRun={handleOpen}/>
			})}
		</div>

		{currentCollection.current && <Modal
			open={open}
			type={'normal'}
			onClose={() => setOpen(false)}
			title={<span className={'title-normal'}>Run drill</span>}
			body={<>
				<p>
					You are close to starting the <b>{currentCollection.current?.title}</b> set training which includes
					cards: {currentCollection.current?.cards?.length}.
					Please, select some parameters of drill:
				</p>
				<div>
					<h2>Mode – {OrderTypes[order]}</h2>

					<RadioGroup value={order} onChange={setOrder} className={'run-radiogroup'}>
						<RadioGroup.Option value="random">
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									Shuffle (random)
								</span>
							)}
						</RadioGroup.Option>
						<RadioGroup.Option value="linear">
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									Consequential
								</span>
							)}
						</RadioGroup.Option>
					</RadioGroup>

					<h2>
						Side to show – {SideTypes[side]}
						{side !== -1 && <span>, {currentCollection.current?.sides?.[Number(side)]?.name}</span>}
					</h2>
					<RadioGroup value={side} onChange={setSide} className={'run-radiogroup'}>

						{currentCollection.current?.sides?.map((side, idx) => {
							return <RadioGroup.Option value={idx} key={idx}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										{side.name}
								</span>
								)}
							</RadioGroup.Option>
						})}

						<RadioGroup.Option value={-1}>
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									Random
								</span>
							)}
						</RadioGroup.Option>
					</RadioGroup>
					<h2>Number – {numOfCards === -1 ? 'All' : numOfCards}</h2>
					<RadioGroup value={numOfCards} onChange={setNumOfCards} className={'run-radiogroup radiogroup-row'}>
						{Amounts.map(a => {

							if (a > currentCollection.current!.cards!.length) {
								return null;
							}

							return <RadioGroup.Option value={a} key={a}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										{a}
								</span>
								)}
							</RadioGroup.Option>;
						})}

						<RadioGroup.Option value={-1}>
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									All
								</span>
							)}
						</RadioGroup.Option>
					</RadioGroup>
				</div>
			</>}
			actions={<>
				<Button type={'secondary'} onClick={() => setOpen(false)}>Cancel (Esc)</Button>
				<Button type={'primary'} icon={<FaPlayCircle/>} onClick={handleRun}>Go!</Button>
			</>}
		/>}
	</div>;
};
