import React from "react";
import {Appearances} from "../../resources/appearance.ts";
import {AppearanceItem} from "./appearance-item.component.tsx";
import {useSettingsQuery} from "../../store/settings/hooks/useSettingsHook.tsx";
import {WaitInline} from "../utils/wait-inline.component.tsx";

export type TAppearanceSelectorProps = {
	onApply: (id: string) => void
}

export const AppearanceSelector: React.FC<TAppearanceSelectorProps> = ({onApply}) => {
	const {isLoading, error, data} = useSettingsQuery();

	if (isLoading || error || !data) {
		return <WaitInline text={'Getting settings...'}/>
	}

	return <div className={'appearance-items'}>
		{Appearances.map(ap => <AppearanceItem
			appearance={ap}
			key={ap.id}
			active={ap.id === data.currentAppearance}
			onApply={onApply}/>)}
	</div>;
}
