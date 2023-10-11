import React from "react";

export type TAppPageHeaderProps = {
	title: string
	subtitle?: string
	back?: JSX.Element
}
export const AppPageError: React.FC<TAppPageHeaderProps> = ({title, subtitle, back}) => {
	return <div className={'big-error'}>
		<div className={'big-error-title'}>
			<div className={'big-error-caption'}>{title}</div>
			{subtitle && <div className={'big-error-subtitle'}>{subtitle}</div>}
			{back && <div className={'big-error-back'}>{back}</div>}
		</div>
	</div>;
};
