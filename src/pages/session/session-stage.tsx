import React, {useCallback, useEffect, useState} from "react";
import {MdRotateRight} from "react-icons/md";
import {TPreparedCards} from "../../store/data/types.ts";
import {SessionScene} from "../../components/3d/session-scene.component.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import {IoIosCheckmarkCircle} from "react-icons/io";

export type TSessionSceneProps = {
	cards: TPreparedCards
	onDone: () => void
	side: number
}

export const SessionStage: React.FC<TSessionSceneProps> = ({cards, side, onDone}) => {
	const [cardIdx, setCardIdx] = useState(0);

	const [cardSide, setCardSide] = useState(side !== -1 ? side : 0);
	const [locked, setLocked] = useState(true);

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

	useEffect(() => {
		window.addEventListener('keyup', handleKeys);
		return () => {
			window.removeEventListener('keyup', handleKeys);
		}
	}, [handleKeys]);

	let percentage = Math.floor(((cardIdx + 1) / cards.length) * 1000) / 10;
	if (cardIdx === 0 && percentage >= 10) {
		percentage = 4;
	}

	if (cardIdx === cards.length - 1) {
		percentage = 100;
	}

	return <>
		<div className={'scene-main'}>
			<SessionScene
				card={cards[cardIdx]}
				prevCard={cardIdx > 0 ? cards[cardIdx - 1] : void 0}
				nextCard={cardIdx < cards.length - 1 ? cards[cardIdx + 1] : void 0}
				onSetSide={handleSetSide}
				direction={direction}
				onCompleteAnimation={handleCompleteAnimation}
				percent={percentage}
				side={cardSide}/>
		</div>

		<div className={'scene-controls'}>
			<div
				className={'sc-button icon-only' + (cardIdx === 0 ? ' disabled' : '')}
				onClick={handlePrevious}>
				<FaArrowLeft data-tooltip-id="left-tooltip"/>
				<Tooltip
					variant={'info'}
					delayShow={1000}
					id="left-tooltip" place={'left'}>
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
					id="right-tooltip" place={'right'}>
					Right Arrow, Enter
				</Tooltip>
			</div>
			<div
				className={'sc-button'}
				onClick={onDone}>
				<IoIosCheckmarkCircle/> Done
			</div>

			<div className={'scene-progress-outer'}>
				<div className={'scene-progress-inner'} style={{width: percentage + '%'}}></div>
			</div>
		</div>
	</>
};
