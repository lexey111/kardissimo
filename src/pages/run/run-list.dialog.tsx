import React, {useCallback, useEffect, useState} from "react";
import {Button} from "../../components/utils/button.component.tsx";
import {Modal} from "../../components/utils/modal-component.tsx";
import {FaArrowLeft, FaPlayCircle} from "react-icons/fa";
import {TSCardbox, TSCardboxKey} from "../../store/cardboxes/types-cardbox.ts";
import {RadioGroup} from "@headlessui/react";
import {ImRadioChecked, ImRadioUnchecked} from "react-icons/im";
import {PiExamFill} from "react-icons/pi";
import {useScreenSize} from "../../hooks/useScreenSize.hook.tsx";
import Slider from "rc-slider";
import {FaShuffle} from "react-icons/fa6";
import {MdOutlineLinearScale} from "react-icons/md";
import {GiCardRandom} from "react-icons/gi";
import {LuPieChart} from "react-icons/lu";
import {ChoosePreview} from "../../components/3d/choose-preview-component.tsx";
import {Switch} from "../../components/utils/switch.component.tsx";

export type TRunListDialogProps = {
	currentCardbox: TSCardbox
	isOpen: boolean
	handleRun: (data: {
		order: 'random' | 'linear',
		chunk: 'random' | 'exact'
		side: number,
		from: number,
		to: number
	}) => void
	handleClose: () => void
}

export const RunListDialog: React.FC<TRunListDialogProps> = ({currentCardbox, handleRun, handleClose, isOpen}) => {

	const [advanced, setAdvanced] = useState(false);

	const [order, setOrder] = useState<'random' | 'linear'>('random');
	const [pieceType, setPieceType] = useState<'random' | 'exact'>('random');
	const [startIndex, setStartIndex] = useState<number>(0); // none

	const [side, setSide] = useState(0);
	const [chunkSize, setChunkSize] = useState(10);

	const [rangeState, setRangeState] = useState({
		lowerBound: 1,
		upperBound: 10,
		value: [0, 10],
	});

	const cardCount = currentCardbox?.cards_count || 0;

	const {show} = useScreenSize(1100);

	const resetAll = useCallback(() => {
		setAdvanced(false);

		setOrder('random');

		setPieceType('random');

		setStartIndex(0);

		setSide(0);

		setChunkSize(10);

		setRangeState({
			lowerBound: 1,
			upperBound: cardCount,
			value: [1, cardCount > 10 ? 10 : cardCount]
		});
	}, [cardCount])

	useEffect(() => {
		if (currentCardbox) {
			resetAll();
		}
	}, [currentCardbox, resetAll]);

	const onClose = useCallback(() => {
		resetAll();
		handleClose();
	}, [handleClose, resetAll]);

	useEffect(() => {
		if (!currentCardbox) {
			return;
		}

		if (cardCount > 0 && cardCount < chunkSize) {
			if (cardCount >= 5) {
				setChunkSize(5);
			} else {
				setChunkSize(cardCount);
			}
		}
	}, [currentCardbox, chunkSize, cardCount]);

	const onRun = () => {
		if (advanced) {
			handleRun({
				order: order, // random, linear
				side: side, // 0, 1...
				chunk: 'exact',
				from: rangeState.value[0] - 1, // 10
				to: rangeState.value[1] - 1, // 20
			});
		} else {
			handleRun({
				order: order, // random, linear
				side: side, // 0, 1...
				chunk: pieceType,
				from: startIndex, // 10
				to: Math.min(startIndex + chunkSize - 1, cardCount - 1)
			});
		}
	}

	const chunkList = [];
	const chunkStartPoints: Array<number> = [];
	for (let i = 0; i < cardCount; i += chunkSize) {
		chunkStartPoints.push(i);
		chunkList.push({
			label: (i + 1) + '..' + Math.min(i + chunkSize, cardCount),
			startIndex: i
		});
	}

	useEffect(() => {
		if (!currentCardbox) {
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
	}, [cardCount, chunkSize, chunkStartPoints, currentCardbox, startIndex]);

	const handleRangeChange = useCallback((v: any) => {
		setRangeState({
			lowerBound: 1,
			upperBound: cardCount,
			value: v
		});
	}, [cardCount]);


	if (!currentCardbox) {
		return null;
	}

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
	const showChunkTypeSelector = cardCount >= chunkSize;
	const showChunkSelector = !advanced && pieceType === 'exact' && cardCount > chunkSize;
	const showOrderSelector = ((pieceType === 'exact' || advanced) && cardCount > 2) || (cardCount <= 10);
	const showAdvanced = cardCount >= 20;

	const sideText = (currentCardbox[`side${side + 1}title` as TSCardboxKey] as string || 'Random') + ' side';
	const modeText = advanced
		? 'Fine selection'
		: pieceType === 'random'
			? 'Random set'
			: 'Cards ' + (startIndex + 1) + '...' + (startIndex + chunkSize < cardCount ? startIndex + chunkSize : cardCount);

	// {startIndex + 1}...{startIndex + chunkSize < cardCount ? startIndex + chunkSize : cardCount}
	const amount = advanced
		? rangeState.value[1] - rangeState.value[0] + 1
		: (startIndex + chunkSize < cardCount ? startIndex + chunkSize : cardCount) - startIndex// chunkSize;

	return <Modal
		open={isOpen}
		type={'normal'}
		onClose={onClose}
		title={<span className={'title-normal'}><PiExamFill/>Start drill</span>}
		description={<span>
			You are one step away from learning the <b>{currentCardbox?.title}</b> set of cards,
			which includes <b>{cardCount}</b> cards. Just set up a few drill options:
		</span>}
		sideElement={show && <div className={'run-dialog-scene'}>
			<ChoosePreview
				total={cardCount}
				delay={500}
				mode={modeText}
				side={sideText}
				isRandom={(!advanced && pieceType === 'random') || (order === 'random')}
				amount={amount}/>
		</div>}
		body={<div className={'run-dialog-content'}>
			<div className={'dialog-form'}>

				{showChunkSizeSelectorAdv && <>
					<fieldset>
						<label>Cards {rangeState.value[0]}..{rangeState.value[1]} &nbsp;
							<span className={'badge badge-blue'}>{rangeState.value[1] - rangeState.value[0] + 1}</span>
						</label>
						<Slider
							min={rangeState.lowerBound}
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
					<Slider
						min={10}
						max={cardCount}
						dots={true}
						marks={marksGen}
						value={chunkSize}
						onChange={setChunkSize as any}
						step={10}/>

					{showChunkTypeSelector && <>
						<label className={'secondary-label'}>And display –</label>

						<RadioGroup
							value={pieceType} onChange={setPieceType}
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
					<RadioGroup
						value={startIndex} onChange={setStartIndex}
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
						{[1, 2].map((side, idx) => {
							return <RadioGroup.Option value={idx} key={idx}>
								{({checked}) => (
									<span className={checked ? 'radio-checked' : ''}>
									{checked ? <ImRadioChecked/> : <ImRadioUnchecked/>}
										{currentCardbox[`side${side}title` as TSCardboxKey] as string}
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
			{showAdvanced && <div className={'align-left'}>
				<Switch text={'Fine tune'} boldOnFocus={false} value={advanced} onChange={setAdvanced}/>
			</div>}

			<Button type={'secondary'} onClick={onClose} icon={<FaArrowLeft/>}>Cancel (Esc)</Button>
			<Button type={'success'} icon={<FaPlayCircle/>} onClick={onRun}>Start</Button>
		</>}
	/>;
};
