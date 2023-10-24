import React from "react";
import {CardRemoveButton} from "../card-remove.button.tsx";


export type TCardRemoveCellProps = {
	collectionId?: string
	cardId: string
}

export const RemoveCell: React.FC<TCardRemoveCellProps> = (props: any) => {
	return <div className={'table-button-column danger'}>
		<CardRemoveButton cardId={props.data.id} collectionId={props.collectionId}/>
	</div>;
}
