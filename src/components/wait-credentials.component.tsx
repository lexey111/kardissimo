import {CgSpinner} from "react-icons/cg";
import React from "react";

export const WaitCredentials: React.FC = () => {
	return <div className={'app-page-spinner'}><CgSpinner/> Restoring session...</div>;
}
