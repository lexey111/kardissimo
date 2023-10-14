import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {Tooltip} from "react-tooltip";
import {setCardListStyle} from "../../store/settings/settings-store.actions.ts";
import {useSettingsStore} from "../../store/settings/settings-store.ts";

export const CardListStyleSelector: React.FC = () => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);

	return <div className={'list-style-selector'}>
		<div className={'pure-button-group'}>
			<button className={'pure-button' + (currentStyle === 'list' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('list')}>
				<FaBars data-tooltip-id={"style-tooltip-cozy"} data-tooltip-variant={'info'}
				        data-tooltip-delay-show={1000}/>
				<Tooltip id={"style-tooltip-cozy"} place={'bottom'}>
					View: Cozy
				</Tooltip>
			</button>
			<button className={'pure-button' + (currentStyle === 'cards' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('cards')}>
				<FaGrip data-tooltip-id={"style-tooltip-cards"} data-tooltip-variant={'info'}
				        data-tooltip-delay-show={1000}/>
				<Tooltip id={"style-tooltip-cards"} place={'bottom'}>
					View: Cards
				</Tooltip>
			</button>
			<button className={'pure-button' + (currentStyle === 'table' ? ' pressed' : '')}
			        onClick={() => setCardListStyle('table')}>
				<FaTable data-tooltip-id={"style-tooltip-pro"} data-tooltip-variant={'info'}
				         data-tooltip-delay-show={1000}/>
				<Tooltip id={"style-tooltip-pro"} place={'bottom'}>
					View: Professional
				</Tooltip>
			</button>
		</div>
	</div>;
};
