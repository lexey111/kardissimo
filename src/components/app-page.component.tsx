import React from "react";
import {AppFooter} from "./app-footer.component.tsx";
import {AppMenu} from "./app-menu.component.tsx";

export type TAppPageProps = {
	title?: string
	children: any
	float?: JSX.Element
	showMenu?: boolean
}
export const AppPage: React.FC<TAppPageProps> = ({title, children, float, showMenu = true}) => {
	console.log(title);
	return <div className={'app-page'}>
		{showMenu && <AppMenu/>}
		<div className='app-page-wrapper'>
			<div className={'app-page-content'}>
				{children}
			</div>
			{float && float}
			<AppFooter/>
		</div>
	</div>;
};
