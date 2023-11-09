import React from "react";
import {Appearances} from "../../resources/appearance.ts";
import {AppearanceItem} from "./appearance-item.component.tsx";

export const AppearanceSelector:React.FC = () => {
	return <div className={'appearance-items'}>
		{Appearances.map(ap => <AppearanceItem id={ap.id} key={ap.id}/>)}
	</div>;
}
