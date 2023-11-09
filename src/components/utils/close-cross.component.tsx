import {IoCloseSharp} from "react-icons/io5";
import React from "react";

export type TCloseCrossProps = {
	onClick: () => void
	className?: string
}
export const CloseCross: React.FC<TCloseCrossProps> = ({onClick, className = ''}) => {
	return <div className={'modal-close ' + className} onClick={onClick}><IoCloseSharp/></div>
}
