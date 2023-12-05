import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {RiEditBoxFill} from "react-icons/ri";
import {AiFillEye} from "react-icons/ai";
import {TbViewportNarrow, TbViewportWide} from "react-icons/tb";
import {TSCardbox, TSCardboxKey} from "../../../../../store/cardboxes/types-cardbox.ts";
import {Button} from "../../../../../components/utils/button.component.tsx";
import {CardImport} from "../../cards/card-import.component.tsx";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {useSettingsUpdate} from "../../../../../store/settings/hooks/useSettingsUpdateHook.tsx";

export type TCardListModeSelectorProps = {
	cardbox: TSCardbox
}
export const CardListModeSelector: React.FC<TCardListModeSelectorProps> = ({cardbox}) => {
	const {isLoading, error, data: appState} = useSettingsQuery();

	const updateSettingsMutation = useSettingsUpdate();

	if (isLoading || error || !appState) {
		return null;
	}

	return <div className={'list-mode-selector'}>
		{cardbox.cards_count > 10 && <div className={'lm-amount'}>
			{cardbox.cards_count}
		</div>}

		{appState.cardListStyle === 'table' && cardbox.cards_count > 0 &&
			<div className={'table-mode-selector'}>
				<div className={'pure-button-group'}>
					<Button
						icon={<AiFillEye/>}
						pressed={appState.tableEditMode === 'readonly'}
						onClick={() => updateSettingsMutation.mutate({tableEditMode: 'readonly'})}>View</Button>

					<Button
						icon={<RiEditBoxFill/>}
						pressed={appState.tableEditMode === 'editable'}
						onClick={() => updateSettingsMutation.mutate({tableEditMode: 'editable'})}>Edit</Button>
				</div>
			</div>}

		<div className={'pure-button-group'}>
			<Button
				icon={<FaBars/>}
				pressed={appState.cardListStyle === 'list'}
				onClick={() => updateSettingsMutation.mutate({cardListStyle: 'list'})}/>

			<Button
				icon={<FaGrip/>}
				pressed={appState.cardListStyle === 'cards'}
				onClick={() => updateSettingsMutation.mutate({cardListStyle: 'cards'})}/>

			<Button
				icon={<FaTable/>}
				pressed={appState.cardListStyle === 'table'}
				onClick={() => updateSettingsMutation.mutate({cardListStyle: 'table'})}/>
		</div>

		{appState.cardListStyle === 'cards' && cardbox.cards_count > 0 &&
			<div className={'card-side-selector'}>
				<div className={'pure-button-group'}>
					{[1, 2].map((side, idx) => {
						return <Button
							key={idx.toString()}
							pressed={appState.selectedSide === idx}
							onClick={() => updateSettingsMutation.mutate({selectedSide: idx})}>
							{cardbox[`side${side}title` as TSCardboxKey]}
						</Button>
					})}
				</div>
			</div>}

		{appState.cardListStyle === 'table' && cardbox.cards_count > 0 &&
			<div className={'table-wide-selector'}>
				<div className={'pure-button-group'}>
					<Button
						icon={<TbViewportWide/>}
						pressed={appState.tableViewMode === 'wide'}
						onClick={() => updateSettingsMutation.mutate({tableViewMode: 'wide'})}>Wide</Button>

					<Button
						icon={<TbViewportNarrow/>}
						pressed={appState.tableViewMode === 'narrow'}
						onClick={() => updateSettingsMutation.mutate({tableViewMode: 'narrow'})}>Narrow</Button>
				</div>
			</div>}

		<CardImport collapsed={true}/>
	</div>;
};
