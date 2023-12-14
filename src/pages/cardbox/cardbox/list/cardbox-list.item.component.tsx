import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {TSCardbox} from "../../../../store/cardboxes/types-cardbox.ts";
import {getSideColorsBySchema} from "../../../../store/cardboxes/cardboxes-utils.ts";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaPlay} from "react-icons/fa6";
import {CardboxActionsButtons} from "./cardbox-actions-buttons.component.tsx";

export type TCardboxItemProps = {
	cardbox: TSCardbox
}

export const CardboxListItem: React.FC<TCardboxItemProps> = ({cardbox}) => {
	const navigate = useNavigate();

	const goCards = useCallback(() => {
		navigate(`/cardboxes/${cardbox.id}/cards`);
	}, [cardbox.id, navigate]);

	const handleEnter = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			goCards();
		}
	}, [goCards]);

	const goRun = useCallback((id: number) => {
		navigate(`/run?id=${id}`);
	}, [navigate]);

	if (!cardbox) {
		return null;
	}

	const hasCards = cardbox.cards_count > 0;

	return <div className={'cardbox-item-content-wrapper' + (cardbox.id === 0 || cardbox.unstable ? ' unstable' : '')}>
		<div className={'cardbox-card-info'}>
			<div className={'cardbox-card-stack'}>
				<div
					className={'cardbox-pseudo-card' + (!hasCards ? ' single' : '')}
					style={{
						background: getSideColorsBySchema(cardbox.side1schema).color || '#eee',
						color: getSideColorsBySchema(cardbox.side1schema).textColor || '#222',
					}}
					tabIndex={0}
					onKeyDown={handleEnter}
					onClick={goCards}>
				<span>
					{cardbox.cards_count}
				</span>
				</div>
				{hasCards && <>
					<div className={'extra-cards'} style={{
						background: getSideColorsBySchema(cardbox.side1schema).color || '#eee',
					}}></div>
					<div className={'extra-cards second'} style={{
						background: getSideColorsBySchema(cardbox.side2schema).color || '#eee',
					}}></div>
				</>}
			</div>

			<div className={'cardbox-run-buttons'}>
				<div className={'run-card-button'}>
					<Button
						onClick={() => goRun(cardbox.id)}
						size={'xl'}
						disabled={cardbox.cards_count < 2}
						type={'round-success'}
						icon={<FaPlay/>}>Start</Button>
				</div>
			</div>
		</div>
		<div className={'cardbox-wrapper'}>
			<div className={'cardbox-title'}>
				<span>{cardbox.title}</span>
			</div>
			<div className={'cardbox-author'}><b>by</b> {cardbox.author || 'Unknown'}</div>
			<div className={'cardbox-sides'}><b>Sides:</b> {cardbox.side1title}, {cardbox.side2title}</div>
			{cardbox.description &&
				<div className={'cardbox-sides'}><b>Description:</b> {cardbox.description}</div>}

			{(cardbox.created_at || cardbox.changed_at) && <div className={'cardbox-times'}>
				{cardbox.created_at && <div className={'cardbox-created'}>
					<b>Created:</b> {new Intl.DateTimeFormat(undefined, {
					dateStyle: 'long',
					timeStyle: 'short',
				}).format(new Date(cardbox.created_at))}
				</div>}

				{cardbox.changed_at && <div className={'cardbox-changed'}>
					<b>Last change:</b> {new Intl.DateTimeFormat(undefined, {
					dateStyle: 'long',
					timeStyle: 'short',
				}).format(new Date(cardbox.changed_at))}
				</div>}
			</div>}

			<CardboxActionsButtons cardbox={cardbox}/>
		</div>
	</div>;
};
