import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {
	setCardListStyle,
	setSelectedSide,
	setTableEditMode,
	setTableViewMode
} from "../../../store/settings/settings-store.actions.ts";
import {useSettingsStore} from "../../../store/settings/settings-store.ts";
import {RiEditBoxFill} from "react-icons/ri";
import {AiFillEye} from "react-icons/ai";
import {TbViewportNarrow, TbViewportWide} from "react-icons/tb";

export type TCardListModeSelectorProps = {
	sides?: [string, string]
}
export const CardListModeSelector: React.FC<TCardListModeSelectorProps> = ({sides}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);
	const tableEditMode = useSettingsStore((state) => state.tableEditMode);
	const tableViewMode = useSettingsStore((state) => state.tableViewMode);
	const selectedSide = useSettingsStore((state) => state.selectedSide);

	if (sides && sides.length > 0) {
		if (selectedSide === '' || !sides?.includes(selectedSide)) {
			setSelectedSide(sides[0]);
		}
	}

	return <div className={'list-mode-selector'}>

		{currentStyle === 'table' && <div className={'table-mode-selector'}>
			<div className={'pure-button-group primary'}>
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

		<div className={'pure-button-group secondary'}>
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

		{currentStyle === 'cards' && <div className={'card-side-selector'}>
			<div className={'pure-button-group primary'}>
				{sides?.map((side, idx) => {
					return <button key={side + idx.toString()}
					               className={'pure-button with-text' + (selectedSide === side ? ' pressed' : '')}
					               onClick={() => setSelectedSide(side)}>
						{side}
					</button>
				})}
			</div>
		</div>}

		{currentStyle === 'table' && <div className={'table-wide-selector'}>
			<div className={'pure-button-group primary'}>
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
