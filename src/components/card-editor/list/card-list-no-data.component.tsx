import React from "react";
import {CardListAdd} from "./card-list-add.component.tsx";
import {IoIosAddCircle} from "react-icons/io";

export type TCardListNoDataProps = {
	collectionId?: string
}

export const CardListNoData: React.FC<TCardListNoDataProps> = ({collectionId}) => {
	return <div className={'margin-center empty-list'}>
		<CardListAdd collectionId={collectionId}/>
		<p className={'no-data-text'}>
			<span className={'arrow-up'}></span>
			No cards to display, yet. Please, use the button <IoIosAddCircle/> above to create the first one.
		</p>
	</div>;
};
