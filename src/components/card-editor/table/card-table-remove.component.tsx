import React, {useCallback} from "react";
import {FaTrashCan} from "react-icons/fa6";
import {removeCard} from "../../../store/data/collections-store.actions.ts";

export const RemoveCell: React.FC = (props: any) => {
	const handleClick = useCallback(() => {
		removeCard(props.collectionId, props.data.id);
	}, []);

	return <div className={'table-button-column danger'}>
		<span onClick={handleClick}><FaTrashCan/></span>
	</div>;
}
