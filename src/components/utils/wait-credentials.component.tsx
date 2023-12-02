import {CgSpinner} from "react-icons/cg";
import React from "react";

type TWaitCredentialsProps = {
	text?: string
}

export const WaitCredentials: React.FC<TWaitCredentialsProps> = ({text}) => {
	return <div className={'app-page-spinner'}><CgSpinner/> {text || 'Restoring session...'}</div>;
}
