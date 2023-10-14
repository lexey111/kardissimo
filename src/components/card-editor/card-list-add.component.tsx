import React from "react";
import {IoIosAddCircle} from "react-icons/io";
import {CardListHeader} from "./card-list-header.component.tsx";
import {useSettingsStore} from "../../store/settings/settings-store.ts";

export type TCardListAddProps = {
	sides?: Array<string>
	onClick: () => void
	showHeader?: boolean
}

export const CardListAdd: React.FC<TCardListAddProps> = ({sides, onClick, showHeader = true}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	return <div className={`card-list-add-${currentStyle}`}>
		{showHeader && <CardListHeader sides={sides}/>}

		<div className={'card-item add'}>
			<div className={'card-sides'} onClick={onClick}>
				{sides?.map((_, idx) => {
					if (currentStyle === 'cards' && idx > 0) {
						return null
					}
					return <div key={'new' + idx.toString()} className={'card-side-content'}></div>;
				})}
			</div>

			<div className={'card-item-create'}>
				<IoIosAddCircle/>
			</div>
		</div>
	</div>;
};
