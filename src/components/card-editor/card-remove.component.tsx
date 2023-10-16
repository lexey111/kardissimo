import React, {useCallback, useState} from "react";
import {removeCard} from "../../store/data/collections-store.actions.ts";
import {FaTrashCan} from "react-icons/fa6";
import {Modal} from "../modal-component.tsx";

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
			onClose={() => setIsOpen(false)}
			title={<span className={'title-danger'}>Remove card</span>}
			body={<p>
				Are you sure you want to remove card? This action cannot be undone.
			</p>}
			actions={<>
				<button className={'pure-button pure-button-secondary'}
				        onClick={() => setIsOpen(false)}>
					Cancel (Esc)
				</button>
				<button className={'pure-button pure-button-danger'} onClick={handleRemove}>
					Remove
				</button>
			</>}
		/>
		<div onClick={() => setIsOpen(true)}><FaTrashCan/></div>
	</>;
};
