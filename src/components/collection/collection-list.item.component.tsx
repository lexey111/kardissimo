import React, {useCallback} from "react";
import {useCollectionStore} from "../../store/data/collections-store.ts";
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
	}, []);

	const handleEnter = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			goCards();
		}
	}, []);

	if (!collection) {
		return null;
	}

	return <div className={'collection-item-content'}>
		<div className={'collection-card-info'}>
			<div className={'shadow'}></div>
			<div className={'collection-pseudo-card'}
			     style={{
				     background: collection?.sides?.[0].color || '#eee',
				     color: collection?.sides?.[0].fontColor || '#222',
			     }}
			     tabIndex={0}
			     onKeyDown={handleEnter}
			     onClick={goCards}>
				<span>
					{collection.cards?.length || 0}
				</span>
			</div>
			{collection.cards?.length && <div className={'extra-cards'} style={{
				background: collection?.sides?.[0].color || '#eee',
			}}></div>}
		</div>
		<div className={'collection-wrapper'}>
			<div className={'collection-title'}>{collection.title} <span
				className={'badge badge-white'}>{collection.cards?.length || 0}</span></div>
			<div className={'collection-author'}><b>by</b> {collection.author || 'Unknown'}</div>
			<div className={'collection-sides'}><b>Sides:</b> {collection.sides?.map(s => s.name).join(', ')}</div>

			<CollectionActions id={collection.id!}/>
		</div>
	</div>;
}, () => true);
