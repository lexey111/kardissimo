import React, {useCallback} from "react";
import {Appearances} from "../../resources/appearance.ts";
import {useSettingsStore} from "../../store/settings/settings-store.ts";
import {setCurrentAppearance} from "../../store/settings/settings-store.actions.ts";

export type TAppearanceItemProps = {
	id: string;
}
export const AppearanceItem: React.FC<TAppearanceItemProps> = ({id}) => {
	const item = Appearances.find(ap => ap.id === id);
	const currentAppearance = useSettingsStore((state) => state.currentAppearance);

	const handleSelect = useCallback(() => {
		setCurrentAppearance(id);
	}, []);

	if (!id) {
		return null;
	}

	return <div
		className={'appearance-item-wrapper' + (currentAppearance === id ? ' active' : '')}
		onClick={handleSelect}>
		<div className={'appearance-item'} style={{background: item?.background}}></div>
		<div className={'appearance-item-name'}>{item?.name}</div>
	</div>;
}
