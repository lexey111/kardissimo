import React, {useEffect, useRef, useState} from "react";
import {BackToCollectionsButton} from "../collection/back-to-collections.button.component.tsx";
import {useScreenSize} from "./useScreenSize.hook.tsx";

export type TAppPageHeaderProps = {
	title: string | JSX.Element
	noBg?: boolean
	subtitle?: string | JSX.Element
	image?: JSX.Element
	hasBack?: boolean
}
export const Header: React.FC<TAppPageHeaderProps> = ({
	                                                      title,
	                                                      subtitle,
	                                                      image,
	                                                      noBg = false, hasBack = false
                                                      }) => {
	const [show, setShow] = useState(false);
	const {show: showImage} = useScreenSize(960);

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

	const extraClasses = [];
	if (hasBack) {
		extraClasses.push('with-back');
	}
	if (!!subtitle) {
		extraClasses.push('with-subtitle');
	}
	if (noBg) {
		extraClasses.push('no-bg');
	}


	return <div className={'app-page-header' + ' ' + extraClasses.join(', ')}>
		<div className={'app-ph-title'}>
			<div className={'app-ph-caption'}>
				{hasBack && <BackToCollectionsButton/>}
				{title}
			</div>
			{subtitle && <div className={'app-ph-subtitle'}>{subtitle}</div>}
		</div>

		{show && showImage && <div className={'app-ph-image'}>
			{image}
		</div>}
	</div>;
};
