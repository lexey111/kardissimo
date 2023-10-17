import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeCollection} from "../../store/data/collections-store.actions.ts";
import {countCards, getCollection} from "../../store/data/collections-store.selectors.ts";
import {Modal} from "../modal-component.tsx";

export type TCollectionActionsProps = {
	id: string;
}
export const CollectionActions: React.FC<TCollectionActionsProps> = ({id}) => {
	const navigate = useNavigate();
	const collection = getCollection(id);

	const [isOpen, setIsOpen] = useState(false);

	const cardCount = countCards(id);

	const goEdit = useCallback((id: string) => {
		navigate(`/collections/${id}/details`);
	}, []);

	const goOverview = useCallback((id: string) => {
		navigate(`/collections/${id}/overview`);
	}, []);

	const goCards = useCallback((id: string) => {
		navigate(`/collections/${id}/cards`);
	}, []);

	const deleteCollection = useCallback(() => {
		removeCollection(id!);
		setIsOpen(false)
	}, []);

	return <>
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			title={<span className={'title-danger'}>Remove collection</span>}
			description={<>This will permanently delete the collection <b>"{collection?.title}"</b> which
				includes <b>{(collection?.cards?.length || 0)}</b> cards.</>}
			body={<p>
				Are you sure you want to remove this collection? All of your cards of this
				collection
				will be permanently removed. This action cannot be undone.
			</p>}
			actions={<>
				<button className={'pure-button pure-button-secondary'}
				        onClick={() => setIsOpen(false)}>
					Cancel (Esc)
				</button>
				<button className={'pure-button pure-button-danger'} onClick={deleteCollection}>
					Remove
				</button>
			</>}
		/>

		<div className={'collection-item-actions'}>
			<button onClick={() => goOverview(id!)} className={'pure-button pure-button-secondary'}>Overview</button>
			<button onClick={() => goEdit(id!)} className={'pure-button pure-button-secondary'}>Edit</button>
			<button onClick={() => goCards(id!)} className={'pure-button pure-button-primary'}>Cards ({cardCount})
			</button>
			<button onClick={() => setIsOpen(true)} className={'pure-button pure-button-danger'}>Remove</button>
		</div>
	</>;
};
