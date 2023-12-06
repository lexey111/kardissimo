import React from "react";
import {FaTrashCan} from "react-icons/fa6";
import {Button} from "../../../../components/utils/button.component.tsx";
import {publish} from "../../../../subscribe.ts";

export type TCardRemoveProps = {
	cardId: number
}

export const CardRemoveButton: React.FC<TCardRemoveProps> = ({cardId}) => {
	return <Button
		type={'round-danger'}
		onClick={() => publish('card-delete', cardId)}
		icon={<FaTrashCan/>}
		variant={'nokeyboard'}
		size={'sm'}/>;
};
