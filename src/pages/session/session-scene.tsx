import React, {useCallback, useEffect, useState} from "react";
import {MdRotateRight} from "react-icons/md";
import {TPreparedCards} from "../../store/data/types.ts";
import {Scene} from "../../components/3d/scene-component.tsx";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";

export type TSessionSceneProps = {
	cards: TPreparedCards
	side: number
}

export const SessionScene: React.FC<TSessionSceneProps> = ({cards, side}) => {
	const [cardIdx, setCardIdx] = useState(0);

	const [cardSide, setCardSide] = useState(side);

	const handleRotate = useCallback(() => {
		if (cardSide === cards[0].length - 1) {
			setCardSide(c => c - 1);
		} else {
			setCardSide(c => c + 1);
		}
	}, [cardSide]);

	const handlePrevious = useCallback(() => {
		setCardIdx(v => v > 0 ? v - 1 : v);
	}, [cardIdx]);

	const handleNext = useCallback(() => {
		setCardSide(side);
		setCardIdx(v => v < cards.length - 1 ? v + 1 : v);
	}, [cardIdx]);

	const handleKeys = useCallback((e: KeyboardEvent) => {
		if (e.key === ' ') {
			handleRotate();
			e.preventDefault();
			return false;
		}
		if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
			handlePrevious();
			e.preventDefault();
			return false;
		}
		if (e.key === 'ArrowRight' || e.key === 'Enter') {
			handleNext();
			e.preventDefault();
			return false;
		}
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleKeys);
		return () => {
			window.removeEventListener('keydown', handleKeys);
		}
	}, []);

	let percentage = Math.floor(((cardIdx + 1) / cards.length) * 1000) / 10;
	if (cardIdx === 0 && percentage >= 10) {
		percentage = 4;
	}
	if (cardIdx === cards.length - 1) {
		percentage = 100;
	}

	return <>
		<div className={'scene-main'}>
			<Scene card={cards[cardIdx]}
			       onSetSide={setCardSide}
			       side={cardSide}/>
		</div>

		<div className={'scene-controls'}>
			<div className={'sc-button icon-left' + (cardIdx === 0 ? ' disabled' : '')}
			     onClick={handlePrevious}>
				<FaArrowLeft/> Prev
			</div>
			<div className={'sc-button'}
			     onClick={handleRotate}>
				SPACE <MdRotateRight/>
			</div>
			<div className={'sc-button' + (cardIdx === cards.length - 1 ? ' disabled' : '')}
			     onClick={handleNext}>
				Next <FaArrowRight/>
			</div>
			<div className={'scene-progress-outer'}>
				<div className={'scene-progress-inner'} style={{width: percentage + '%'}}></div>
			</div>
		</div>
	</>
};
