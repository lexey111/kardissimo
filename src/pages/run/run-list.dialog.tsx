import React, {useCallback, useEffect, useState} from "react";
import {Button} from "../../components/utils/button.component.tsx";
import {Modal} from "../../components/utils/modal-component.tsx";
import {FaArrowLeft, FaPlayCircle} from "react-icons/fa";
import {TCollection} from "../../store/data/types.ts";
import {RadioGroup} from "@headlessui/react";
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";
import {PiExamFill} from "react-icons/pi";
import {useScreenSize} from "../../components/utils/useScreenSize.hook.tsx";
import {CardPreview} from "../collection/sub-pages/card/card-preview-component.tsx";
import {defaultCollection} from "../../store/data/collections-store.selectors.ts";
import Slider from "rc-slider";
import {FaShuffle} from "react-icons/fa6";
import {MdOutlineLinearScale} from "react-icons/md";
import {GiCardRandom} from "react-icons/gi";
import {LuPieChart} from "react-icons/lu";
import {SlTarget} from "react-icons/sl";

export type TRunListDialogProps = {
	currentCollection: TCollection
	isOpen: boolean
	handleRun: (order: string, side: number, num: number) => void
	handleClose: () => void
}

export const RunListDialog: React.FC<TRunListDialogProps> = ({currentCollection, handleRun, handleClose, isOpen}) => {

	const [advanced, setAdvanced] = useState(false);

	const [order, setOrder] = useState<string>('random');
	const [pieceType, setPieceType] = useState<string>('random');
	const [startIndex, setStartIndex] = useState<number>(0); // none

	const [side, setSide] = useState(0);
	const [chunkSize, setChunkSize] = useState(10);

	const [rangeState, setRangeState] = useState({
		lowerBound: 1,
		upperBound: 10,
		value: [0, 10],
	});

	const cardCount = currentCollection?.cards?.length || 0;

	const {show} = useScreenSize(1100);

	useEffect(() => {
		if (currentCollection) {
			setOrder('random');

			setPieceType('random');

			setStartIndex(0);

			setSide(0);

			setChunkSize(10);

			setRangeState({
				lowerBound: 1,
				upperBound: cardCount,
				value: [1, cardCount > 10 ? 10 : cardCount]
			})

		}
	}, [currentCollection]);

	useEffect(() => {
		if (!currentCollection) {
			return;
		}

		if (cardCount > 0 && cardCount < chunkSize) {
			if (cardCount >= 5) {
				setChunkSize(5);
			} else {
				setChunkSize(cardCount);
			}
		}
	}, [currentCollection, chunkSize]);

	const onRun = () => {
		handleRun(order, side, chunkSize);
	}

	const chunkList = [];
	const chunkStartPoints: Array<number> = [];
	for (let i = 0; i < cardCount; i += chunkSize) {
		chunkStartPoints.push(i);
		chunkList.push({
			label: (i + 1) + '..' + (i + chunkSize <= cardCount ? i + chunkSize : cardCount),
			startIndex: i
		});
	}

	useEffect(() => {
		if (!currentCollection) {
			return;
		}
		if (!chunkStartPoints.includes(startIndex)) {
			const nearest = chunkStartPoints.find(val => val >= startIndex);
			if (nearest && nearest >= 0) {
				setStartIndex(nearest);
				return;
			}
			// set the last one
			setStartIndex(chunkStartPoints[chunkStartPoints.length - 1]);
		}
		if (chunkSize === cardCount) {
			setStartIndex(0);
		}
	}, [chunkSize, startIndex]);

	const handleRangeChange = useCallback((v: any) => {
		setRangeState({
			lowerBound: 1,
			upperBound: cardCount,
			value: v
		});
	}, [rangeState]);


	if (!currentCollection) {
		return null;
	}

	const facesData = {...defaultCollection};
	const marksGen: any = {'10': 10};
	for (let i = 20; i <= cardCount; i += 20) {
		marksGen[i] = i === cardCount ? 'All' : i;
	}
	if (marksGen[marksGen.length - 1] !== cardCount) {
		marksGen[cardCount] = 'All';
	}

	const marksGenAdv: any = {'1': 1};
	for (let i = 20; i <= cardCount; i += 20) {
		marksGenAdv[i] = i;
	}
	if (marksGenAdv[marksGenAdv.length - 1] !== cardCount) {
		marksGenAdv[cardCount] = cardCount;
	}

	const showChunkSizeSelector = !advanced && cardCount > 10;
	const showChunkSizeSelectorAdv = advanced && cardCount >= 20;
	const showChunkTypeSelector = cardCount > chunkSize;
	const showChunkSelector = !advanced && pieceType === 'exact' && cardCount > chunkSize;
	const showOrderSelector = ((pieceType === 'exact' || advanced) && cardCount > 2) || (cardCount <= 10);
	const showAdvanced = cardCount >= 20;

	return <Modal
		open={isOpen}
		type={'normal'}
		onClose={handleClose}
		title={<span className={'title-normal'}><PiExamFill/>Start drill</span>}
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
			<div className={'dialog-form'}>

				{showChunkSizeSelectorAdv && <>
					<fieldset>
						<label>Cards {rangeState.value[0]}..{rangeState.value[1]} &nbsp;
							<span className={'badge badge-blue'}>{rangeState.value[1] - rangeState.value[0] + 1}</span>
						</label>
						<Slider min={rangeState.lowerBound}
						        className={'range-slider'}
						        range={true}
						        max={rangeState.upperBound}
						        dots={false}
						        marks={marksGenAdv}
						        value={rangeState.value}
						        onChange={handleRangeChange as any}
						        step={1}/>

					</fieldset>
				</>}

				{showChunkSizeSelector && <fieldset>
					<label>Chunk size – {chunkSize}</label>
					<Slider min={10}
					        max={cardCount}
					        dots={true}
					        marks={marksGen}
					        value={chunkSize}
					        onChange={setChunkSize as any}
					        step={10}/>

					{showChunkTypeSelector && <>
						<label>As –</label>

						<RadioGroup value={pieceType} onChange={setPieceType}
						            className={'run-radiogroup radiogroup-row'}>
							<RadioGroup.Option value={'random'}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										<b><GiCardRandom/> {chunkSize} random cards</b>
								</span>
								)}
							</RadioGroup.Option>
							<RadioGroup.Option value={'exact'}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										<b><LuPieChart/> {chunkSize === cardCount ? 'All the cards' : 'A chunk...'}</b>
								</span>
								)}
							</RadioGroup.Option>
						</RadioGroup>
					</>}
				</fieldset>}

				{showChunkSelector && <fieldset>
					<label>Choose the chunk
						({startIndex + 1}...{startIndex + chunkSize < cardCount ? startIndex + chunkSize : cardCount}):</label>
					<RadioGroup value={startIndex} onChange={setStartIndex}
					            className={'run-radiogroup radiogroup-row'}>
						{chunkList.map(piece => {
							return <RadioGroup.Option value={piece.startIndex} key={piece.label}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										{piece.label}
								</span>
								)}
							</RadioGroup.Option>;
						})}
					</RadioGroup>
				</fieldset>}

				{showOrderSelector && <fieldset>
					<label>Card order:</label>
					<RadioGroup value={order} onChange={setOrder} className={'run-radiogroup radiogroup-row'}>
						<RadioGroup.Option value={'random'}>
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									<b><FaShuffle/> Shuffle</b>
								</span>
							)}
						</RadioGroup.Option>
						<RadioGroup.Option value={'linear'}>
							{({checked}) => (
								<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
									<b><MdOutlineLinearScale/> Linear, one by one</b>
								</span>
							)}
						</RadioGroup.Option>
					</RadioGroup>
				</fieldset>}

				<fieldset>
					<label>Card side to show first: </label>
					<RadioGroup value={side} onChange={setSide} className={'run-radiogroup radiogroup-row'}>
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

				</fieldset>
			</div>
		</div>}
		actions={<>
			{showAdvanced && <Button type={'secondary'}
			                           pressed={advanced}
			                           variant={'align-left'}
			                           icon={<SlTarget/>}
			                           onClick={() => setAdvanced(v => !v)}>Fine tune</Button>}

			<Button type={'secondary'} onClick={handleClose} icon={<FaArrowLeft/>}>Cancel (Esc)</Button>
			<Button type={'success'} icon={<FaPlayCircle/>} onClick={onRun}>Start</Button>
		</>}
	/>;
};
