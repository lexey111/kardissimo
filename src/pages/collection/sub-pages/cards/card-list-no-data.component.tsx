import React from "react";
import {CardImport} from "./card-import.component.tsx";

export type TCardListNoDataProps = {
	addButton: JSX.Element
}

export const CardsNoData: React.FC<TCardListNoDataProps> = ({addButton}) => {
	return <div className={'margin-center empty-list'}>
		{addButton}

		<CardImport/>
	</div>;
};
