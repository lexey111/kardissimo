import {CgSpinner} from "react-icons/cg";
import React from "react";

type TWaitCredentialsProps = {
	text?: string
}

export const WaitGlobal: React.FC<TWaitCredentialsProps> = ({text}) => {
	return <div className={'app-page-spinner'}><CgSpinner/> {text || 'Restoring session...'}</div>;
}
