import React, {useCallback} from "react";
import {useCardboxStore} from "../../../../store/data/cardboxes-store.ts";
import {useNavigate} from "react-router-dom";
import {CardboxActions} from "./cardbox-actions.component.tsx";

export type TCardboxItemProps = {
	id: string
}

export const CardboxListItem: React.FC<TCardboxItemProps> = React.memo(({id}) => {
	const cardbox = useCardboxStore((state) => state.cardboxes.find(c => c.id === id));
	const navigate = useNavigate();

	const goCards = useCallback(() => {
		navigate(`/cardboxes/${id}/cards`);
	}, [id, navigate]);

	const handleEnter = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			goCards();
		}
	}, [goCards]);

	if (!cardbox) {
		return null;
	}

	const hasCards = cardbox.cards?.length && cardbox.cards.length > 0;

	return <div className={'cardbox-item-content-wrapper'}>
		<div className={'cardbox-title'}>
			<span>{cardbox.title}</span>
		</div>
		<div className={'cardbox-item-content'}>
			<div className={'cardbox-card-info'}>
				<div
					className={'cardbox-pseudo-card' + (!hasCards ? ' single' : '')}
					style={{
						background: cardbox?.sides?.[0].color || '#eee',
						color: cardbox?.sides?.[0].textColor || '#222',
					}}
					tabIndex={0}
					onKeyDown={handleEnter}
					onClick={goCards}>
				<span>
					{cardbox.cards?.length || 0}
				</span>
				</div>
				{hasCards && <>
					<div className={'extra-cards'} style={{
						background: cardbox?.sides?.[0].color || '#eee',
					}}></div>
					<div className={'extra-cards second'} style={{
						background: cardbox?.sides?.[1].color || '#eee',
					}}></div>
				</>}
				{hasCards && <div className={'card-shadow'}></div>}
			</div>
			<div className={'cardbox-wrapper'}>
				<div className={'cardbox-author'}><b>by</b> {cardbox.author || 'Unknown'}</div>
				<div className={'cardbox-sides'}><b>Sides:</b> {cardbox.sides?.map(s => s.name).join(', ')}</div>

				<CardboxActions id={cardbox.id!}/>
			</div>
		</div>
	</div>;
}, () => true);
