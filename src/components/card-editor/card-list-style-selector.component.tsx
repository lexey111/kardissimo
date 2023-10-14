import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {setCardListStyle} from "../../store/settings/settings-store.actions.ts";
import {useSettingsStore} from "../../store/settings/settings-store.ts";

export const CardListStyleSelector: React.FC = () => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	return <div className={'list-style-selector'}>
		<div className={'pure-button-group'}>
			<button className={'pure-button' + (currentStyle === 'list' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('list')}>
				<FaBars/>
			</button>
			<button className={'pure-button' + (currentStyle === 'cards' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('cards')}>
				<FaGrip/>
			</button>
			<button className={'pure-button' + (currentStyle === 'table' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('table')}>
				<FaTable/>
			</button>
		</div>
	</div>;
};
