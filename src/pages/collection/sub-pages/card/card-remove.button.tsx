import React, {useCallback, useState} from "react";
import {removeCard} from "../../../../store/data/collections-store.actions.ts";
import {FaTrashCan} from "react-icons/fa6";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {Button} from "../../../../components/utils/button.component.tsx";

export type TCardRemoveProps = {
	collectionId?: string
	cardId: string
}

export const CardRemoveButton: React.FC<TCardRemoveProps> = ({collectionId, cardId}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleRemove = useCallback(() => {
		setIsOpen(false);
		removeCard(collectionId, cardId);
	}, []);

	return <>
		<Modal
			open={isOpen}
			type={'danger'}
			onClose={() => setIsOpen(false)}
			title={<span className={'title-danger'}>Remove card</span>}
			body={<p>
				Are you sure you want to remove card? This action cannot be undone.
			</p>}
			actions={<>
				<Button type={'secondary'} onClick={() => setIsOpen(false)}>Cancel (Esc)</Button>
				<Button type={'danger'} icon={<FaTrashCan/>} onClick={handleRemove}>Remove</Button>
			</>}
		/>
		<Button type={'round-danger'} onClick={() => setIsOpen(true)} icon={<FaTrashCan/>} size={'sm'}/>
	</>;
};
