import React from "react";
import {IoIosAddCircle} from "react-icons/io";

export type TCardListAddProps = {
	sides?: Array<string>
	onClick: () => void
	showHeader?: boolean
}

export const CardListAdd: React.FC<TCardListAddProps> = ({sides, onClick, showHeader = true}) => {
	return <div className={'card-list'}>
		{showHeader && <div className={'card-sides-header'}>
			{sides?.map((sideName, idx) => {
				return <div className={'card-side-name'} key={sideName + idx.toString()}>
					{sideName}
				</div>
			})}
		</div>}

		<div className={'card-item add'}>
			<div className={'card-sides'} onClick={onClick}>
				{sides?.map((_, idx) => {
					return <div key={'new' + idx.toString()} className={'card-side-content'}>
					</div>;
				})}
			</div>
			<div className={'card-item-create'}>
				<IoIosAddCircle/>
			</div>
		</div>
	</div>;
};
