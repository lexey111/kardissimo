import React from "react";
import {CardRemoveButton} from "../card-remove.button.tsx";

export const RemoveCell: React.FC = (props: any) => {
	return <div className={'table-button-column danger'}>
		<CardRemoveButton cardId={props.data.id}/>
	</div>;
}
