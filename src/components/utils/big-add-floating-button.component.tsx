import React from "react";
import {BigAddButton} from "./big-add-button.component.tsx";
import {useHeight} from "../hooks/useHeight.hook.tsx";


export type TAddBigButtonFloatingProps = {
	onClick: () => void;
	extraHeight?: number
}

export const BigAddFloatingButton: React.FC<TAddBigButtonFloatingProps> = ({onClick, extraHeight}) => {
	useHeight(extraHeight || 160);

	return <div className={'add-item-floating'}>
		<BigAddButton onClick={onClick}/>
	</div>;
}
