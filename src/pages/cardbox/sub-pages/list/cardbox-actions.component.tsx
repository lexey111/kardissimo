import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {removeCardbox} from "../../../../store/data/cardboxes-store.actions.ts";
import {getCardbox} from "../../../../store/data/cardboxes-store.selectors.ts";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaGrip, FaPlay, FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft, FaCog} from "react-icons/fa";

export type TCardboxActionsProps = {
	id: string;
}

export const CardboxActions: React.FC<TCardboxActionsProps> = ({id}) => {
	const navigate = useNavigate();
	const cardbox = getCardbox(id);

	const [isOpen, setIsOpen] = useState(false);

	const goEdit = useCallback((id: string) => {
		navigate(`/cardboxes/${id}/details`);
	}, [navigate]);

	const goRun = useCallback((id: string) => {
		// TODO: run route
		navigate(`/run?id=${id}`);
	}, [navigate]);

	const goCards = useCallback((id: string) => {
		navigate(`/cardboxes/${id}/cards`);
	}, [navigate]);

	const deleteCardbox = useCallback(() => {
		removeCardbox(id!);
		setIsOpen(false)
	}, [id]);

	return <>
		<Modal
			open={isOpen}
			type={'danger'}
			onClose={() => setIsOpen(false)}
			title={'Remove cardbox'}
			description={<>This will permanently delete the cardbox <b>"{cardbox?.title}"</b> which
				includes <b>{(cardbox?.cards?.length || 0)}</b> cards.</>}
			body={<p>
				Are you sure you want to remove this cardbox? All of your cards of this
				cardbox
				will be permanently removed. This action cannot be undone.
			</p>}
			actions={<>
				<Button type={'secondary'} icon={<FaArrowLeft/>} onClick={() => setIsOpen(false)}>
					Cancel (Esc)
				</Button>
				<Button type={'danger'} onClick={deleteCardbox} icon={<FaTrashCan/>}>
					Remove
				</Button>
			</>}
		/>

		<div className={'cardbox-item-actions'}>
			<div className={'cardbox-item-actions-stack'}>
				<Button
					onClick={() => goRun(id!)}
					icon={<FaPlay/>}
					disabled={(cardbox?.cards?.length || 0) < 2}
					type='success'>
					Run
				</Button>

				<Button onClick={() => goEdit(id!)} icon={<FaCog/>}>
					Preferences
				</Button>

				<Button onClick={() => goCards(id!)} icon={<FaGrip/>}>
					Cards {(cardbox?.cards?.length || 0) > 0 ? ' (' + cardbox?.cards?.length + ')' : ''}
				</Button>
			</div>


			<Button onClick={() => setIsOpen(true)} icon={<FaTrashCan/>} type={'round'}/>
		</div>
	</>;
};