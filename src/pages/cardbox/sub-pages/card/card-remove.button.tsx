import React, {useCallback, useState} from "react";
import {removeCard} from "../../../../store/data/cardboxes-store.actions.ts";
import {FaTrashCan} from "react-icons/fa6";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft} from "react-icons/fa";

export type TCardRemoveProps = {
	cardboxId?: string
	cardId: string
}

export const CardRemoveButton: React.FC<TCardRemoveProps> = ({cardboxId, cardId}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleRemove = useCallback(() => {
		setIsOpen(false);
		removeCard(cardboxId, cardId);
	}, [cardId, cardboxId]);

	return <>
		<Modal
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
		/>
		<Button type={'round-danger'} onClick={() => setIsOpen(true)} icon={<FaTrashCan/>} size={'sm'}/>
	</>;
};
