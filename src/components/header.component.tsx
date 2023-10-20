import React, {useEffect, useRef, useState} from "react";
import {GoBackButton} from "./collection/go-back.component.tsx";

export type TAppPageHeaderProps = {
	title: string | JSX.Element
	subtitle?: string | JSX.Element
	image?: JSX.Element
	hasBack?: boolean
}
export const Header: React.FC<TAppPageHeaderProps> = ({title, subtitle, image, hasBack = false}) => {
	const [show, setShow] = useState(false);

	const destroying = useRef(false);
	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (destroying.current) {
				return;
			}
			setShow(!!image);
		}, 1000);
	}, [setShow]);


	return <div className={'app-page-header' + (hasBack ? ' with-back' : '') + (!!subtitle ? ' with-subtitle' : '')}>
		<div className={'app-ph-title'}>
			<div className={'app-ph-caption'}>
				{hasBack && <GoBackButton/>}
				{title}
			</div>
			{subtitle && <div className={'app-ph-subtitle'}>{subtitle}</div>}
		</div>

		{show && <div className={'app-ph-image'}>
			{image}
		</div>}
	</div>;
};
