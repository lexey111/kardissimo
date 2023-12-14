import React, {useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {FaGrip, FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {FaCog} from "react-icons/fa";
import {TSCardbox} from "../../../../store/cardboxes/types-cardbox.ts";
import {publish} from "../../../../subscribe.ts";

export type TCardboxActionsProps = {
	cardbox: TSCardbox
}

export const CardboxActionsButtons: React.FC<TCardboxActionsProps> = ({cardbox}) => {
	const navigate = useNavigate();

	const goEdit = useCallback((id: number) => {
		navigate(`/cardboxes/${id}/details`);
	}, [navigate]);

	const goCards = useCallback((id: number) => {
		navigate(`/cardboxes/${id}/cards`);
	}, [navigate]);

	const deleteCardbox = useCallback(() => {
		publish('cardbox-delete', cardbox.id)
	}, [cardbox]);

	return <div className={'cardbox-item-actions'}>
		<Button onClick={() => goEdit(cardbox.id)} icon={<FaCog/>} type={'secondary'}>
			Preferences
		</Button>

		<Button onClick={() => goCards(cardbox.id)} icon={<FaGrip/>} type={'secondary'}>
			Cards {(cardbox.cards_count || 0) > 0 ? ' (' + cardbox.cards_count + ')' : ''}
		</Button>

		<Button onClick={deleteCardbox} icon={<FaTrashCan/>} type={'round'}/>
	</div>;
};
