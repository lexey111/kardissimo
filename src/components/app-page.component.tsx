import React from "react";
import {AppFooter} from "./app-footer.component.tsx";

export type TAppPageProps = {
	title: string
	children: any
	pageClass?: string
}
export const AppPage: React.FC<TAppPageProps> = (props) => {
	return <div className='app-page-wrapper'>
		<div className={'app-page-content' + (props.pageClass ? ' ' + props.pageClass : '')}>
			{props.children}
		</div>
		<AppFooter/>
	</div>;
};
