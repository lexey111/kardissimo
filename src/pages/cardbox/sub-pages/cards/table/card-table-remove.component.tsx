import React from "react";
import {CardRemoveButton} from "../card-remove.button.tsx";


export type TCardRemoveCellProps = {
	cardboxId?: string
	cardId: string
}

export const RemoveCell: React.FC<TCardRemoveCellProps> = (props: any) => {
	return <div className={'table-button-column danger'}>
		<CardRemoveButton cardId={props.data.id}/>
	</div>;
}
