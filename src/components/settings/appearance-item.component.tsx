import React from "react";
import {TAppAppearance} from "../../resources/appearance.ts";

export type TAppearanceItemProps = {
	appearance: TAppAppearance
	onApply: (id: string) => void
	active: boolean
}

export const AppearanceItem: React.FC<TAppearanceItemProps> = ({appearance, active, onApply}) => {
	return <div
		className={'appearance-item-wrapper' + (active ? ' active' : '')}
		onClick={() => onApply(appearance.id)}>
		<div className={'appearance-item'} style={{background: appearance?.background}}></div>
		<div className={'appearance-item-name'}>{appearance?.name}</div>
	</div>;
}
