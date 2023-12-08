import React, {useCallback, useEffect, useState} from "react";
import {FaTrashCan} from "react-icons/fa6";
import {Modal} from "../../../components/utils/modal-component.tsx";
import {Button} from "../../../components/utils/button.component.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {useCardDelete} from "../../../store/cards/hooks/useCardDeleteHook.tsx";
import {subscribe, unsubscribe} from "../../../subscribe.ts";

export type TCardRemove = {
	cardboxId: number
}
export const CardRemove: React.FC<TCardRemove> = ({cardboxId}) => {
	const [isOpen, setIsOpen] = useState(false);
	const deleteCardMutation = useCardDelete(cardboxId);
	const [cardId, setCardId] = useState(0);

	const handleRemove = useCallback(() => {
		setIsOpen(false);
		deleteCardMutation.mutate(cardId);
	}, [cardId]);

	const handleDeleteSignal = useCallback((data: any) => {
		setCardId(() => data.detail);
		setIsOpen(true);
	}, []);

	useEffect(() => {
		subscribe('card-delete', handleDeleteSignal);
		return () => {
			unsubscribe('card-delete', handleDeleteSignal);
		}
	}, []);

	return <Modal
		open={isOpen}
		type={'danger'}
		onClose={() => setIsOpen(false)}
		title={'Remove card'}
		body={<p>
			Are you sure you want to remove card? This action cannot be undone.
		</p>}
		actions={<>
			<Button type={'secondary'} onClick={() => setIsOpen(false)} icon={<FaArrowLeft/>}>Cancel (Esc)</Button>
			<Button type={'danger'} icon={<FaTrashCan/>} onClick={handleRemove}>Remove</Button>
		</>}
	/>;
};
