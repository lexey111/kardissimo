import React from "react";
import {Appearances} from "../../resources/appearance.ts";
import {AppearanceItem} from "./appearance-item.component.tsx";

export type TAppearanceSelectorProps = {
	onApply: (id: string) => void
}

export const AppearanceSelector:React.FC<TAppearanceSelectorProps> = ({onApply}) => {
	return <div className={'appearance-items'}>
		{Appearances.map(ap => <AppearanceItem id={ap.id} key={ap.id} onApply={onApply}/>)}
	</div>;
}
