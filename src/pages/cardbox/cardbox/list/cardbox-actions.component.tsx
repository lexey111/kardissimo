import React, {useCallback, useState} from "react";
import {Modal} from "../../../../components/utils/modal-component.tsx";
import {FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaArrowLeft} from "react-icons/fa";
import {useCardboxDelete} from "../../../../store/cardboxes/hooks/useCardboxDeleteHook.tsx";
import {TSCardbox} from "../../../../store/cardboxes/types-cardbox.ts";
import {useSubscribe} from "../../../../subscribe.ts";
import {useCardboxes} from "../../../../store/cardboxes/hooks/useCardboxesHook.tsx";

export const CardboxActions: React.FC = () => {
	const [cardbox, setCardbox] = useState<TSCardbox>();
	const [isOpen, setIsOpen] = useState(false);

	const {data: cardboxes, isLoading} = useCardboxes();

	const deleteCardboxMutation = useCardboxDelete();

	const deleteCardbox = useCallback(() => {
		if (cardbox?.id) {
			deleteCardboxMutation.mutate(cardbox.id);
		}
		setIsOpen(false)
	}, [cardbox]);

	const handleDeleteSignal = useCallback((data?: any) => {
		if (!data) {
			return;
		}
		const cardbox = cardboxes?.find(c => c.id === data.detail);
		setCardbox(() => cardbox);
		setIsOpen(!!cardbox);
	}, [cardboxes]);

	useSubscribe('cardbox-delete', handleDeleteSignal);

	if (isLoading || !cardboxes || cardboxes.length === 0) {
		return null;
	}

	return <Modal
		open={isOpen}
		type={'danger'}
		onClose={() => setIsOpen(false)}
		title={'Remove cardbox'}
		description={<>This will permanently delete the cardbox <b>"{cardbox?.title}"</b> which
			includes <b>{(cardbox?.cards_count || 0)}</b> cards.</>}
		body={<p>
			Are you sure you want to remove this cardbox? All of your cards of this
			cardbox will be permanently removed. This action cannot be undone.
		</p>}
		actions={<>
			<Button type={'secondary'} icon={<FaArrowLeft/>} onClick={() => setIsOpen(false)}>
				Cancel (Esc)
			</Button>
			<Button type={'danger'} onClick={deleteCardbox} icon={<FaTrashCan/>}>
				Remove
			</Button>
		</>}
	/>;
};
