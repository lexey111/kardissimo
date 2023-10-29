import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {
	setCardListStyle,
	setSelectedSide,
	setTableEditMode,
	setTableViewMode
} from "../../../../../store/settings/settings-store.actions.ts";
import {useSettingsStore} from "../../../../../store/settings/settings-store.ts";
import {RiEditBoxFill} from "react-icons/ri";
import {AiFillEye} from "react-icons/ai";
import {TbViewportNarrow, TbViewportWide} from "react-icons/tb";
import {TCollectionSide} from "../../../../../store/data/types.ts";
import {Button} from "../../../../../components/utils/button.component.tsx";

export type TCardListModeSelectorProps = {
	sides?: Array<TCollectionSide>
}
export const CardListModeSelector: React.FC<TCardListModeSelectorProps> = ({sides}) => {
	const currentStyle = useSettingsStore((state) => state.cardListStyle);
	const tableEditMode = useSettingsStore((state) => state.tableEditMode);
	const tableViewMode = useSettingsStore((state) => state.tableViewMode);
	const selectedSide = useSettingsStore((state) => state.selectedSide);

	if (sides && sides.length > 0) {
		if (typeof selectedSide === 'undefined' || sides.length < selectedSide) {
			setSelectedSide(0);
		}
	}

	return <div className={'list-mode-selector'}>
		{currentStyle === 'table' && <div className={'table-mode-selector'}>
			<div className={'pure-button-group'}>
				<Button
					icon={<AiFillEye/>}
					pressed={tableEditMode === 'readonly'}
					onClick={() => setTableEditMode('readonly')}>View</Button>

				<Button
					icon={<RiEditBoxFill/>}
					pressed={tableEditMode === 'editable'}
					onClick={() => setTableEditMode('editable')}>Edit</Button>
			</div>
		</div>}

		<div className={'pure-button-group'}>
			<Button
				icon={<FaBars/>}
				pressed={currentStyle === 'list'}
				onClick={() => setCardListStyle('list')}/>

			<Button
				icon={<FaGrip/>}
				pressed={currentStyle === 'cards'}
				onClick={() => setCardListStyle('cards')}/>

			<Button
				icon={<FaTable/>}
				pressed={currentStyle === 'table'}
				onClick={() => setCardListStyle('table')}/>
		</div>

		{currentStyle === 'cards' && <div className={'card-side-selector'}>
			<div className={'pure-button-group'}>
				{sides?.map((side, idx) => {
					return <Button
						key={side.name + idx.toString()}
						pressed={selectedSide === idx}
						onClick={() => setSelectedSide(idx)}>
						{side.name}
					</Button>
				})}
			</div>
		</div>}

		{currentStyle === 'table' && <div className={'table-wide-selector'}>
			<div className={'pure-button-group'}>
				<Button
					icon={<TbViewportWide/>}
					pressed={tableViewMode === 'wide'}
					onClick={() => setTableViewMode('wide')}>Wide</Button>

				<Button
					icon={<TbViewportNarrow/>}
					pressed={tableViewMode === 'narrow'}
					onClick={() => setTableViewMode('narrow')}>Narrow</Button>
			</div>
		</div>}
	</div>;
};
