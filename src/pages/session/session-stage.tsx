import React, {useCallback, useEffect, useState} from "react";
import {MdRotateRight} from "react-icons/md";
import {TPreparedCards} from "../../store/cardboxes/types-cardbox.ts";
import {SessionScene} from "../../components/3d/session-scene.component.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {Button} from "../../components/utils/button.component.tsx";

export type TSessionSceneProps = {
	cards: TPreparedCards
	onDone: () => void
	side: number
}

export const SessionStage: React.FC<TSessionSceneProps> = ({cards, side, onDone}) => {
	const [cardIdx, setCardIdx] = useState(0);
	const [shownCards, setShownCards] = useState(new Array(cards.length).fill(false));
	const [allShown, setAllShown] = useState(false);

	const [cardSide, setCardSide] = useState(side !== -1 ? side : 0);
	const [locked, setLocked] = useState(true);
	const [delayedShow, setDelayedShow] = useState(true);

	const [direction, setDirection] = useState<'left' | 'right'>('left');

	const handleCompleteAnimation = useCallback(() => {
		setLocked(false);
	}, []);

	const handleSetSide = useCallback((side: number) => {
		setCardSide(() => side);
	}, [setCardSide]);

	const handleRotate = useCallback(() => {
		if (locked) {
			return;
		}
		// 0 -> 1 -> 0...
		if (cardSide === 1) {
			handleSetSide(0);
		} else {
			handleSetSide(1);
		}
	}, [cardSide, locked]);

	const handlePrevious = useCallback(() => {
		if (locked || cardIdx === 0) {
			return;
		}
		setLocked(true);
		handleSetSide(0);
		setDirection('left');
		setCardIdx(v => v > 0 ? v - 1 : v);
	}, [cardIdx, handleSetSide, locked, side]);

	const handleNext = useCallback(() => {
		if (locked || cardIdx === cards.length - 1) {
			return;
		}
		setLocked(true);
		handleSetSide(0);
		setDirection('right');
		setCardIdx(v => v < cards.length - 1 ? v + 1 : v);
	}, [cardIdx, cards.length, handleSetSide, locked, side]);

	const gotoCard = useCallback((idx: number) => {
		setLocked(true);
		handleSetSide(0);
		if (Math.abs(idx - cardIdx) > 1) {

			setDelayedShow(false);
			setTimeout(() => {
				setDelayedShow(true);
			}, 20);
		}
		setDirection(idx > cardIdx ? 'right' : 'left');
		setCardIdx(() => idx);
	}, [cardIdx, handleSetSide, locked, side]);

	const handleKeys = useCallback((e: KeyboardEvent) => {
		if (e.key === ' ') {
			handleRotate();
			e.preventDefault();
			e.stopImmediatePropagation();
			return false;
		}

		if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
			handlePrevious();
			e.preventDefault();
			e.stopImmediatePropagation();
			return false;
		}

		if (e.key === 'ArrowRight' || e.key === 'Enter') {
			handleNext();
			e.preventDefault();
			e.stopImmediatePropagation();
			return false;
		}
	}, [handleNext, handlePrevious, handleRotate]);

	const closeConfirmation = useCallback(() => {
		window.focus();

		if (document.activeElement && (document.activeElement as any)['blur']) {
			(document.activeElement as any)['blur']();
		}
	}, []);

	const confirmExit = useCallback(() => {
		console.log('confirm exit')
		onDone();
	}, []);

	useEffect(() => {
		window.addEventListener('keyup', handleKeys);
		return () => {
			window.removeEventListener('keyup', handleKeys);
		}
	}, [handleKeys]);

	useEffect(() => {
		setShownCards(v => v.map((x, idx) => idx === cardIdx ? true : x));
	}, [cardIdx]);

	useEffect(() => {
		setAllShown(() => shownCards.every(Boolean));
	}, [shownCards]);

	return <>
		<div className={'scene-main'}>
			{delayedShow && <SessionScene
				card={cards[cardIdx]}
				prevCard={cardIdx > 0 ? cards[cardIdx - 1] : void 0}
				nextCard={cardIdx < cards.length - 1 ? cards[cardIdx + 1] : void 0}
				onSetSide={handleSetSide}
				direction={direction}
				onCompleteAnimation={handleCompleteAnimation}
				side={cardSide}/>
			}
		</div>

		<div className={'scene-controls'}>
			<div
				className={'sc-button icon-only' + (cardIdx === 0 ? ' disabled' : '')}
				onClick={handlePrevious}>
				<FaArrowLeft data-tooltip-id="left-tooltip"/>
				<Tooltip
					variant={'info'}
					delayShow={1000}
					id="left-tooltip" place={'top'}>
					Left Arrow, Backspace
				</Tooltip>
			</div>
			<div
				className={'sc-button'}
				onClick={handleRotate}>
				<MdRotateRight/> SPACE
			</div>
			<div
				className={'sc-button icon-only' + (cardIdx === cards.length - 1 ? ' disabled' : '')}
				onClick={handleNext}>
				<FaArrowRight data-tooltip-id="right-tooltip"/>
				<Tooltip
					variant={'info'}
					delayShow={1000}
					id="right-tooltip" place={'top'}>
					Right Arrow, Enter
				</Tooltip>
			</div>
			<div
				className={'sc-button' + (allShown ? ' all-ready' : '')}
				tabIndex={0}
				onClick={() => allShown && onDone()}>
				<IoIosCheckmarkCircle/> Done

				{!allShown && <div className={'done-confirmation'}>
					<p>Are you sure you want to exit?</p>
					<div>
						<Button type={'secondary'} size={'sm'} onClick={closeConfirmation}>No</Button>
						<Button type={'primary'} size={'sm'} onClick={confirmExit}>Yes</Button>
					</div>
				</div>}

			</div>

			<div className={'scene-progress-outer'}>
				<div className={'scene-progress-text'}>{cardIdx + 1} / {cards.length}</div>
				<div className={'progress-dots'}>
					{shownCards.map((shown, idx) => {
						return <div
							className={'progress-dot' + (shown ? ' shown' : '') + (idx === cardIdx ? ' current' : '')}
							onClick={() => gotoCard(idx)}
							key={idx}>
							<span>{idx + 1}</span>
						</div>;
					})}
				</div>
			</div>
		</div>
	</>
};
