import React from "react";
import {FaBars} from "react-icons/fa";
import {FaGrip, FaTable} from "react-icons/fa6";
import {RiEditBoxFill} from "react-icons/ri";
import {AiFillEye} from "react-icons/ai";
import {TbViewportNarrow, TbViewportWide} from "react-icons/tb";
import {TCardboxSide} from "../../../../../store/data/types.ts";
import {Button} from "../../../../../components/utils/button.component.tsx";
import {CardImport} from "../../cards/card-import.component.tsx";
import {useParams} from "react-router-dom";
import {getCardbox} from "../../../../../store/data/cardboxes-store.selectors.ts";
import {useSettingsQuery} from "../../../../../store/settings/hooks/useSettingsHook.tsx";
import {useUpdateSettingsMutation} from "../../../../../store/settings/hooks/useSettingsUpdateHook.tsx";

export type TCardListModeSelectorProps = {
	sides?: Array<TCardboxSide>
}
export const CardListModeSelector: React.FC<TCardListModeSelectorProps> = ({sides}) => {
	const {isLoading, error, data: appState} = useSettingsQuery();

	const updateSettingsMutation = useUpdateSettingsMutation();
	const params = useParams();
	const cardbox = getCardbox(params.cardboxId);

	if (isLoading || error || !appState) {
		return null;
	}

	return <div className={'list-mode-selector'}>
		{(cardbox?.cards?.length || 0) > 10 && <div className={'lm-amount'}>
			{cardbox?.cards?.length || ''}
		</div>}
		{appState.cardListStyle === 'table' && (cardbox?.cards?.length || 0) > 0 &&
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

		{appState.cardListStyle === 'cards' && (cardbox?.cards?.length || 0) > 0 &&
			<div className={'card-side-selector'}>
				<div className={'pure-button-group'}>
					{sides?.map((side, idx) => {
						return <Button
							key={side.name + idx.toString()}
							pressed={appState.selectedSide === idx}
							onClick={() => updateSettingsMutation.mutate({selectedSide: idx})}>
							{side.name}
						</Button>
					})}
				</div>
			</div>}

		{appState.cardListStyle === 'table' && (cardbox?.cards?.length || 0) > 0 &&
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
