import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeCollection} from "../../../../store/data/collections-store.actions.ts";
import {getCollection} from "../../../../store/data/collections-store.selectors.ts";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaGrip, FaPlay, FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft, FaCog} from "react-icons/fa";

export type TCollectionActionsProps = {
	id: string;
}

export const CollectionActions: React.FC<TCollectionActionsProps> = ({id}) => {
	const navigate = useNavigate();
	const collection = getCollection(id);

	const [isOpen, setIsOpen] = useState(false);

	const goEdit = useCallback((id: string) => {
		navigate(`/collections/${id}/details`);
	}, [navigate]);

	const goRun = useCallback((id: string) => {
		// TODO: run route
		navigate(`/collections/${id}/details`);
	}, [navigate]);

	const goCards = useCallback((id: string) => {
		navigate(`/collections/${id}/cards`);
	}, [navigate]);

	const deleteCollection = useCallback(() => {
		removeCollection(id!);
		setIsOpen(false)
	}, [id]);

	return <>
		<Modal
			open={isOpen}
			type={'danger'}
			onClose={() => setIsOpen(false)}
			title={'Remove collection'}
			description={<>This will permanently delete the collection <b>"{collection?.title}"</b> which
				includes <b>{(collection?.cards?.length || 0)}</b> cards.</>}
			body={<p>
				Are you sure you want to remove this collection? All of your cards of this
				collection
				will be permanently removed. This action cannot be undone.
			</p>}
			actions={<>
				<Button type={'secondary'} icon={<FaArrowLeft/>} onClick={() => setIsOpen(false)}>
					Cancel (Esc)
				</Button>
				<Button type={'danger'} onClick={deleteCollection} icon={<FaTrashCan/>}>
					Remove
				</Button>
			</>}
		/>

		<div className={'collection-item-actions'}>
			<div className={'collection-item-actions-stack'}>
				<Button
					onClick={() => goRun(id!)}
					icon={<FaPlay/>}
					disabled={(collection?.cards?.length || 0) < 2}
					type='success'>
					Run
				</Button>

				<Button onClick={() => goEdit(id!)} icon={<FaCog/>}>
					Preferences
				</Button>

				<Button onClick={() => goCards(id!)} icon={<FaGrip/>}>
					Cards {(collection?.cards?.length || 0) > 0 ? ' (' + collection?.cards?.length + ')' : ''}
				</Button>
			</div>


			<Button onClick={() => setIsOpen(true)} icon={<FaTrashCan/>} type={'round'}/>
		</div>
	</>;
};
