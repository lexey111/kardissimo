import React, {useEffect, useState} from "react";
import {Button} from "../../components/utils/button.component.tsx";
import {Modal} from "../../components/utils/modal-component.tsx";
import {FaPlayCircle} from "react-icons/fa";
import {TCollection} from "../../store/data/types.ts";
import {RadioGroup} from "@headlessui/react";
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";
import {PiExamFill} from "react-icons/pi";
import {useScreenSize} from "../../components/utils/useScreenSize.hook.tsx";
import {CardPreview} from "../collection/sub-pages/card/card-preview-component.tsx";
import {defaultCollection} from "../../store/data/collections-store.selectors.ts";

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

export type TRunListDialogProps = {
	currentCollection: TCollection
	isOpen: boolean
	handleRun: (order: string, side: number, num: number) => void
	handleClose: () => void
}

export const RunListDialog: React.FC<TRunListDialogProps> = ({currentCollection, handleRun, handleClose, isOpen}) => {
	const [order, setOrder] = useState<string>('random');
	const [side, setSide] = useState(0);
	const [numOfCards, setNumOfCards] = useState(10);

	const cardCount = currentCollection?.cards?.length || 0;

	const {show} = useScreenSize(1100);

	useEffect(() => {
		if (currentCollection) {
			setOrder('random');
			setSide(0);
			setNumOfCards(10);
		}
	}, [currentCollection]);

	useEffect(() => {
		if (!currentCollection) {
			return;
		}

		if (cardCount > 0 && cardCount < numOfCards) {
			if (cardCount >= 5) {
				setNumOfCards(5);
			} else {
				setNumOfCards(-1);
			}
		}
	}, [currentCollection, numOfCards]);

	const onRun = () => {
		handleRun(order, side, numOfCards);
	}

	if (!currentCollection) {
		return null;
	}

	const facesData = {...defaultCollection};

	return <Modal
		open={isOpen}
		type={'normal'}
		onClose={handleClose}
		title={<span className={'title-normal'}><PiExamFill/> Run drill</span>}
		description={<span>
			You are one step away from learning the <b>{currentCollection?.title}</b> set of cards,
			which includes <b>{cardCount}</b> cards. Just set up a few drill options:
		</span>}
		sideElement={show && <div className={'run-dialog-scene'}>
			<CardPreview
				card={facesData}
				disablePreview={true}
				delay={1000}
				side={-1}
			/>
		</div>}
		body={<div className={'run-dialog-content'}>
			<h3>Mode – {OrderTypes[order]}</h3>

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

			<h3>
				Side to show – {SideTypes[side]}
				{side !== -1 && <span>, {currentCollection?.sides?.[Number(side)]?.name}</span>}
			</h3>
			<RadioGroup value={side} onChange={setSide} className={'run-radiogroup'}>

				{currentCollection?.sides?.map((side, idx) => {
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

			<h3>Number – {numOfCards === -1 ? 'All (' + cardCount + ')' : numOfCards}</h3>
			<RadioGroup value={numOfCards} onChange={setNumOfCards} className={'run-radiogroup radiogroup-row'}>
				{Amounts.map(a => {

					if (a > cardCount) {
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
		</div>}
		actions={<>
			<Button type={'secondary'} onClick={handleClose}>Cancel (Esc)</Button>
			<Button type={'success'} icon={<FaPlayCircle/>} onClick={onRun}>Go!</Button>
		</>}
	/>;
};
