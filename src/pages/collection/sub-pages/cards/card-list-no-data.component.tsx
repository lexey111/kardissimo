import React from "react";
import {IoIosAddCircle} from "react-icons/io";

export type TCardListNoDataProps = {
	caption: string
	addButton: JSX.Element
}

export const ListNoData: React.FC<TCardListNoDataProps> = ({caption, addButton}) => {
	return <div className={'margin-center empty-list'}>
		{addButton}
		<p className={'no-data-text'}>
			<span className={'arrow-up'}></span>
			{caption} Please, use the button <IoIosAddCircle/> above to create the first one.
		</p>
	</div>;
};
