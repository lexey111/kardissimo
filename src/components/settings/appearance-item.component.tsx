import React from "react";
import {Appearances} from "../../resources/appearance.ts";
import {useSettingsStore} from "../../store/settings/settings-store.ts";

export type TAppearanceItemProps = {
	id: string
	onApply: (id: string) => void
}

export const AppearanceItem: React.FC<TAppearanceItemProps> = ({id, onApply}) => {
	const item = Appearances.find(ap => ap.id === id);
	const currentAppearance = useSettingsStore((state) => state.currentAppearance);

	if (!id) {
		return null;
	}

	return <div
		className={'appearance-item-wrapper' + (currentAppearance === id ? ' active' : '')}
		onClick={() => onApply(id)}>
		<div className={'appearance-item'} style={{background: item?.background}}></div>
		<div className={'appearance-item-name'}>{item?.name}</div>
	</div>;
}
