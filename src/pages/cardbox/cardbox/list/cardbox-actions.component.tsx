import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaGrip, FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft, FaCog} from "react-icons/fa";
import {useCardboxDelete} from "../../../../store/cardboxes/hooks/useCardboxDeleteHook.tsx";
import {TSCardbox} from "../../../../store/cardboxes/types-cardbox.ts";

export type TCardboxActionsProps = {
	cardbox: TSCardbox
}

export const CardboxActions: React.FC<TCardboxActionsProps> = ({cardbox}) => {
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);

	const deleteCardboxMutation = useCardboxDelete();

	const goEdit = useCallback((id: number) => {
		navigate(`/cardboxes/${id}/details`);
	}, [navigate]);

	const goCards = useCallback((id: number) => {
		navigate(`/cardboxes/${id}/cards`);
	}, [navigate]);

	const deleteCardbox = useCallback(() => {
		deleteCardboxMutation.mutate(cardbox.id);
		setIsOpen(false)
	}, [cardbox]);

	return <>
		<Modal
			open={isOpen}
			type={'danger'}
			onClose={() => setIsOpen(false)}
			title={'Remove cardbox'}
			description={<>This will permanently delete the cardbox <b>"{cardbox?.title}"</b> which
				includes <b>{(cardbox?.cards_count || 0)}</b> cards.</>}
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
			<Button onClick={() => goEdit(cardbox.id)} icon={<FaCog/>} type={'secondary'}>
				Preferences
			</Button>

			<Button onClick={() => goCards(cardbox.id)} icon={<FaGrip/>} type={'secondary'}>
				Cards {(cardbox.cards_count || 0) > 0 ? ' (' + cardbox.cards_count + ')' : ''}
			</Button>

			<Button onClick={() => setIsOpen(true)} icon={<FaTrashCan/>} type={'round'}/>
		</div>
	</>;
};
