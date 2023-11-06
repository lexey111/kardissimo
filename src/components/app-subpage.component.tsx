import React from "react";

export type TAppSubPageProps = {
	children: any
	float?: JSX.Element
}
export const AppSubPage: React.FC<TAppSubPageProps> = (props) => {
	return <div className={'app-page-content no-padding'}>
		{props.children}
		{props.float && props.float}
	</div>;
};
