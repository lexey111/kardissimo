import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {setCardListStyle, setTableEditMode, setTableViewMode} from "../../../store/settings/settings-store.actions.ts";
import {useSettingsStore} from "../../../store/settings/settings-store.ts";
import {RiEditBoxFill} from "react-icons/ri";
import {AiFillEye} from "react-icons/ai";
import {TbViewportNarrow, TbViewportWide} from "react-icons/tb";

export const CardListStyleSelector: React.FC = () => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);
	const tableEditMode = useSettingsStore((state) => state.tableEditMode);
	const tableViewMode = useSettingsStore((state) => state.tableViewMode);

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

		{currentStyle === 'table' && <div className={'table-mode-selector'}>
			<div className={'pure-button-group'}>
				<button className={'pure-button with-text' + (tableEditMode === 'readonly' ? ' pressed' : '')}
				        onClick={() => setTableEditMode('readonly')}>
					<AiFillEye/> View
				</button>
				<button className={'pure-button with-text' + (tableEditMode === 'editable' ? ' pressed' : '')}
				        onClick={() => setTableEditMode('editable')}>
					<RiEditBoxFill/> Edit
				</button>
			</div>
		</div>}

		{currentStyle === 'table' && <div className={'table-mode-selector'}>
			<div className={'pure-button-group'}>
				<button className={'pure-button' + (tableViewMode === 'wide' ? ' pressed' : '')}
				        onClick={() => setTableViewMode('wide')}>
					<TbViewportWide/>
				</button>
				<button className={'pure-button' + (tableViewMode === 'narrow' ? ' pressed' : '')}
				        onClick={() => setTableViewMode('narrow')}>
					<TbViewportNarrow/>
				</button>
			</div>
		</div>}
	</div>;
};
