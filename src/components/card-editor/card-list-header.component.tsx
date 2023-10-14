import React from "react";
import {CardListStyleSelector} from "./card-list-style-selector.component.tsx";

export type TCardListHeaderProps = {
	sides?: Array<string>
	listMode?: boolean
}

export const CardListHeader: React.FC<TCardListHeaderProps> = ({sides, listMode = true}) => {
	return <div className={'card-list'}>
		<div className={'card-sides-header'}>
			{listMode && sides?.map((sideName, idx) => {
				return <div className={'card-side-name'} key={sideName + idx.toString()}>
					{sideName}
				</div>
			})}

			<CardListStyleSelector/>
		</div>
	</div>;
}
