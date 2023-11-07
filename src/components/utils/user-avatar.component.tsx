import React, {useCallback, useState} from "react";
import {CgSpinner} from "react-icons/cg";

export type TUserAvatarProps = {
	src?: string
	name?: string
}
export const UserAvatar: React.FC<TUserAvatarProps> = ({src, name}) => {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	const handleLoaded = useCallback(() => {
		setLoaded(true);
		setError(false);
	}, [loaded, error]);

	const handleError = useCallback(() => {
		setLoaded(false);
		setError(true);
	}, [loaded, error]);

	return <div className={'avatar-container' + (loaded ? ' loaded' : '') + (error ? ' fallback' : '')}>
		<img src={src} onLoad={handleLoaded} onError={handleError} referrerPolicy="no-referrer"/>
		<div className={'avatar-fallback'}>{name?.substring(0, 1).toUpperCase()}</div>
		{!loaded && !error && <div className={'avatar-wait spin'}><CgSpinner/></div>}
	</div>
}
