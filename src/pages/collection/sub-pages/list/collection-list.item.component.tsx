import React, {useCallback} from "react";
import {useCollectionStore} from "../../../../store/data/collections-store.ts";
import {useNavigate} from "react-router-dom";
import {CollectionActions} from "./collection-actions.component.tsx";

export type TCollectionItemProps = {
	id: string
}

export const CollectionListItem: React.FC<TCollectionItemProps> = React.memo(({id}) => {
	const collection = useCollectionStore((state) => state.collections.find(c => c.id === id));
	const navigate = useNavigate();

	const goCards = useCallback(() => {
		navigate(`/collections/${id}/cards`);
	}, [id, navigate]);

	const handleEnter = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			goCards();
		}
	}, [goCards]);

	if (!collection) {
		return null;
	}

	const hasCards = collection.cards?.length && collection.cards.length > 0;

	return <div className={'collection-item-content-wrapper'}>
		<div className={'collection-title'}>
			<span>{collection.title}</span>
		</div>
		<div className={'collection-item-content'}>
			<div className={'collection-card-info'}>
				<div
					className={'collection-pseudo-card' + (!hasCards ? ' single' : '')}
					style={{
						background: collection?.sides?.[0].color || '#eee',
						color: collection?.sides?.[0].textColor || '#222',
					}}
					tabIndex={0}
					onKeyDown={handleEnter}
					onClick={goCards}>
				<span>
					{collection.cards?.length || 0}
				</span>
				</div>
				{hasCards && <>
					<div className={'extra-cards'} style={{
						background: collection?.sides?.[0].color || '#eee',
					}}></div>
					<div className={'extra-cards second'} style={{
						background: collection?.sides?.[1].color || '#eee',
					}}></div>
				</>}
				{hasCards && <div className={'card-shadow'}></div>}
			</div>
			<div className={'collection-wrapper'}>
				<div className={'collection-author'}><b>by</b> {collection.author || 'Unknown'}</div>
				<div className={'collection-sides'}><b>Sides:</b> {collection.sides?.map(s => s.name).join(', ')}</div>

				<CollectionActions id={collection.id!}/>
			</div>
		</div>
	</div>;
}, () => true);
