import {CgSpinner} from "react-icons/cg";
import React from "react";

type TWaitInlineProps = {
	text?: string
}
export const WaitInline: React.FC<TWaitInlineProps> = ({text}) => {
	return <div className={'app-inline-spinner'}><CgSpinner/> {text}</div>;
}
