import React, {useEffect, useRef, useState} from "react";

export type TAppPageHeaderProps = {
	title: string
	subtitle?: string
	image?: JSX.Element
	onBack?: () => void
}
export const AppSecondaryPageHeader: React.FC<TAppPageHeaderProps> = ({title, subtitle, image, onBack}) => {
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


	return <div className={'app-secondary-page-header' + (onBack ? ' with-back' : ' no-back')}>
		<div className={'app-ph-title'}>
			<div className={'app-ph-caption'}>
				{onBack && <span className={'app-ph-back'} onClick={onBack}>
						&larr;
					</span>}
				{title}
				{subtitle && <div className={'app-ph-subtitle'}>{subtitle}</div>}
			</div>
		</div>

		{show && <div className={'app-ph-image'}>
			{image}
		</div>}
	</div>;
};
