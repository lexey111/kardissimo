import React, {useCallback, useEffect, useState} from "react";
import {MdRotateRight} from "react-icons/md";
import {TPreparedCards} from "../../store/data/types.ts";
import {SessionScene} from "../../components/3d/session-scene.component.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";

export type TSessionSceneProps = {
	cards: TPreparedCards
	side: number
}

export const SessionStage: React.FC<TSessionSceneProps> = ({cards, side}) => {
	const [cardIdx, setCardIdx] = useState(0);

	const [cardSide, setCardSide] = useState(side);
	const [locked, setLocked] = useState(false);

	const [direction, setDirection] = useState<'left' | 'right'>('left');

	const handleCompleteAnimation = useCallback(() => {
		setLocked(false);
		console.log('unlocked')
	}, []);

	const handleSetSide = useCallback((side: number) => {
		setCardSide(() => side);
	}, []);

	const handleRotate = useCallback(() => {
		// 0 -> 1 -> 0...
		if (cardSide === 1) {
			handleSetSide(0);
		} else {
			handleSetSide(1);
		}
	}, [cardSide, handleSetSide]);

	const handlePrevious = useCallback(() => {
		if (locked) {
			return;
		}
		setLocked(true);
		handleSetSide(side);
		setDirection('left');
		setCardIdx(v => v > 0 ? v - 1 : v);
	}, [handleSetSide, locked, side]);

	const handleNext = useCallback(() => {
		if (locked) {
			return;
		}
		setLocked(true);
		handleSetSide(side);
		setDirection('right');
		setCardIdx(v => v < cards.length - 1 ? v + 1 : v);
	}, [cards.length, handleSetSide, locked, side]);

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
				side={cardSide}/>
		</div>

		<div className={'scene-controls'}>
			{cardIdx}
			<div
				className={'sc-button icon-left' + (cardIdx === 0 ? ' disabled' : '')}
				onClick={handlePrevious}>
				<FaArrowLeft/> Prev
			</div>
			<div
				className={'sc-button'}
				onClick={handleRotate}>
				SPACE <MdRotateRight/>
			</div>
			<div
				className={'sc-button' + (cardIdx === cards.length - 1 ? ' disabled' : '')}
				onClick={handleNext}>
				Next <FaArrowRight/>
			</div>
			<div className={'scene-progress-outer'}>
				<div className={'scene-progress-inner'} style={{width: percentage + '%'}}></div>
			</div>
		</div>
	</>
};
